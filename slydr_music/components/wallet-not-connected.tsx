export function WalletNotConnected() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6 md:p-8 min-h-[80vh]">
      <div className="w-full max-w-md mx-auto text-center space-y-6">
        <div className="rounded-full bg-purple-100 dark:bg-purple-900/20 p-6 mx-auto w-fit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10 text-purple-600 dark:text-purple-400"
          >
            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
            <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Connect Your Wallet</h2>
        <p className="text-muted-foreground">
          Please connect your Solana wallet to access the artist dashboard and manage your campaigns.
        </p>
        <div className="flex justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-purple-600 text-white hover:bg-purple-700 h-10 px-4 py-2"
          >
            Connect Wallet
          </a>
        </div>
      </div>
    </div>
  )
}
