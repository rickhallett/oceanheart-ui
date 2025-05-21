export const dynamic = "force-dynamic";

/**
 * Unified reCAPTCHA verification endpoint
 * Verifies a reCAPTCHA token and returns success or error
 */
export async function POST(request: Request) {
  try {
    const { recaptchaToken, source } = await request.json();
    
    // Log verification request (with source for debugging)
    console.log(`Verifying reCAPTCHA from source: ${source || 'unknown'}`);

    if (!recaptchaToken) {
      return Response.json({ error: "No reCAPTCHA token provided" }, { status: 400 });
    }

    // Verify reCAPTCHA token using Google's API
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      { method: "POST" }
    );
    
    const recaptchaData = await recaptchaResponse.json();

    // Detailed logging for debugging purposes
    if (!recaptchaData.success) {
      console.error("reCAPTCHA verification failed:", {
        error: recaptchaData["error-codes"] || "Unknown error",
        score: recaptchaData.score,
        action: recaptchaData.action
      });
      
      return Response.json({ 
        error: "Invalid captcha", 
        details: recaptchaData 
      }, { status: 400 });
    }

    // Success response with score for optional client-side validation
    return Response.json({ 
      success: true,
      score: recaptchaData.score || 1.0
    });
    
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return Response.json({ 
      error: "Server error during verification",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}