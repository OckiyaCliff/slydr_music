export default function ArtistDashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Artist Dashboard</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        The artist dashboard is currently being updated. Please check back later.
      </p>
      <a
        href="/dashboard"
        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
      >
        Return to Dashboard
      </a>
    </div>
  )
}
