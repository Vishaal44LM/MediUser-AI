import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
const Terms = () => {
  return <div className="min-h-screen w-full bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
        <div className="px-4 py-4 flex items-center">
          <Link to="/" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <ArrowLeftIcon size={18} className="mr-2" />
            Back
          </Link>
          <div className="mx-auto text-xl font-bold text-blue-600 dark:text-blue-400">
            Terms of Service
          </div>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
          </p>
          <div className="prose dark:prose-invert max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Welcome to MediUser. These Terms of Service govern your use of our
              website and mobile application. By accessing or using MediUser,
              you agree to be bound by these Terms.
            </p>
            <h2>2. Definitions</h2>
            <p>
              "Service" refers to the MediUser application and website. "User"
              refers to any individual who accesses or uses the Service.
              "Content" refers to all information, data, text, and other
              materials that are available on the Service.
            </p>
            <h2>3. User Accounts</h2>
            <p>
              When you create an account with us, you must provide information
              that is accurate, complete, and current at all times. Failure to
              do so constitutes a breach of the Terms, which may result in
              immediate termination of your account.
            </p>
            <p>
              You are responsible for safeguarding the password that you use to
              access the Service and for any activities or actions under your
              password.
            </p>
            <h2>4. User Content</h2>
            <p>
              Our Service allows you to post, link, store, share and otherwise
              make available certain information, text, graphics, or other
              material. You are responsible for the Content that you post to the
              Service, including its legality, reliability, and appropriateness.
            </p>
            <h2>5. Health Information</h2>
            <p>
              MediUser is not a healthcare provider and does not provide medical
              advice. The Service is designed to help you manage your health
              information and medication schedules, but should not be used as a
              substitute for professional medical advice, diagnosis, or
              treatment.
            </p>
            <p>
              Always seek the advice of your physician or other qualified health
              provider with any questions you may have regarding a medical
              condition.
            </p>
            <h2>6. Privacy</h2>
            <p>
              Your privacy is important to us. Our Privacy Policy explains how
              we collect, use, and protect your personal information. By using
              our Service, you agree to the collection and use of information in
              accordance with our Privacy Policy.
            </p>
            <h2>7. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality
              are and will remain the exclusive property of MediUser and its
              licensors. The Service is protected by copyright, trademark, and
              other laws.
            </p>
            <h2>8. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without
              prior notice or liability, for any reason whatsoever, including
              without limitation if you breach the Terms.
            </p>
            <h2>9. Changes</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. If a revision is material we will try to
              provide at least 30 days' notice prior to any new terms taking
              effect.
            </p>
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at
              support@mediuser.com.
            </p>
          </div>
        </div>
        <div className="text-center mb-8">
          <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            Return to Home Page
          </Link>
        </div>
      </main>
      <footer className="bg-gray-800 dark:bg-gray-950 text-gray-300 py-4 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="border-t border-gray-700 pt-4 text-xs text-center">
            &copy; {new Date().getFullYear()} MediUser. All rights reserved.
          </div>
        </div>
      </footer>
    </div>;
};
export default Terms;