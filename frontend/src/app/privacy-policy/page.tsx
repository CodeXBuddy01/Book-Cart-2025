// app/privacy-policy/page.tsx
import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Privacy Policy</h1>

      <p className="text-gray-700 mb-6">
        This Privacy Policy outlines how <strong>BookKart</strong> collects, uses, and protects your personal information. By using our platform, you agree to this policy.
      </p>

      <div className="space-y-6 text-gray-700">
        <div>
          <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Your name, email address, and contact number</li>
            <li>Location details for delivery and pickup</li>
            <li>Transaction details related to your book orders</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Facilitate book buying and selling</li>
            <li>Improve our services and user experience</li>
            <li>Send updates, order notifications, or promotional content</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">3. Data Protection</h2>
          <p>
            We implement strict security measures to protect your data from unauthorized access, disclosure, or misuse.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">4. Sharing of Information</h2>
          <p>
            We do not sell or rent your personal information to third parties. Your data may be shared with delivery services or payment gateways to complete your transactions.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">5. Cookies</h2>
          <p>
            Our platform uses cookies to personalize your experience and analyze site usage. You can control cookie settings through your browser.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">6. Third-Party Links</h2>
          <p>
            Our site may contain links to other websites. We are not responsible for their privacy policies or content.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">7. Changes to This Policy</h2>
          <p>
            We reserve the right to modify this policy at any time. Updates will be reflected on this page with a revised "Last Updated" date.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
          <p>
            For any questions or concerns regarding this Privacy Policy, please contact us at:<br />
            <strong>Email:</strong> privacy@bookkart.in
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;
