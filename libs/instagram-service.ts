// SupabaseClient import removed during auth removal
import { sendEmail } from './resend';
import config from '@/config';
/**
 * Service to handle Instagram page checking and user points resetting
 */
export class InstagramService {
  private client: any;

  constructor(supabaseClient: any) {
    this.client = supabaseClient;
  }

  /**
   * Check if an Instagram page exists by making a request to the profile
   * 
   * @param username Instagram username to check
   * @returns True if page exists, false otherwise
   */
  async checkInstagramPageExists(username: string): Promise<boolean> {
    try {
      // Use fetch to check if the Instagram page exists
      // We need to use a server-side approach as browsers have CORS restrictions
      const response = await fetch(`https://www.instagram.com/${username}/`, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
        },
      });

      // If page exists, response will be 200 and won't have "Page Not Found" indicators
      const html = await response.text();
      return response.status === 200 && !html.includes('Page Not Found');
    } catch (error) {
      console.error('Error checking Instagram page:', error);
      return false;
    }
  }

  /**
   * Create a new Instagram page check
   * 
   * @param pageUsername Instagram username to monitor
   * @param userIds List of user IDs whose points should be reset if page is found
   * @returns The created check data
   */
  async createInstagramCheck(pageUsername: string, userIds: string[]) {
    try {
      // Insert the Instagram check
      const { data: checkData, error: checkError } = await this.client
        .from('instagram_page_checks')
        .insert({
          page_username: pageUsername,
          page_found: false
        })
        .select()
        .single();

      if (checkError) throw checkError;

      // Add affected users
      const affectedUsersData = userIds.map(userId => ({
        instagram_check_id: checkData.id,
        user_id: userId,
        points_reset: false
      }));

      const { error: affectedError } = await this.client
        .from('instagram_affected_users')
        .insert(affectedUsersData);

      if (affectedError) throw affectedError;

      return checkData;
    } catch (error) {
      console.error('Error creating Instagram check:', error);
      throw error;
    }
  }

  /**
   * Get all Instagram page checks
   * 
   * @returns List of all Instagram checks with their affected users
   */
  async getAllInstagramChecks() {
    try {
      const { data: checks, error: checksError } = await this.client
        .from('instagram_page_checks')
        .select(`
          id,
          page_username,
          page_found,
          last_check_time,
          created_at,
          instagram_affected_users (
            id,
            user_id,
            points_reset,
            reset_time
          )
        `)
        .order('created_at', { ascending: false });

      if (checksError) throw checksError;
      return checks;
    } catch (error) {
      console.error('Error getting Instagram checks:', error);
      throw error;
    }
  }

  /**
   * Run checks on all Instagram pages and reset points if needed
   * 
   * @returns Result summary of the checks and actions
   */
  async runInstagramChecks() {
    const results = {
      totalChecks: 0,
      pagesFound: 0,
      usersReset: 0,
      errors: 0
    };

    try {
      // Get all Instagram checks
      const { data: checks, error: checksError } = await this.client
        .from('instagram_page_checks')
        .select('id, page_username, page_found');

      if (checksError) throw checksError;

      results.totalChecks = checks?.length || 0;

      // Process each check
      for (const check of checks || []) {
        try {
          // Check if the Instagram page exists
          const pageExists = await this.checkInstagramPageExists(check.page_username);

          // If page exists and was not previously found, reset points
          if (pageExists && !check.page_found) {
            // Get affected users
            const { data: affectedUsers, error: affectedError } = await this.client
              .from('instagram_affected_users')
              .select('id, user_id, points_reset')
              .eq('instagram_check_id', check.id)
              .eq('points_reset', false);

            if (affectedError) throw affectedError;

            // Reset points for each affected user
            for (const user of affectedUsers || []) {
              results.pagesFound++;
              // Get all practices for this user
              const { data: practices, error: practicesError } = await this.client
                .from('practices')
                .select('id')
                .eq('user_id', user.user_id);

              if (practicesError) throw practicesError;

              await sendEmail({
                to: 'kai@oceanheart.ai',
                subject: 'Instagram page found',
                text: `The Instagram page for ${check.page_username} has been found.`,
                html: `<p>The Instagram page for ${check.page_username} has been found.</p>`
              });

              // TODO: Delete all practices (this effectively resets points)
              if (practices && practices.length > 0) {
                // const { error: deleteError } = await this.client
                //   .from('practices')
                //   .delete()
                //   .in('id', practices.map((p: { id: string }) => p.id));

                // if (deleteError) throw deleteError;

                // send email to kai@oceanheart.ai from kai@updates.oceanheart.ai
                // with the subject "Instagram page found"
                // and the body "The Instagram page for <page_username> has been found."
                // and the user_id using resend library


                // Mark user as reset
                // await this.client
                //   .from('instagram_affected_users')
                //   .update({
                //     points_reset: true,
                //     reset_time: new Date().toISOString()
                //   })
                //   .eq('id', user.id);

                // results.usersReset++;
              }
            }


          }

          // Update check status
          await this.client
            .from('instagram_page_checks')
            .update({
              page_found: pageExists,
              last_check_time: new Date().toISOString()
            })
            .eq('id', check.id);
        } catch (error) {
          console.error(`Error processing check for ${check.page_username}:`, error);
          results.errors++;
        }
      }

      return results;
    } catch (error) {
      console.error('Error running Instagram checks:', error);
      results.errors++;
      return results;
    }
  }

  /**
   * Delete an Instagram page check
   * 
   * @param checkId ID of the check to delete
   * @returns True if deleted successfully
   */
  async deleteInstagramCheck(checkId: string): Promise<boolean> {
    try {
      const { error } = await this.client
        .from('instagram_page_checks')
        .delete()
        .eq('id', checkId);

      return !error;
    } catch (error) {
      console.error('Error deleting Instagram check:', error);
      return false;
    }
  }
} 