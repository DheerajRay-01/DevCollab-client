import React from "react";
import { Link } from "react-router";

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg text-gray-800 font-sans">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">DevCollab Terms and Conditions</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 border-b border-gray-300 pb-2">Acceptance of Terms</h2>
        <p className="leading-relaxed">
          By accessing or using DevCollab, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 border-b border-gray-300 pb-2">User Responsibilities</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>You are responsible for maintaining the confidentiality of your account and password.</li>
          <li>You agree not to use DevCollab for any unlawful or harmful activities.</li>
          <li>You will not post content that is offensive, defamatory, or violates any laws.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 border-b border-gray-300 pb-2">Content Ownership</h2>
        <p className="leading-relaxed">
          You retain ownership of any content you post on DevCollab. By posting, you grant us a license to use, display, and distribute your content to provide the service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 border-b border-gray-300 pb-2">Termination</h2>
        <p className="leading-relaxed">
          We reserve the right to suspend or terminate your account if you violate these terms or engage in harmful behavior.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 border-b border-gray-300 pb-2">Limitation of Liability</h2>
        <p className="leading-relaxed">
          DevCollab is provided "as is" without warranties. We are not liable for any damages resulting from your use of the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 border-b border-gray-300 pb-2">Changes to Terms</h2>
        <p className="leading-relaxed">
          We may update these terms occasionally. Changes will be posted here with an updated effective date.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3 border-b border-gray-300 pb-2">Contact Us</h2>
        <p className="mb-3 text-gray-700">If you have questions about these terms, please visit our:</p>
        <p className="mb-4">
          <Link 
            to="/Contact" 
            className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
          >
            Contact Page
          </Link>
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
