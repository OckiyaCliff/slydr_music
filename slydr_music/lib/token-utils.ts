import { type Connection, PublicKey } from "@solana/web3.js"
import { TOKEN_PROGRAM_ID } from "@solana/spl-token"

export interface TokenInfo {
  mint: string
  owner: string
  amount: number
  decimals: number
  uiAmount: number
}

export async function getTokenAccounts(connection: Connection, walletAddress: string): Promise<TokenInfo[]> {
  try {
    const walletPublicKey = new PublicKey(walletAddress)

    // Get all token accounts owned by the wallet
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(walletPublicKey, {
      programId: TOKEN_PROGRAM_ID,
    })

    // Map the response to a more usable format
    return tokenAccounts.value.map((account) => {
      const parsedInfo = account.account.data.parsed.info
      const mintAddress = parsedInfo.mint
      const tokenAmount = parsedInfo.tokenAmount

      return {
        mint: mintAddress,
        owner: walletAddress,
        amount: Number(tokenAmount.amount),
        decimals: tokenAmount.decimals,
        uiAmount: tokenAmount.uiAmount,
      }
    })
  } catch (error) {
    console.error("Error fetching token accounts:", error)
    return []
  }
}

// Function to get token metadata (in a real app, this would fetch from Metaplex)
export async function getTokenMetadata(connection: Connection, mintAddress: string): Promise<any> {
  // This is a placeholder. In a real app, you would fetch metadata from Metaplex
  // For now, we'll return mock data for known tokens
  const mockTokens: Record<string, any> = {
    SARAH: {
      name: "Sarah Johnson Token",
      symbol: "SARAH",
      artist: "Sarah Johnson",
      royaltyPercentage: 0.05,
      image: "/musician-portrait.png",
    },
    RESON: {
      name: "The Resonants Token",
      symbol: "RESON",
      artist: "The Resonants",
      royaltyPercentage: 0.03,
      image: "/energetic-rock-band.png",
    },
    MLEE: {
      name: "Marcus Lee Token",
      symbol: "MLEE",
      artist: "Marcus Lee",
      royaltyPercentage: 0.08,
      image: "/hip-hop-artist.png",
    },
  }

  // In a real app, you would look up the token by mint address
  // For demo purposes, we'll just return a random token from our mock data
  const tokens = Object.values(mockTokens)
  const randomIndex = Math.floor(Math.random() * tokens.length)

  return tokens[randomIndex]
}
