import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, PillIcon, ActivityIcon, BellIcon, CalendarIcon } from 'lucide-react';
import Button from '../components/Button';
const LearnMore = () => {
  return <div className="min-h-screen w-full bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
        <div className="px-4 py-4 flex items-center">
          <Link to="/" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <ArrowLeftIcon size={18} className="mr-2" />
            Back
          </Link>
          <div className="mx-auto text-xl font-bold text-blue-600 dark:text-blue-400">
            About MediUser
          </div>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <section className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Simplify Your Health Management
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            MediUser is a comprehensive health management application designed
            to help you stay on top of your medications, track vital health
            metrics, and never miss important appointments.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" alt="MediUser app on mobile device" className="rounded-lg shadow-lg w-full h-auto" />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Why Choose MediUser?
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    Easy-to-use interface designed for users of all ages
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    Customizable medication reminders and schedules
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    Comprehensive health tracking with visual insights
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    Secure and private - your health data stays protected
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <PillIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 dark:text-white">
                Medication Management
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Set up your medication schedule, get timely reminders, and track
                your adherence over time.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <ActivityIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 dark:text-white">
                Health Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor vital signs like blood pressure, glucose levels, and
                weight with easy-to-read charts.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                <CalendarIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 dark:text-white">
                Appointment Calendar
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Keep track of doctor appointments, tests, and other
                health-related events in one place.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
                <BellIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 dark:text-white">
                Smart Notifications
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get timely alerts for medications, appointments, and health
                readings that need attention.
              </p>
            </div>
          </div>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            How It Works
          </h2>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center w-full md:w-1/4">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                    1
                  </span>
                </div>
                <h3 className="font-medium dark:text-white">Sign Up</h3>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center w-full md:w-1/4">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                    2
                  </span>
                </div>
                <h3 className="font-medium dark:text-white">
                  Set Up Your Profile
                </h3>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center w-full md:w-1/4">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                    3
                  </span>
                </div>
                <h3 className="font-medium dark:text-white">Add Medications</h3>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center w-full md:w-1/4">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                    4
                  </span>
                </div>
                <h3 className="font-medium dark:text-white">Stay Healthy!</h3>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Getting started with MediUser is easy. Sign up, set up your
              profile with your health information, add your medications and
              schedule, and you're ready to go!
            </p>
          </div>
        </section>
        <section className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl mb-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of users who have simplified their health
              management with MediUser. Our app helps you stay on track with
              medications, monitor your health, and live your best life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button size="lg">Get Started Free</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                Is my health data secure?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, we take security very seriously. All your health data is
                encrypted and stored securely. We never share your personal
                information with third parties without your explicit consent.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                Can I use MediUser for my entire family?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Currently, MediUser accounts are designed for individual use.
                We're working on a family plan feature that will be available in
                a future update.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                How do notifications work?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                MediUser sends push notifications to your device at your
                scheduled medication times. You can also set up email or SMS
                notifications in your settings.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                Is there a cost to use MediUser?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                MediUser offers a free basic plan with all essential features.
                We also offer a premium plan with advanced features for a small
                monthly subscription.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 dark:bg-gray-950 text-gray-300 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-3">MediUser</h3>
              <p className="text-sm">
                Your personal health companion for medication management and
                health tracking.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Features</h4>
              <ul className="space-y-1 text-sm">
                <li>Medicine Reminders</li>
                <li>Health Tracking</li>
                <li>Calendar</li>
                <li>Notifications</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link to="/learn-more" className="hover:text-blue-300">
                    About
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link to="/terms" className="hover:text-blue-300">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-4 text-xs text-center">
            &copy; {new Date().getFullYear()} MediUser. All rights reserved.
          </div>
        </div>
      </footer>
    </div>;
};
export default LearnMore;