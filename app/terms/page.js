export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-white/60 text-sm">
            Last Updated: October 26, 2025
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-white/80">
          {/* Section 1 */}
          <section className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              1. Agreement to Terms
            </h2>
            <p className="mb-4">
              Welcome to <strong className="text-lime-300">TailorMyCV</strong>{" "}
              ("Company," "we," "our," or "us"). By accessing or using our
              website and services at tailormycv.com (the "Service"), you agree
              to be bound by these Terms of Service ("Terms").
            </p>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-300 font-semibold">
                If you do not agree to these Terms, please do not use our
                Service.
              </p>
            </div>
            <div className="mt-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <p className="font-semibold text-cyan-300 mb-2">
                Contact Information:
              </p>
              <ul className="text-sm space-y-1">
                <li>Email: i.seyfouri@gmail.com</li>
                <li>Service: TailorMyCV</li>
                <li>Location: United Kingdom</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              2. Description of Service
            </h2>
            <p className="mb-4">
              TailorMyCV is a Software-as-a-Service (SaaS) platform that
              provides CV (curriculum vitae) customization services. Our Service
              uses artificial intelligence technology to analyze your CV and job
              descriptions, then generates tailored CVs and cover letters
              optimized for specific job applications.
            </p>
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-4">
              <h3 className="font-semibold text-purple-300 mb-2">
                Key Features:
              </h3>
              <ul className="grid md:grid-cols-2 gap-2 text-sm">
                <li>✓ CV analysis and optimization</li>
                <li>✓ Job description matching</li>
                <li>✓ Customized CV generation</li>
                <li>✓ Cover letter generation</li>
                <li>✓ PDF document creation</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              3. Eligibility
            </h2>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-4">
              <p className="text-yellow-300 font-semibold mb-2">
                ⚠️ Age Requirement
              </p>
              <p className="text-sm">
                You must be at least <strong>18 years of age</strong> to use our
                Service. By using our Service, you represent and warrant that
                you meet this age requirement.
              </p>
            </div>
            <p className="text-sm text-white/60">
              If you are using the Service on behalf of an organization, you
              represent that you have the authority to bind that organization to
              these Terms.
            </p>
          </section>

          {/* Section 4 */}
          <section className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              4. Account Registration and Security
            </h2>

            <h3 className="text-xl font-semibold text-lime-300 mb-3">
              4.1 Account Creation
            </h3>
            <p className="mb-4">
              To use our Service, you must create an account by providing:
            </p>
            <div className="grid md:grid-cols-2 gap-3 mb-6">
              <div className="bg-white/5 p-3 rounded-lg">
                <p className="text-sm">✉️ A valid email address</p>
              </div>
              <div className="bg-white/5 p-3 rounded-lg">
                <p className="text-sm">🔒 A secure password</p>
              </div>
              <div className="bg-white/5 p-3 rounded-lg col-span-2">
                <p className="text-sm">🔐 OR authenticate via Google OAuth</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-lime-300 mb-3">
              4.2 Email Verification
            </h3>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
              <p className="text-sm">
                All accounts created with email and password must{" "}
                <strong className="text-blue-300">
                  verify their email address
                </strong>{" "}
                before accessing the Service. We will send a verification link
                to your provided email address.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-lime-300 mb-3">
              4.3 Account Security
            </h3>
            <p className="mb-2">You are responsible for:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 mb-6">
              <li>
                Maintaining the confidentiality of your account credentials
              </li>
              <li>All activities that occur under your account</li>
              <li>
                Notifying us immediately of any unauthorized access or security
                breach
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-lime-300 mb-3">
              4.4 Account Deletion
            </h3>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-sm">
                Users cannot delete their accounts independently. To request
                account deletion, contact us at{" "}
                <a
                  href="mailto:i.seyfouri@gmail.com"
                  className="text-lime-300 hover:underline"
                >
                  i.seyfouri@gmail.com
                </a>
                . We will process deletion requests within 30 days.
              </p>
            </div>
          </section>

          {/* Section 5 - Pricing */}
          <section className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              5. Subscription Plans and Payment Terms
            </h2>

            <h3 className="text-xl font-semibold text-lime-300 mb-3">
              5.1 Service Tiers
            </h3>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Free Tier */}
              <div className="bg-gradient-to-br from-gray-500/10 to-gray-600/10 border border-gray-500/30 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🎁</span>
                  <h4 className="text-xl font-bold text-gray-300">Free Tier</h4>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-lime-400">✓</span>
                    <span>2 free credits upon account creation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lime-400">✓</span>
                    <span>
                      Credits are used to generate customized CVs or cover
                      letters
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    <span>Limited to one-time use per verified account</span>
                  </li>
                </ul>
              </div>

              {/* Pro Tier */}
              <div className="bg-gradient-to-br from-cyan-500/10 to-lime-500/10 border-2 border-lime-500/50 rounded-xl p-5 relative">
                <div className="absolute -top-3 right-4 bg-lime-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                  POPULAR
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">⭐</span>
                  <h4 className="text-xl font-bold text-lime-300">
                    Pro Subscription
                  </h4>
                </div>
                <p className="text-3xl font-bold text-white mb-3">
                  £11.99<span className="text-lg text-white/60">/month</span>
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-lime-400">✓</span>
                    <span className="font-semibold">Unlimited credits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lime-400">✓</span>
                    <span>Continuous access to all features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lime-400">✓</span>
                    <span>Billed monthly via Stripe</span>
                  </li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-lime-300 mb-3">
              5.2 Credit System
            </h3>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-6">
              <ul className="space-y-2 text-sm">
                <li>• Each CV or cover letter generation consumes 1 credit</li>
                <li>
                  • Free tier credits do not expire but cannot be replenished
                </li>
                <li>
                  • Pro subscribers receive unlimited credits while subscription
                  is active
                </li>
                <li>• Credits are non-transferable and have no cash value</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-lime-300 mb-3">
              5.3 Payment Processing
            </h3>
            <p className="text-sm mb-6">
              All payments are processed securely through{" "}
              <strong className="text-blue-300">Stripe</strong>. By subscribing,
              you agree to provide accurate payment information and authorize us
              to charge your payment method for the subscription fee.
            </p>

            <h3 className="text-xl font-semibold text-lime-300 mb-3">
              5.4 Automatic Renewal
            </h3>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-300">
                ⚠️ Pro subscriptions automatically renew each month unless
                cancelled. You will be charged the subscription fee at the
                beginning of each billing cycle.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-lime-300 mb-3">
              5.5 Cancellation and Refunds
            </h3>
            <div className="bg-white/5 rounded-lg p-4 space-y-2 text-sm">
              <p>
                • You may cancel your Pro subscription at any time through the
                Stripe billing portal
              </p>
              <p>
                • Cancellation takes effect at the end of the current billing
                period
              </p>
              <p className="text-red-300 font-semibold">
                • No refunds are provided for partial months or unused credits
              </p>
              <p>
                • Upon cancellation, your account reverts to the Free tier with
                2 credits
              </p>
            </div>
          </section>

          {/* Section 6 - Acceptable Use */}
          <section className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              6. Acceptable Use
            </h2>

            <h3 className="text-xl font-semibold text-lime-300 mb-3">
              6.1 Permitted Uses
            </h3>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
              <p className="mb-2 font-semibold text-green-300">
                You may use our Service to:
              </p>
              <ul className="space-y-1 text-sm ml-4">
                <li>✓ Upload and customize your personal CV</li>
                <li>✓ Generate tailored CVs for job applications</li>
                <li>✓ Create cover letters for employment purposes</li>
                <li>✓ Download generated documents for personal use</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-red-300 mb-3">
              6.2 Prohibited Uses
            </h3>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
              <p className="mb-3 font-semibold text-red-300">
                You agree NOT to:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>
                    <strong>Create multiple accounts</strong> to obtain
                    additional free credits
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Share account credentials with others</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Use disposable or temporary email addresses</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>
                    Upload content containing viruses, malware, or harmful code
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>
                    Attempt to reverse engineer, decompile, or extract our AI
                    models
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Use the Service for any unlawful purpose</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>
                    Resell or redistribute content generated by our Service
                    commercially
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>
                    Submit CVs or content belonging to other individuals without
                    authorization
                  </span>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-lime-300 mb-3">
              6.3 Abuse Prevention
            </h3>
            <p className="text-sm mb-2">
              We implement technical measures to prevent abuse, including:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-sm mb-4">
              <li>Email verification requirements</li>
              <li>Rate limiting on account creation</li>
              <li>Monitoring for suspicious patterns</li>
              <li>IP-based usage tracking</li>
            </ul>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <p className="text-sm text-red-300 font-semibold">
                Violation of these terms may result in immediate account
                suspension or termination without refund.
              </p>
            </div>
          </section>

          {/* Section 7 - Intellectual Property */}
          <section className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              7. Intellectual Property Rights
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-lime-300 mb-3">
                  7.1 Your Content
                </h3>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="text-sm mb-2">
                    You{" "}
                    <strong className="text-green-300">
                      retain all ownership rights
                    </strong>{" "}
                    to the CV content, job descriptions, and personal
                    information you upload ("Your Content").
                  </p>
                  <p className="text-sm text-white/60">
                    By using our Service, you grant us a limited, non-exclusive
                    license to process, store, and analyze Your Content solely
                    to provide the Service.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-lime-300 mb-3">
                  7.2 Generated Content
                </h3>
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                  <p className="text-sm">
                    Content generated by our Service (customized CVs and cover
                    letters) based on Your Content{" "}
                    <strong className="text-cyan-300">
                      remains your property
                    </strong>
                    . You may use, modify, and distribute this generated content
                    freely for personal employment purposes.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-lime-300 mb-3">
                  7.3 Our Intellectual Property
                </h3>
                <p className="text-sm text-white/60">
                  The Service, including all software, algorithms, designs,
                  text, graphics, logos, and trademarks, is owned by TailorMyCV
                  and protected by intellectual property laws. You may not copy,
                  modify, distribute, or create derivative works without our
                  written permission.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-lime-300 mb-3">
                  7.4 AI Model Usage
                </h3>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <p className="text-sm">
                    Our Service uses{" "}
                    <strong className="text-purple-300">
                      OpenAI's GPT models
                    </strong>
                    . Your use of generated content is subject to OpenAI's usage
                    policies. We do not train our models on your personal CV
                    data.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8 - Disclaimers */}
          <section className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              8. Disclaimers and Limitations of Liability
            </h2>

            <h3 className="text-xl font-semibold text-red-300 mb-3">
              8.1 No Employment Guarantees
            </h3>
            <div className="bg-red-500/10 border-2 border-red-500/50 rounded-lg p-5 mb-6">
              <p className="font-bold text-red-300 text-lg mb-3">
                ⚠️ IMPORTANT DISCLAIMER
              </p>
              <p className="text-sm mb-3">
                Our Service provides CV customization tools but does NOT
                guarantee:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  <span>Job interviews or offers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  <span>Employment success</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  <span>Specific outcomes from using generated CVs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  <span>Accuracy of AI-generated content</span>
                </li>
              </ul>
              <p className="text-sm mt-3 font-semibold text-red-300">
                You are solely responsible for reviewing, editing, and verifying
                all generated content before use.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-yellow-300 mb-3">
              8.2 Service Provided "As Is"
            </h3>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
              <p className="text-sm uppercase font-semibold text-yellow-300 mb-2">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
                WARRANTIES OF ANY KIND
              </p>
              <p className="text-xs text-white/60">
                Including but not limited to warranties of merchantability,
                fitness for a particular purpose, non-infringement, accuracy or
                reliability of results, or freedom from errors or viruses.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-orange-300 mb-3">
              8.3 Limitation of Liability
            </h3>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-orange-300 mb-2">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW:
              </p>
              <p className="text-sm mb-3">
                TailorMyCV shall not be liable for indirect, incidental,
                special, or consequential damages, loss of profits, data, or
                business opportunities.
              </p>
              <p className="text-sm font-bold text-orange-300">
                OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN
                THE 12 MONTHS PRECEDING THE CLAIM, OR £100, WHICHEVER IS LESS.
              </p>
            </div>
          </section>

          {/* Section 9 - Termination */}
          <section className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              9. Termination
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-blue-300 mb-2">
                  9.1 Termination by You
                </h3>
                <p className="text-sm">
                  You may cancel your Pro subscription at any time through the
                  Stripe billing portal. To close your account entirely, contact
                  us at i.seyfouri@gmail.com.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-red-300 mb-2">
                  9.2 Termination by Us
                </h3>
                <p className="text-sm mb-2">
                  We may suspend or terminate your account immediately if:
                </p>
                <ul className="text-xs space-y-1">
                  <li>• You violate these Terms</li>
                  <li>• You engage in fraudulent activity</li>
                  <li>• You abuse the Service</li>
                  <li>• Payment fails repeatedly</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-lime-300 mb-3">
              9.3 Effect of Termination
            </h3>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-sm mb-2">Upon termination:</p>
              <ul className="space-y-1 text-sm ml-4">
                <li>• Your access to the Service ends immediately</li>
                <li>• Unused credits are forfeited (no refunds)</li>
                <li>• Your data will be deleted per our Privacy Policy</li>
              </ul>
            </div>
          </section>

          {/* Section 10 - Dispute Resolution */}
          <section className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              10. Dispute Resolution
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-lime-300 mb-2">
                  10.1 Governing Law
                </h3>
                <p className="text-sm">
                  These Terms are governed by the laws of{" "}
                  <strong className="text-lime-300">
                    England and Wales, United Kingdom
                  </strong>
                  , without regard to conflict of law provisions.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-lime-300 mb-2">
                  10.2 Jurisdiction
                </h3>
                <p className="text-sm">
                  Any disputes arising from these Terms or the Service shall be
                  subject to the exclusive jurisdiction of the courts of England
                  and Wales.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-lime-300 mb-2">
                  10.3 Informal Resolution
                </h3>
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                  <p className="text-sm">
                    Before initiating formal proceedings, please contact us at{" "}
                    <a
                      href="mailto:i.seyfouri@gmail.com"
                      className="text-lime-300 hover:underline font-semibold"
                    >
                      i.seyfouri@gmail.com
                    </a>{" "}
                    to attempt to resolve the dispute informally.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 11 - Contact */}
          <section className="bg-gradient-to-r from-cyan-500/10 to-lime-500/10 border border-cyan-500/30 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              11. Contact Information
            </h2>
            <p className="mb-4">
              For questions about these Terms, please contact:
            </p>
            <div className="bg-black/30 rounded-lg p-5">
              <p className="font-semibold text-lime-300 text-lg mb-3">
                TailorMyCV
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  Email:{" "}
                  <a
                    href="mailto:i.seyfouri@gmail.com"
                    className="text-cyan-300 hover:underline"
                  >
                    i.seyfouri@gmail.com
                  </a>
                </p>
                <p>Location: United Kingdom</p>
              </div>
              <p className="text-xs text-white/60 mt-4">
                For technical support or account issues, please use the same
                email address.
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center py-8 border-t border-white/10">
            <p className="text-sm text-white/60 italic">
              By creating an account and using TailorMyCV, you acknowledge that
              you have read, understood, and agree to be bound by these Terms of
              Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
