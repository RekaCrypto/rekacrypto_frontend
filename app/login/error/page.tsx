import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-red-800/50 bg-slate-900/50 p-8 text-center shadow-xl">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-red-400">
            Authentication Error
          </h2>
          <p className="mt-4 text-slate-300">
            Sorry, something went wrong with your authentication.
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Please check your credentials and try again.
          </p>
        </div>

        <div className="mt-6">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
