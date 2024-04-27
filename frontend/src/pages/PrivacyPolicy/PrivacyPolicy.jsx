import React from "react";

function PrivacyPolicy() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md font-poppins h-screen mt-20">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        This Privacy Policy describes how [Your Company Name] ("we," "us," or
        "our") collects, uses, and shares personal information when you use our
        website and services. By accessing or using our website, you consent to
        the practices described in this Privacy Policy.
      </p>

      <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
      <p className="mb-4">
        We may collect personal information such as your name, email address,
        and payment details when you use our services or make a purchase. We
        also collect non-personal information, including but not limited to,
        your browser type, device information, and website usage data.
      </p>

      <h2 className="text-xl font-semibold mb-2">
        How We Use Your Information
      </h2>
      <p className="mb-4">We may use your personal information to:</p>
      <ul className="list-disc ml-8 mb-4">
        <li>Provide and deliver the products and services you request.</li>
        <li>Process transactions and send transaction notifications.</li>
        <li>Respond to your customer service requests.</li>
        <li>Send promotional and marketing communications.</li>
        <li>Improve our website and services.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">Information Sharing</h2>
      <p className="mb-4">
        We may share your personal information with third-party service
        providers who assist us in delivering our services. We do not sell your
        personal information to third parties.
      </p>

      <h2 className="text-xl font-semibold mb-2">Security</h2>
      <p className="mb-4">
        We take reasonable measures to protect your personal information from
        unauthorized access, disclosure, alteration, or destruction. However, no
        method of transmission over the internet or electronic storage is
        entirely secure, and we cannot guarantee absolute security.
      </p>

      <h2 className="text-xl font-semibold mb-2">
        Changes to this Privacy Policy
      </h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. The date of the
        most recent revisions will be indicated at the top of this page. We
        encourage you to review this Privacy Policy periodically to stay
        informed about how we are protecting your information.
      </p>

      <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
      <p className="mb-4">
        If you have any questions or concerns about this Privacy Policy, please
        contact us at info@sgpecommerce.com
      </p>
    </div>
  );
}

export default PrivacyPolicy;
