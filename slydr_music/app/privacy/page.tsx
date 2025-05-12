import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Privacy Policy | Slydr.Music",
  description: "Privacy Policy for Slydr.Music platform",
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <Link href="/" className="flex items-center text-sm text-purple-600 hover:text-purple-800 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose prose-purple dark:prose-invert max-w-none">
          <p className="lead">
            At Slydr.Music, we take your privacy seriously. This Privacy Policy explains how we collect, use, and
            protect your personal information.
          </p>

          <h2>1. Information We Collect</h2>
          <p>We collect the following types of information:</p>
          <ul>
            <li>
              <strong>Wallet Information:</strong> When you connect your Solana wallet, we collect your wallet address
              and transaction history related to our platform.
            </li>
            <li>
              <strong>Profile Information:</strong> Information you provide in your profile, such as name, bio, and
              profile picture.
            </li>
            <li>
              <strong>Campaign Information:</strong> Details about campaigns you create or invest in.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you interact with our platform, including pages visited
              and features used.
            </li>
            <li>
              <strong>Device Information:</strong> Information about the device you use to access our platform,
              including browser type, IP address, and operating system.
            </li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use your information for the following purposes:</p>
          <ul>
            <li>To provide and maintain our platform</li>
            <li>To process transactions and distribute royalties</li>
            <li>To improve and personalize your experience</li>
            <li>To communicate with you about your account and campaigns</li>
            <li>To detect and prevent fraud and abuse</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2>3. Blockchain Transparency</h2>
          <p>
            Please note that transactions on the Solana blockchain are public and transparent. This means that your
            wallet address and transaction details are visible to anyone who accesses the blockchain. This is inherent
            to blockchain technology and not specific to our platform.
          </p>

          <h2>4. Information Sharing</h2>
          <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
          <ul>
            <li>With service providers who help us operate our platform</li>
            <li>When required by law or to protect our rights</li>
            <li>In connection with a merger, acquisition, or sale of assets</li>
            <li>With your consent or at your direction</li>
          </ul>

          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information.
            However, no method of transmission over the internet or electronic storage is 100% secure.
          </p>

          <h2>6. Your Rights</h2>
          <p>Depending on your location, you may have the following rights regarding your personal information:</p>
          <ul>
            <li>Access and receive a copy of your personal information</li>
            <li>Correct inaccurate personal information</li>
            <li>Delete your personal information</li>
            <li>Object to or restrict the processing of your personal information</li>
            <li>Data portability</li>
          </ul>

          <h2>7. Cookies and Similar Technologies</h2>
          <p>
            We use cookies and similar technologies to enhance your experience, analyze usage patterns, and deliver
            personalized content. You can control cookies through your browser settings.
          </p>

          <h2>8. Children's Privacy</h2>
          <p>
            Our platform is not intended for children under 18 years of age. We do not knowingly collect personal
            information from children.
          </p>

          <h2>9. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:privacy@slydr.music" className="text-purple-600 hover:text-purple-800">
              privacy@slydr.music
            </a>
            .
          </p>

          <p className="text-sm text-muted-foreground mt-8">Last updated: May 12, 2025</p>
        </div>
      </div>
    </div>
  )
}
