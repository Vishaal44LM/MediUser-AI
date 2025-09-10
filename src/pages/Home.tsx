import React from 'react';
import { Link } from 'react-router-dom';
import { BellIcon, CalendarIcon, PillIcon, ActivityIcon, ClockIcon, BarChart3Icon, SunIcon, MoonIcon } from 'lucide-react';
import Button from '../components/Button';
import { useTheme } from '../contexts/ThemeContext';
const Home = () => {
  const {
    theme,
    toggleTheme
  } = useTheme();
  return <div className="min-h-screen w-full bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Mobile Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
        <div className="px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400 hover:opacity-80 transition-opacity">
            MediUser
          </Link>
          <div className="flex items-center space-x-3">
            <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label="Toggle theme">
              {theme === 'dark' ? <SunIcon size={20} className="text-yellow-400" /> : <MoonIcon size={20} className="text-gray-600" />}
            </button>
            <Link to="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 py-10 px-4 transition-colors duration-200">
        <div className="flex flex-col">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-200">
              Never Miss a Dose.
              <br />
              Track Your Health Effortlessly.
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-200">
              Stay on top of your medication schedule and monitor your vital
              health metrics all in one place. MediUser helps you maintain your
              health routine with smart reminders and intuitive tracking.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/signup">
                <Button size="md">Get Started</Button>
              </Link>
              <Link to="/learn-more">
                <Button variant="outline" size="md">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Medicine tracking illustration" className="w-full max-w-sm h-auto rounded-2xl shadow-xl" />
          </div>
        </div>
      </section>
      {/* Benefits Section */}
      <section className="py-10 px-4 dark:bg-gray-900 transition-colors duration-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8 transition-colors duration-200">
          How MediUser Works
        </h2>
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center transition-colors duration-200">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200">
              <PillIcon size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2 dark:text-white transition-colors duration-200">
              Medicine Reminders
            </h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
              Never miss a dose with customized reminders for all your
              medications.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center transition-colors duration-200">
            <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200">
              <ActivityIcon size={24} className="text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2 dark:text-white transition-colors duration-200">
              Health Tracking
            </h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
              Monitor your vital signs and health metrics with easy-to-use
              tracking tools.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center transition-colors duration-200">
            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200">
              <BarChart3Icon size={24} className="text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2 dark:text-white transition-colors duration-200">
              Progress Insights
            </h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
              Visualize your health data with intuitive charts and personalized
              insights.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center transition-colors duration-200">
            <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200">
              <CalendarIcon size={24} className="text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2 dark:text-white transition-colors duration-200">
              Calendar View
            </h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
              See your complete medication schedule and health events in one
              calendar.
            </p>
          </div>
        </div>
      </section>
      {/* CTA Section - Changed to white background with dark text */}
      <section className="bg-white dark:bg-white py-10 px-4 text-gray-800 transition-colors duration-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-lg mb-6 text-gray-700">
            Join thousands of users who have simplified their health management
            with MediUser.
          </p>
          <Link to="/signup">
            <Button size="lg">Sign Up Free</Button>
          </Link>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-950 text-gray-300 py-8 px-4 transition-colors duration-200">
        <div className="grid grid-cols-2 gap-6 mb-6">
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
        </div>
        <div className="border-t border-gray-700 pt-4 text-xs text-center">
          &copy; {new Date().getFullYear()} MediUser. All rights reserved.
        </div>
      </footer>
    </div>;
};
export default Home;