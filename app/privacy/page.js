export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent">
            Privacy Policy
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
              1. Introduction
            </h2>
            <p className="mb-4">
              TailorMyCV ("we," "our," or "us") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your personal information when you use our
              CV customization service at tailormycv.com (the "Service").
            </p>
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 mb-4">
              <p className="font-semibold text-cyan-300 mb-2">
                Controller Information:
              </p>
              <ul className="space-y-1 text-sm">
                <li>Service Name: TailorMyCV</li>
                <li>
                  Contact Email:{" "}
                  <a
                    href="mailto:i.seyfouri@gmail.com"
                    className="text-lime-300 hover:underline"
                  >
                    i.seyfouri@gmail.com
                  </a>
                </li>
                <li>Location: United Kingdom</li>
              </ul>
            </div>
            <p className="text-sm text-white/60">
              By using our Service, you consent to the data practices described
              in this policy. If you do not agree with this policy, please do
              not use our Service.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              2. Information We Collect
            </h2>

            <h3 className="text-xl font-semibold text-white/90 mb-3">
              2.1 Information You Provide Directly
            </h3>

            <div className="mb-6">
              <h4 className="font-semibold text-lime-300 mb-2">
                Account Information:
              </h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Email address</li>
                <li>
                  Password (encrypted and hashed - we never see your actual
                  password)
                </li>
                <li>Name (if provided in your CV)</li>
                <li>Authentication method (email/password or Google OAuth)</li>
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-lime-300 mb-2">
                Content You Upload:
              </h4>
              <p className="mb-2">CV/Resume content including:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Personal details (name, phone, email, address)</li>
                <li>Education history</li>
                <li>Work experience</li>
                <li>Skills and qualifications</li>
                <li>Projects and achievements</li>
                <li>Any other information in your CV</li>
                <li>Job descriptions you paste or upload</li>
                <li>Cover letter preferences</li>
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-lime-300 mb-2">
                Payment Information:
              </h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Processed and stored by Stripe (our payment processor)</li>
                <li>
                  We store only: Stripe customer ID, subscription status, and
                  payment status
                </li>
                <li>We never see or store your full credit card numbers</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-white/90 mb-3 mt-6">
              2.2 Information Collected Automatically
            </h3>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-semibold text-cyan-300 mb-2">
                  Usage Data:
                </h4>
                <ul className="text-sm space-y-1">
                  <li>Features you use</li>
                  <li>Credits consumed</li>
                  <li>Documents generated</li>
                  <li>Pages viewed</li>
                  <li>Access times</li>
                </ul>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-semibold text-cyan-300 mb-2">
                  Technical Data:
                </h4>
                <ul className="text-sm space-y-1">
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device info</li>
                  <li>Operating system</li>
                  <li>Referring URLs</li>
                </ul>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-semibold text-cyan-300 mb-2">
                  Authentication:
                </h4>
                <ul className="text-sm space-y-1">
                  <li>Login timestamps</li>
                  <li>Auth tokens (encrypted)</li>
                  <li>Session info</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white/90 mb-3 mt-6">
              2.3 Information from Third Parties
            </h3>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-300 mb-2">
                Google OAuth (if you sign in with Google):
              </h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Google account email address</li>
                <li>Google account ID</li>
                <li>Profile information (if granted)</li>
              </ul>
              <p className="text-sm text-white/60 mt-2">
                We do not collect information from other sources.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              3. How We Use Your Information
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-lime-300 mb-2">
                  3.1 To Provide the Service
                </h3>
                <p className="mb-2">We use your information to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Create and manage your account</li>
                  <li>Authenticate your identity</li>
                  <li>Process your CVs through AI models</li>
                  <li>Match your CV to job descriptions</li>
                  <li>Generate tailored cover letters</li>
                  <li>Create PDF documents</li>
                  <li>Track your credit usage</li>
                  <li>Provide customer support</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-lime-300 mb-2">
                  3.2 To Process Payments
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Manage subscriptions via Stripe</li>
                  <li>Process billing and payments</li>
                  <li>Handle refunds and cancellations</li>
                  <li>Prevent payment fraud</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-lime-300 mb-2">
                  3.3 To Improve the Service
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Analyze usage patterns</li>
                  <li>Identify and fix bugs</li>
                  <li>Develop new functionality</li>
                  <li>Optimize AI model performance</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-lime-300 mb-2">
                  3.4 To Communicate With You
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Send account verification emails</li>
                  <li>
                    Provide transactional emails (password resets, payment
                    confirmations)
                  </li>
                  <li>Send service updates or important notices</li>
                  <li>Respond to your inquiries</li>
                </ul>
                <p className="text-sm text-white/60 mt-2 italic">
                  We do not send marketing emails unless you explicitly opt in.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-lime-300 mb-2">
                  3.5 To Ensure Security and Prevent Abuse
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Detect and prevent fraudulent account creation</li>
                  <li>Identify abuse of free credits</li>
                  <li>Monitor for unauthorized access</li>
                  <li>Enforce our Terms of Service</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              4. Legal Basis for Processing (GDPR)
            </h2>
            <p className="mb-4">
              For users in the UK and European Economic Area, we process your
              personal data under the following legal bases:
            </p>
            <div className="space-y-3">
              <div className="border-l-4 border-cyan-500 pl-4">
                <h4 className="font-semibold text-cyan-300">
                  Contractual Necessity
                </h4>
                <p className="text-sm">
                  Processing is necessary to provide the Service you've
                  requested (account management, CV customization, billing).
                </p>
              </div>
              <div className="border-l-4 border-lime-500 pl-4">
                <h4 className="font-semibold text-lime-300">
                  Legitimate Interests
                </h4>
                <p className="text-sm">
                  We have legitimate interests in improving our Service,
                  preventing fraud, and ensuring security.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-blue-300">Consent</h4>
                <p className="text-sm">
                  Where required, we obtain your explicit consent (e.g., for
                  optional communications).
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-purple-300">
                  Legal Obligations
                </h4>
                <p className="text-sm">
                  We process data to comply with legal requirements (e.g., tax
                  records, fraud prevention).
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              5. How We Share Your Information
            </h2>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
              <p className="font-semibold text-red-300">
                ⚠️ We do not sell your personal data to third parties.
              </p>
            </div>
            <p className="mb-4">
              We share your information only as described below:
            </p>

            <h3 className="text-xl font-semibold text-white/90 mb-3">
              5.1 Third-Party Service Providers
            </h3>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-300 mb-2 flex items-center gap-2">
                  <span>🗄️</span> Supabase (Database & Authentication)
                </h4>
                <ul className="text-sm space-y-1">
                  <li>
                    <strong>Purpose:</strong> Stores account data,
                    authentication, and usage records
                  </li>
                  <li>
                    <strong>Data shared:</strong> Email, encrypted password,
                    user ID, subscription status
                  </li>
                  <li>
                    <strong>Privacy:</strong>{" "}
                    <a
                      href="https://supabase.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lime-300 hover:underline"
                    >
                      supabase.com/privacy
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-purple-300 mb-2 flex items-center gap-2">
                  <span>🤖</span> OpenAI (AI Processing)
                </h4>
                <ul className="text-sm space-y-1">
                  <li>
                    <strong>Purpose:</strong> Processes CV content and job
                    descriptions to generate customized CVs
                  </li>
                  <li>
                    <strong>Data shared:</strong> CV text, job description text
                    (temporarily)
                  </li>
                  <li>
                    <strong>Important:</strong> OpenAI does not train models on
                    your data
                  </li>
                  <li>
                    <strong>Privacy:</strong>{" "}
                    <a
                      href="https://openai.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lime-300 hover:underline"
                    >
                      openai.com/privacy
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                  <span>💳</span> Stripe (Payment Processing)
                </h4>
                <ul className="text-sm space-y-1">
                  <li>
                    <strong>Purpose:</strong> Processes subscription payments
                    and manages billing
                  </li>
                  <li>
                    <strong>Data shared:</strong> Email, payment information,
                    billing details
                  </li>
                  <li>
                    <strong>Privacy:</strong>{" "}
                    <a
                      href="https://stripe.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lime-300 hover:underline"
                    >
                      stripe.com/privacy
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-red-500/10 to-yellow-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-red-300 mb-2 flex items-center gap-2">
                  <span>🔐</span> Google (OAuth Authentication)
                </h4>
                <ul className="text-sm space-y-1">
                  <li>
                    <strong>Purpose:</strong> Authenticates your identity via
                    Google account (if you use Google sign-in)
                  </li>
                  <li>
                    <strong>Data shared:</strong> Authentication tokens only
                  </li>
                  <li>
                    <strong>Privacy:</strong>{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lime-300 hover:underline"
                    >
                      policies.google.com/privacy
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white/90 mb-3 mt-6">
              5.2 Legal Requirements
            </h3>
            <p className="mb-2">
              We may disclose your information if required by law or to:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Comply with legal processes (court orders, subpoenas)</li>
              <li>Enforce our Terms of Service</li>
              <li>Protect our rights, property, or safety</li>
              <li>Prevent fraud or security threats</li>
              <li>Respond to government requests</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              6. Data Retention
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-300 mb-2">
                  Active Accounts
                </h4>
                <p className="text-sm">
                  We retain your data while your account is active and for as
                  long as needed to provide the Service.
                </p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-orange-300 mb-2">
                  Deleted Accounts
                </h4>
                <p className="text-sm">
                  Upon deletion request, we delete your personal data within{" "}
                  <strong>30 days</strong>. Backups are deleted within 90 days.
                </p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-300 mb-2">
                  Billing Records
                </h4>
                <p className="text-sm">
                  Retained for <strong>7 years</strong> to comply with UK tax
                  and accounting laws.
                </p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-purple-300 mb-2">
                  Aggregated Data
                </h4>
                <p className="text-sm">
                  We may retain anonymized, aggregated data indefinitely for
                  analytics purposes.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              7. Data Security
            </h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to
              protect your personal data:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-semibold text-cyan-300 mb-2">
                  Technical Measures:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Encryption in transit (HTTPS/TLS)</li>
                  <li>Encryption at rest for sensitive data</li>
                  <li>Secure password hashing (bcrypt)</li>
                  <li>Regular security updates</li>
                  <li>Access controls</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lime-300 mb-2">
                  Organizational Measures:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Limited access (need-to-know basis)</li>
                  <li>Regular security training</li>
                  <li>Incident response procedures</li>
                </ul>
              </div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-sm text-yellow-300">
                <strong>⚠️ Important:</strong> No method of transmission or
                storage is 100% secure. While we strive to protect your data, we
                cannot guarantee absolute security.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              8. Your Data Protection Rights
            </h2>

            <h3 className="text-xl font-semibold text-white/90 mb-3">
              8.1 Rights for UK and EEA Users (GDPR/UK GDPR)
            </h3>
            <div className="space-y-2 mb-6">
              <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                <span className="text-2xl">✅</span>
                <div>
                  <h4 className="font-semibold text-lime-300">
                    Right to Access
                  </h4>
                  <p className="text-sm">
                    Request a copy of your personal data
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                <span className="text-2xl">✏️</span>
                <div>
                  <h4 className="font-semibold text-lime-300">
                    Right to Rectification
                  </h4>
                  <p className="text-sm">
                    Correct inaccurate or incomplete data
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                <span className="text-2xl">🗑️</span>
                <div>
                  <h4 className="font-semibold text-lime-300">
                    Right to Erasure ("Right to be Forgotten")
                  </h4>
                  <p className="text-sm">
                    Request deletion of your personal data
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                <span className="text-2xl">📦</span>
                <div>
                  <h4 className="font-semibold text-lime-300">
                    Right to Data Portability
                  </h4>
                  <p className="text-sm">
                    Receive your data in a structured, machine-readable format
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white/90 mb-3">
              8.2 Rights for California Users (CCPA)
            </h3>
            <ul className="list-disc list-inside space-y-1 ml-4 mb-6">
              <li>Right to Know: Request information about data collection</li>
              <li>Right to Delete: Request deletion of personal information</li>
              <li>Right to Opt-Out: We do not sell personal data</li>
              <li>
                Right to Non-Discrimination: We won't discriminate for
                exercising rights
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-white/90 mb-3">
              8.3 How to Exercise Your Rights
            </h3>
            <div className="bg-gradient-to-r from-cyan-500/10 to-lime-500/10 border border-cyan-500/30 rounded-lg p-4">
              <p className="mb-2">
                To exercise any of these rights, contact us at:
              </p>
              <a
                href="mailto:i.seyfouri@gmail.com"
                className="text-lime-300 hover:underline font-semibold text-lg"
              >
                i.seyfouri@gmail.com
              </a>
              <p className="text-sm mt-3 text-white/60">
                We will respond within:
              </p>
              <ul className="text-sm space-y-1 mt-1">
                <li>• 30 days (GDPR/UK GDPR)</li>
                <li>• 45 days (CCPA)</li>
              </ul>
            </div>
          </section>

          {/* Section 9 */}
          <section className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              9. International Data Transfers
            </h2>
            <p className="mb-4">
              Our Service uses third-party providers that may process data
              outside the United Kingdom and European Economic Area:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Supabase: May store data in various regions</li>
              <li>OpenAI: Processes data in the United States</li>
              <li>Stripe: Processes payment data globally</li>
            </ul>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="font-semibold text-blue-300 mb-2">
                These transfers are protected by:
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>
                  ✓ Standard Contractual Clauses (SCCs) approved by the European
                  Commission
                </li>
                <li>✓ Adequacy decisions where applicable</li>
                <li>✓ Our service providers' data protection commitments</li>
              </ul>
            </div>
          </section>

          {/* Section 10 */}
          <section className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              10. Children's Privacy
            </h2>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="mb-2">
                Our Service is not intended for individuals under{" "}
                <strong className="text-red-300">18 years of age</strong>. We do
                not knowingly collect personal data from children.
              </p>
              <p className="text-sm text-white/60">
                If you are a parent or guardian and believe your child has
                provided us with personal data, please contact us at{" "}
                <a
                  href="mailto:i.seyfouri@gmail.com"
                  className="text-lime-300 hover:underline"
                >
                  i.seyfouri@gmail.com
                </a>
                . We will delete such information promptly.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              11. Cookies and Tracking Technologies
            </h2>

            <h3 className="text-xl font-semibold text-white/90 mb-3">
              11.1 Cookies We Use
            </h3>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-green-300 mb-2">
                Essential Cookies:
              </h4>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Authentication cookies (to keep you logged in)</li>
                <li>• Session management cookies</li>
                <li>• Security cookies</li>
              </ul>
              <p className="text-xs text-white/60 mt-2">
                These are necessary for the Service to function and cannot be
                disabled.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-white/90 mb-3">
              11.2 Third-Party Cookies
            </h3>
            <p className="mb-2">
              Our third-party service providers may set their own cookies:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
              <li>Supabase (authentication)</li>
              <li>Stripe (payment processing)</li>
            </ul>

            <h3 className="text-xl font-semibold text-white/90 mb-3">
              11.3 Your Cookie Choices
            </h3>
            <p className="text-sm text-white/60">
              Most browsers allow you to view, delete, and block cookies. Note:
              Blocking essential cookies may prevent you from using the Service.
            </p>
          </section>

          {/* Section 12 */}
          <section className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              12. AI and Automated Processing
            </h2>

            <h3 className="text-xl font-semibold text-white/90 mb-3">
              12.1 How We Use AI
            </h3>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-4">
              <p className="mb-2">Our Service uses OpenAI's GPT models to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Analyze your CV content</li>
                <li>Match your experience to job descriptions</li>
                <li>Generate customized CV text</li>
                <li>Create tailored cover letters</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-white/90 mb-3">
              12.2 Data Processing
            </h3>
            <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
              <li>Your CV is sent to OpenAI's API for processing</li>
              <li>Processing is temporary and transient</li>
              <li>
                OpenAI does not use your data to train their models (per our API
                agreement)
              </li>
              <li>
                Generated content is based on AI interpretation and{" "}
                <strong className="text-yellow-300">
                  should be reviewed by you
                </strong>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-white/90 mb-3">
              12.3 No Automated Decision-Making
            </h3>
            <p className="text-sm text-white/60">
              We do not use automated decision-making or profiling that produces
              legal or similarly significant effects on you.
            </p>
          </section>

          {/* Section 13 */}
          <section className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              13. Changes to This Privacy Policy
            </h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. Changes will
              be effective when posted, and we will update the "Last Updated"
              date.
            </p>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-300 mb-2">
                For Material Changes:
              </h4>
              <ul className="text-sm space-y-1 ml-4">
                <li>• We will notify you via email</li>
                <li>• Or provide prominent notice on our website</li>
              </ul>
              <p className="text-xs text-white/60 mt-2">
                Continued use of the Service after changes constitutes
                acceptance of the updated policy.
              </p>
            </div>
          </section>

          {/* Section 14 - Contact */}
          <section className="bg-gradient-to-r from-cyan-500/10 to-lime-500/10 border border-cyan-500/30 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              14. Contact Information
            </h2>
            <p className="mb-4">
              For questions, concerns, or requests regarding your personal data
              or this Privacy Policy, please contact:
            </p>
            <div className="bg-black/30 rounded-lg p-4 mb-4">
              <p className="font-semibold text-lime-300 mb-2">TailorMyCV</p>
              <p className="text-sm space-y-1">
                <span className="block">
                  Email:{" "}
                  <a
                    href="mailto:i.seyfouri@gmail.com"
                    className="text-cyan-300 hover:underline"
                  >
                    i.seyfouri@gmail.com
                  </a>
                </span>
                <span className="block">Location: United Kingdom</span>
                <span className="block text-white/60">
                  Response Time: Within 5 business days
                </span>
              </p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-300 mb-2">
                For UK/EEA Users:
              </h4>
              <p className="text-sm mb-2">
                If you are not satisfied with our response, you have the right
                to lodge a complaint with the Information Commissioner's Office
                (ICO):
              </p>
              <ul className="text-sm space-y-1">
                <li>
                  Website:{" "}
                  <a
                    href="https://ico.org.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lime-300 hover:underline"
                  >
                    ico.org.uk
                  </a>
                </li>
                <li>Phone: 0303 123 1113</li>
                <li className="text-xs text-white/60">
                  Address: Information Commissioner's Office, Wycliffe House,
                  Water Lane, Wilmslow, Cheshire SK9 5AF
                </li>
              </ul>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center py-8 border-t border-white/10">
            <p className="text-sm text-white/60 italic">
              By using TailorMyCV, you acknowledge that you have read and
              understood this Privacy Policy and agree to its terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
