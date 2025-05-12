export const HELIUS_API_KEY = "c6c7f5bd-1801-49c0-b949-8a7e011e9b14"

// Helius RPC URL
export const HELIUS_RPC_URL = `https://devnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`

// Helius API base URL
export const HELIUS_API_BASE_URL = "https://api-devnet.helius-rpc.com/v0"

// Parse transactions endpoint
export const PARSE_TRANSACTIONS_URL = `${HELIUS_API_BASE_URL}/transactions/?api-key=${HELIUS_API_KEY}`

// Get transaction history for an address
export const getAddressTransactionsUrl = (address: string) =>
  `${HELIUS_API_BASE_URL}/addresses/${address}/transactions/?api-key=${HELIUS_API_KEY}`

// Format SOL amount (from lamports)
export const formatSolAmount = (lamports: number) => {
  return (lamports / 1_000_000_000).toFixed(4)
}

// Transaction types
export type TransactionType =
  | "UNKNOWN"
  | "SOL_TRANSFER"
  | "TOKEN_TRANSFER"
  | "NFT_MINT"
  | "NFT_SALE"
  | "NFT_LISTING"
  | "NFT_CANCEL_LISTING"
  | "SWAP"
  | "ROYALTY_PAYMENT"

// Transaction data interface
export interface HeliusTransaction {
  signature: string
  timestamp: number
  slot: number
  fee: number
  status: "success" | "failed"
  type: TransactionType
  nativeTransfers: NativeTransfer[]
  tokenTransfers: TokenTransfer[]
  accountData: AccountData[]
  feePayer: string
}

export interface NativeTransfer {
  fromUserAccount: string
  toUserAccount: string
  amount: number
}

export interface TokenTransfer {
  fromUserAccount: string
  toUserAccount: string
  mint: string
  tokenAmount: number
}

export interface AccountData {
  account: string
  nativeBalanceChange: number
}

// Parse raw transaction data from Helius
export const parseTransactionData = (rawData: any): HeliusTransaction => {
  // Default transaction data
  const transaction: HeliusTransaction = {
    signature: rawData.signature || "",
    timestamp: rawData.timestamp || Date.now(),
    slot: rawData.slot || 0,
    fee: rawData.fee || 0,
    status: rawData.err ? "failed" : "success",
    type: "UNKNOWN",
    nativeTransfers: rawData.nativeTransfers || [],
    tokenTransfers: rawData.tokenTransfers || [],
    accountData: rawData.accountData || [],
    feePayer: rawData.feePayer || "",
  }

  return transaction
}

// Fetch transactions for an address
export const getTransactionHistory = async (address: string, limit = 10): Promise<HeliusTransaction[]> => {
  try {
    const response = await fetch(getAddressTransactionsUrl(address) + `&limit=${limit}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch transactions: ${response.statusText}`)
    }
    const data = await response.json()
    return Array.isArray(data) ? data.map(parseTransactionData) : []
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return []
  }
}

export const getTransactionTypeLabel = (type: TransactionType): string => {
  switch (type) {
    case "SOL_TRANSFER":
      return "SOL Transfer"
    case "TOKEN_TRANSFER":
      return "Token Transfer"
    case "NFT_MINT":
      return "NFT Mint"
    case "NFT_SALE":
      return "NFT Sale"
    case "NFT_LISTING":
      return "NFT Listing"
    case "NFT_CANCEL_LISTING":
      return "NFT Cancel Listing"
    case "SWAP":
      return "Swap"
    case "ROYALTY_PAYMENT":
      return "Royalty Payment"
    default:
      return "Unknown"
  }
}

export const isIncomingTransaction = (transaction: HeliusTransaction, walletAddress: string): boolean => {
  for (const transfer of transaction.nativeTransfers) {
    if (transfer.toUserAccount.toLowerCase() === walletAddress.toLowerCase()) {
      return true
    }
  }
  return false
}
