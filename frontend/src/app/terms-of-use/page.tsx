// app/terms-of-use/page.tsx
import React from "react";

const TermsOfUsePage = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Terms of Use</h1>

      <p className="text-gray-700 mb-6">
        Welcome to <strong>BookKart</strong>! By accessing or using our platform, you agree to the following terms and conditions. Please read them carefully.
      </p>

      <div className="space-y-6 text-gray-700">
        <div>
          <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p>
            By using BookKart, you agree to comply with and be legally bound by these terms. If you do not agree, please do not use the platform.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">2. Our Service</h2>
          <p>
            BookKart is a middleware platform that helps users buy and sell old books online. We are not responsible for the condition or delivery of the books listed by users.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">3. User Responsibilities</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>You must provide accurate information.</li>
            <li>You are responsible for any content you post.</li>
            <li>Do not post illegal, offensive, or copyrighted content.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">4. Prohibited Activities</h2>
          <p>
            You agree not to misuse the platform, including but not limited to spamming, phishing, posting misleading information, or violating any laws.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">5. Limitation of Liability</h2>
          <p>
            BookKart is not liable for any loss, damage, or disputes arising from your use of the platform or interactions with other users.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">6. Modifications</h2>
          <p>
            We reserve the right to update or change these terms at any time. Continued use of the platform after changes implies your acceptance.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">7. Termination</h2>
          <p>
            We may terminate or suspend your access to the platform at any time for violating these terms or for any other reason deemed necessary.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">8. Contact</h2>
          <p>
            For any questions regarding these terms, please contact us at: <br />
            <strong>Email:</strong> support@bookkart.in
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsOfUsePage;
