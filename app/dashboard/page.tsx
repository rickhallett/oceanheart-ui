import Link from "next/link";

// Dashboard temporarily disabled during authentication system transition
export default function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Please sign in to access your dashboard.
        </p>
        <div className="space-y-3">
          <Link href="/signin" className="btn btn-primary block">
            Sign In
          </Link>
          <Link href="/" className="btn btn-ghost block">
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
