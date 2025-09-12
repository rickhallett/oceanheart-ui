// Authentication stubs for Supabase removal
// These stubs prevent crashes while authentication is removed

export interface AuthUser {
  id: string
  email: string
  user_metadata?: {
    name?: string
    avatar_url?: string
  }
}

export interface AuthResponse {
  data: { user: AuthUser | null }
  error: null
}

export class AuthStub {
  async getUser(): Promise<AuthResponse> {
    return { 
      data: { user: null }, 
      error: null 
    }
  }

  async signOut(): Promise<void> {
    // Stub implementation - redirect to sign-in
    if (typeof window !== 'undefined') {
      window.location.href = '/signin'
    }
  }

  // Add auth property to match Supabase client structure
  auth = {
    getUser: this.getUser.bind(this),
    signOut: this.signOut.bind(this)
  }
}

export const createAuthClient = () => new AuthStub()