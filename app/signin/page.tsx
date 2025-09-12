// Temporary sign-in page during Supabase authentication removal
export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body text-center">
          <h2 className="card-title justify-center text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Authentication Temporarily Disabled
          </h2>
          <p className="text-gray-600 mb-4">
            We're upgrading our authentication system. New authentication features coming soon.
          </p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" disabled>
              Sign In (Coming Soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
