import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { HomeIcon, PillIcon, ActivityIcon, CalendarIcon, BellIcon, SettingsIcon, LogOutIcon, MenuIcon, XIcon, SunIcon, MoonIcon, StethoscopeIcon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';
const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {
    theme,
    toggleTheme
  } = useTheme();
  const {
    logout
  } = useUser();
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Top Header for mobile */}
      <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center z-30">
        <button className="text-gray-600 dark:text-gray-300 p-1" onClick={toggleSidebar}>
          <MenuIcon size={24} />
        </button>
        <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
          MediUser
        </Link>
        <button onClick={toggleTheme} className="p-1 rounded-md text-gray-600 dark:text-gray-300" aria-label="Toggle theme">
          {theme === 'dark' ? <SunIcon size={20} className="text-yellow-400" /> : <MoonIcon size={20} className="text-gray-600" />}
        </button>
      </header>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      <aside className={`bg-white dark:bg-gray-800 w-64 fixed top-0 bottom-0 left-0 shadow-lg z-50 transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
            MediUser
          </Link>
          <button onClick={toggleSidebar} className="p-1 rounded-md text-gray-600 dark:text-gray-300">
            <XIcon size={24} />
          </button>
        </div>
        <nav className="p-2 overflow-y-auto h-full">
          <ul className="space-y-1">
            <li>
              <NavLink to="/dashboard" className={({
              isActive
            }) => `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`} onClick={() => setIsSidebarOpen(false)}>
                <HomeIcon size={20} className="mr-3" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/medicine" className={({
              isActive
            }) => `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`} onClick={() => setIsSidebarOpen(false)}>
                <PillIcon size={20} className="mr-3" />
                Medicine Reminders
              </NavLink>
            </li>
            <li>
              <NavLink to="/health" className={({
              isActive
            }) => `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`} onClick={() => setIsSidebarOpen(false)}>
                <ActivityIcon size={20} className="mr-3" />
                Health Tracker
              </NavLink>
            </li>
            <li>
              <NavLink to="/symptom-checker" className={({
              isActive
            }) => `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`} onClick={() => setIsSidebarOpen(false)}>
                <StethoscopeIcon size={20} className="mr-3" />
                Symptom Checker
              </NavLink>
            </li>
            <li>
              <NavLink to="/calendar" className={({
              isActive
            }) => `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`} onClick={() => setIsSidebarOpen(false)}>
                <CalendarIcon size={20} className="mr-3" />
                Calendar
              </NavLink>
            </li>
            <li>
              <NavLink to="/notifications" className={({
              isActive
            }) => `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`} onClick={() => setIsSidebarOpen(false)}>
                <BellIcon size={20} className="mr-3" />
                Notifications
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings" className={({
              isActive
            }) => `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`} onClick={() => setIsSidebarOpen(false)}>
                <SettingsIcon size={20} className="mr-3" />
                Settings
              </NavLink>
            </li>
          </ul>
          <div className="border-t mt-6 pt-4 dark:border-gray-700">
            <button onClick={handleLogout} className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg w-full transition-colors">
              <LogOutIcon size={20} className="mr-3" />
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-200 pb-16">
        <Outlet />
      </main>

      {/* Bottom Navigation Bar for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700 z-30">
        <div className="flex justify-around">
          <NavLink to="/dashboard" className={({
          isActive
        }) => `flex flex-col items-center py-2 px-3 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
            <HomeIcon size={20} />
            <span className="text-xs mt-1">Home</span>
          </NavLink>
          <NavLink to="/medicine" className={({
          isActive
        }) => `flex flex-col items-center py-2 px-3 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
            <PillIcon size={20} />
            <span className="text-xs mt-1">Medicine</span>
          </NavLink>
          <NavLink to="/symptom-checker" className={({
          isActive
        }) => `flex flex-col items-center py-2 px-3 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
            <StethoscopeIcon size={20} />
            <span className="text-xs mt-1">Symptoms</span>
          </NavLink>
          <NavLink to="/health" className={({
          isActive
        }) => `flex flex-col items-center py-2 px-3 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
            <ActivityIcon size={20} />
            <span className="text-xs mt-1">Health</span>
          </NavLink>
          <NavLink to="/notifications" className={({
          isActive
        }) => `flex flex-col items-center py-2 px-3 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
            <BellIcon size={20} />
            <span className="text-xs mt-1">Alerts</span>
          </NavLink>
        </div>
      </nav>
    </div>;
};
export default Layout;