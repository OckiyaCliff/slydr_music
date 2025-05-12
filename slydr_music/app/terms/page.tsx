import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Terms of Service | Slydr.Music",
  description: "Terms of Service for Slydr.Music platform",
}

export default function TermsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <Link href="/" className="flex items-center text-sm text-purple-600 hover:text-purple-800 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

        <div className="prose prose-purple dark:prose-invert max-w-none">
          <p className="lead">
            Welcome to Slydr.Music. These Terms of Service govern your use of our platform and services. Please read
            these terms carefully before using our platform.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using Slydr.Music, you agree to be bound by these Terms of Service and all applicable laws
            and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing
            this site.
          </p>

          <h2>2. Platform Description</h2>
          <p>
            Slydr.Music is a decentralized platform that enables artists to create funding campaigns and share royalties
            with investors. The platform utilizes blockchain technology to facilitate transparent and secure
            transactions between artists and investors.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            To use certain features of the platform, you must connect a compatible Solana wallet. You are responsible
            for maintaining the security of your wallet and all activities that occur through your account.
          </p>

          <h2>4. Artist Obligations</h2>
          <p>Artists who create campaigns on Slydr.Music agree to:</p>
          <ul>
            <li>Provide accurate information about their projects</li>
            <li>Use funds raised for the stated purpose</li>
            <li>Honor the royalty distribution agreements</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Not engage in fraudulent or misleading activities</li>
          </ul>

          <h2>5. Investor Obligations</h2>
          <p>Investors who fund campaigns on Slydr.Music agree to:</p>
          <ul>
            <li>Conduct their own due diligence before investing</li>
            <li>Understand the risks associated with investing in music projects</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Not engage in market manipulation or other prohibited activities</li>
          </ul>

          <h2>6. Platform Fees</h2>
          <p>
            Slydr.Music charges a 3% platform fee on all funds raised through campaigns and on royalties distributed.
            These fees are automatically deducted through our smart contracts.
          </p>

          <h2>7. Royalty Distribution</h2>
          <p>
            Royalties are distributed according to the terms specified in each campaign. The distribution is handled
            automatically through our smart contracts based on the percentage set by the artist and the investment
            amount.
          </p>

          <h2>8. Intellectual Property</h2>
          <p>
            Artists retain all intellectual property rights to their music and creative works. Investors receive only
            the right to a share of royalties as specified in the campaign terms, not ownership of the intellectual
            property.
          </p>

          <h2>9. Prohibited Activities</h2>
          <p>Users are prohibited from:</p>
          <ul>
            <li>Violating any laws or regulations</li>
            <li>Infringing on intellectual property rights</li>
            <li>Engaging in fraudulent or deceptive practices</li>
            <li>Attempting to manipulate or exploit the platform</li>
            <li>Interfering with the proper functioning of the platform</li>
          </ul>

          <h2>10. Limitation of Liability</h2>
          <p>
            Slydr.Music is not liable for any damages, losses, or liabilities arising from the use of our platform,
            including but not limited to investment losses, royalty distribution issues, or technical failures.
          </p>

          <h2>11. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting
            to the platform. Your continued use of Slydr.Music after any changes indicates your acceptance of the new
            terms.
          </p>

          <h2>12. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of [Jurisdiction], without regard to
            its conflict of law principles.
          </p>

          <h2>13. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at{" "}
            <a href="mailto:support@slydr.music" className="text-purple-600 hover:text-purple-800">
              support@slydr.music
            </a>
            .
          </p>

          <p className="text-sm text-muted-foreground mt-8">Last updated: May 12, 2025</p>
        </div>
      </div>
    </div>
  )
}
