import React from "react";
import { Link } from "react-router";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg text-gray-800 font-sans">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">DevCollab Privacy Policy</h1>

      <p className="mb-10 text-sm text-gray-600 uppercase tracking-wide font-medium">
        <strong>Effective Date:</strong> 19 / 05 / 2025
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 border-b border-gray-300 pb-2">Overview</h2>
        <p className="leading-relaxed">
          Your privacy matters. This policy explains what data we collect, how we use it, and how we keep it safe.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 border-b border-gray-300 pb-2">What We Collect</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Account Info:</strong> When you sign in with GitHub, we collect your GitHub username, email, and public profile details to create your DevCollab account.</li>
          <li><strong>Your Content:</strong> Posts, comments, and saved items you create on the platform.</li>
          <li><strong>Usage Data:</strong> Information about how you use DevCollab, such as device type, browser, and IP address.</li>
          <li><strong>Cookies:</strong> We use cookies to manage your login sessions securely.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 border-b border-gray-300 pb-2">How We Use Your Data</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>To verify your identity through GitHub and manage your account.</li>
          <li>To let you create and interact with posts and comments.</li>
          <li>To improve and secure DevCollab.</li>
          <li>To communicate important updates or support messages.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 border-b border-gray-300 pb-2">Sharing Your Information</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>We do <strong>not</strong> sell or rent your data.</li>
          <li>We share data only with trusted service providers who help us run DevCollab.</li>
          <li>We may disclose information if required by law or to protect users.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 border-b border-gray-300 pb-2">Your Choices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>You can request access, correction, or deletion of your data.</li>
          <li>You can control cookie settings in your browser, but some features may require cookies.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 border-b border-gray-300 pb-2">Security</h2>
        <p className="leading-relaxed text-gray-700">
          We protect your data with standard security measures but cannot guarantee complete security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 border-b border-gray-300 pb-2">Changes to This Policy</h2>
        <p className="leading-relaxed text-gray-700">
          We may update this policy occasionally. Changes will be posted here with a new effective date.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3 border-b border-gray-300 pb-2">Contact Us</h2>
        <p className="mb-3 text-gray-700">Questions? Reach out at:</p>
        <p className="mb-4">
          <Link 
            to="/Contact" 
            className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
          >
            Contact Page
          </Link>
        </p>
        <p className="text-gray-700">
          <strong>Website:</strong>{" "}
          <a 
            href="https://dev-collab-client.vercel.app" 
            target="_blank" 
            rel="noreferrer"
            className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
          >
            https://dev-collab-client.vercel.app/
          </a>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
