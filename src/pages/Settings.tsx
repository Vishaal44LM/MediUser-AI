import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { UserIcon, BellIcon, ShieldIcon, GlobeIcon, MoonIcon, LogOutIcon, SunIcon, CheckIcon, AlertCircleIcon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
const Settings = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const navigate = useNavigate();
  const {
    theme,
    toggleTheme
  } = useTheme();
  // Form states
  const [accountForm, setAccountForm] = useState({
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '(555) 123-4567'
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notificationPrefs, setNotificationPrefs] = useState({
    medicationReminders: true,
    healthReadings: true,
    appointmentAlerts: true,
    emailNotifications: false
  });
  const [privacySettings, setPrivacySettings] = useState({
    shareWithDoctors: true,
    shareForResearch: false
  });
  const [languageSettings, setLanguageSettings] = useState({
    displayLanguage: 'en',
    dateFormat: 'mdy',
    timeFormat: '12h'
  });
  const [appearanceSettings, setAppearanceSettings] = useState({
    selectedTheme: theme,
    fontSize: 3
  });
  // Font size management
  useEffect(() => {
    document.documentElement.style.fontSize = `${14 + (appearanceSettings.fontSize - 3) * 2}px`;
    return () => {
      document.documentElement.style.fontSize = '';
    };
  }, [appearanceSettings.fontSize]);
  // Handle section change
  const handleSectionChange = section => {
    setActiveSection(section);
  };
  // Show toast notification
  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
  // Account form handlers
  const handleAccountChange = e => {
    const {
      name,
      value
    } = e.target;
    setAccountForm({
      ...accountForm,
      [name]: value
    });
  };
  const handleAccountSubmit = e => {
    e.preventDefault();
    showNotification('Account information updated successfully');
  };
  // Password form handlers
  const handlePasswordChange = e => {
    const {
      name,
      value
    } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value
    });
  };
  const handlePasswordSubmit = e => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showNotification('Passwords do not match', 'error');
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      showNotification('Password must be at least 8 characters', 'error');
      return;
    }
    showNotification('Password updated successfully');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };
  // Notification preferences handlers
  const handleNotificationToggle = setting => {
    setNotificationPrefs({
      ...notificationPrefs,
      [setting]: !notificationPrefs[setting]
    });
  };
  const handleSaveNotifications = () => {
    showNotification('Notification preferences saved');
  };
  // Privacy settings handlers
  const handlePrivacyToggle = setting => {
    setPrivacySettings({
      ...privacySettings,
      [setting]: !privacySettings[setting]
    });
  };
  const handleSavePrivacy = () => {
    showNotification('Privacy settings saved');
  };
  // Enable 2FA handler
  const handleEnable2FA = () => {
    showNotification('2FA verification code sent to your email');
  };
  // Language settings handlers
  const handleLanguageChange = e => {
    const {
      name,
      value
    } = e.target;
    setLanguageSettings({
      ...languageSettings,
      [name]: value
    });
  };
  const handleSaveLanguage = () => {
    showNotification('Language preferences saved');
  };
  // Appearance settings handlers
  const handleThemeChange = newTheme => {
    setAppearanceSettings({
      ...appearanceSettings,
      selectedTheme: newTheme
    });
    // If the theme is different from the current theme, toggle it
    if (newTheme !== theme) {
      toggleTheme();
    }
  };
  const handleFontSizeChange = e => {
    setAppearanceSettings({
      ...appearanceSettings,
      fontSize: parseInt(e.target.value)
    });
  };
  const handleSaveAppearance = () => {
    showNotification('Appearance settings saved');
  };
  // Logout handler
  const handleLogout = () => {
    // In a real app, you would clear auth tokens, etc.
    navigate('/');
  };
  // Delete account handler
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };
  const confirmDeleteAccount = () => {
    // In a real app, you would call an API to delete the account
    showNotification('Account scheduled for deletion');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };
  const cancelDeleteAccount = () => {
    setShowDeleteConfirm(false);
  };
  return <div className="p-6">
      {/* Toast notification */}
      {showToast && <div className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-lg ${toastType === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'}`}>
          <span className="mr-2">
            {toastType === 'success' ? <CheckIcon size={18} /> : <AlertCircleIcon size={18} />}
          </span>
          {toastMessage}
        </div>}

      {/* Delete account confirmation modal */}
      {showDeleteConfirm && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 dark:text-white">
              Delete Account?
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              This action cannot be undone. All your data will be permanently
              deleted.
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={cancelDeleteAccount}>
                Cancel
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 focus:ring-red-300 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-800" onClick={confirmDeleteAccount}>
                Delete Account
              </Button>
            </div>
          </div>
        </div>}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your account preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="bg-white dark:bg-gray-800 sticky top-6">
            <div className="flex flex-col space-y-1">
              <button className={`flex items-center px-4 py-3 rounded-lg ${activeSection === 'account' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`} onClick={() => handleSectionChange('account')}>
                <UserIcon size={20} className="mr-3" />
                Account
              </button>
              <button className={`flex items-center px-4 py-3 rounded-lg ${activeSection === 'notifications' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`} onClick={() => handleSectionChange('notifications')}>
                <BellIcon size={20} className="mr-3" />
                Notifications
              </button>
              <button className={`flex items-center px-4 py-3 rounded-lg ${activeSection === 'privacy' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`} onClick={() => handleSectionChange('privacy')}>
                <ShieldIcon size={20} className="mr-3" />
                Privacy & Security
              </button>
              <button className={`flex items-center px-4 py-3 rounded-lg ${activeSection === 'language' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`} onClick={() => handleSectionChange('language')}>
                <GlobeIcon size={20} className="mr-3" />
                Language
              </button>
              <button className={`flex items-center px-4 py-3 rounded-lg ${activeSection === 'appearance' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`} onClick={() => handleSectionChange('appearance')}>
                <MoonIcon size={20} className="mr-3" />
                Appearance
              </button>
            </div>
          </Card>
        </div>

        <div className="md:col-span-2">
          {activeSection === 'account' && <>
              <Card className="bg-white dark:bg-gray-800 mb-6">
                <h2 className="text-lg font-medium mb-4 dark:text-white">
                  Account Information
                </h2>
                <form onSubmit={handleAccountSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input type="text" name="fullName" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" value={accountForm.fullName} onChange={handleAccountChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input type="email" name="email" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" value={accountForm.email} onChange={handleAccountChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input type="tel" name="phone" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" value={accountForm.phone} onChange={handleAccountChange} />
                  </div>
                  <div className="pt-4">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </Card>
              <Card className="bg-white dark:bg-gray-800 mb-6">
                <h2 className="text-lg font-medium mb-4 dark:text-white">
                  Change Password
                </h2>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Current Password
                    </label>
                    <input type="password" name="currentPassword" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" value={passwordForm.currentPassword} onChange={handlePasswordChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      New Password
                    </label>
                    <input type="password" name="newPassword" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" value={passwordForm.newPassword} onChange={handlePasswordChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Confirm New Password
                    </label>
                    <input type="password" name="confirmPassword" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" value={passwordForm.confirmPassword} onChange={handlePasswordChange} />
                  </div>
                  <div className="pt-4">
                    <Button type="submit">Update Password</Button>
                  </div>
                </form>
              </Card>
            </>}

          {activeSection === 'notifications' && <Card className="bg-white dark:bg-gray-800">
              <h2 className="text-lg font-medium mb-4 dark:text-white">
                Notification Preferences
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
                  <div>
                    <h3 className="font-medium dark:text-white">
                      Medication Reminders
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Get alerts for your scheduled medications
                    </p>
                  </div>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={notificationPrefs.medicationReminders} onChange={() => handleNotificationToggle('medicationReminders')} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
                  <div>
                    <h3 className="font-medium dark:text-white">
                      Health Readings
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Reminders to log your health data
                    </p>
                  </div>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={notificationPrefs.healthReadings} onChange={() => handleNotificationToggle('healthReadings')} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-b dark:border-gray-700">
                  <div>
                    <h3 className="font-medium dark:text-white">
                      Appointment Alerts
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Notifications about upcoming appointments
                    </p>
                  </div>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={notificationPrefs.appointmentAlerts} onChange={() => handleNotificationToggle('appointmentAlerts')} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h3 className="font-medium dark:text-white">
                      Email Notifications
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive email alerts for important events
                    </p>
                  </div>
                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={notificationPrefs.emailNotifications} onChange={() => handleNotificationToggle('emailNotifications')} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                <div className="pt-4">
                  <Button onClick={handleSaveNotifications}>
                    Save Preferences
                  </Button>
                </div>
              </div>
            </Card>}

          {activeSection === 'privacy' && <Card className="bg-white dark:bg-gray-800">
              <h2 className="text-lg font-medium mb-4 dark:text-white">
                Privacy & Security
              </h2>
              <div className="space-y-4">
                <div className="border-b pb-4 dark:border-gray-700">
                  <h3 className="font-medium mb-2 dark:text-white">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline" onClick={handleEnable2FA}>
                    Enable 2FA
                  </Button>
                </div>
                <div className="border-b pb-4 dark:border-gray-700">
                  <h3 className="font-medium mb-2 dark:text-white">
                    Data Sharing
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Control how your health data is shared
                  </p>
                  <div className="flex items-center mt-3">
                    <input id="share-doctors" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700" checked={privacySettings.shareWithDoctors} onChange={() => handlePrivacyToggle('shareWithDoctors')} />
                    <label htmlFor="share-doctors" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Share with healthcare providers
                    </label>
                  </div>
                  <div className="flex items-center mt-3">
                    <input id="share-research" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700" checked={privacySettings.shareForResearch} onChange={() => handlePrivacyToggle('shareForResearch')} />
                    <label htmlFor="share-research" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Share anonymized data for research
                    </label>
                  </div>
                </div>
                <div className="pb-4">
                  <h3 className="font-medium mb-2 dark:text-white">
                    Login Sessions
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Manage devices where you're currently logged in
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div>
                        <p className="font-medium dark:text-white">
                          Current Device - Chrome
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Last active: Just now
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs">
                        Active
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div>
                        <p className="font-medium dark:text-white">
                          iPhone 13 - Safari
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Last active: 2 hours ago
                        </p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => showNotification('Device logged out successfully')}>
                        Log out
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <Button onClick={handleSavePrivacy}>Save Changes</Button>
                </div>
              </div>
            </Card>}

          {activeSection === 'language' && <Card className="bg-white dark:bg-gray-800">
              <h2 className="text-lg font-medium mb-4 dark:text-white">
                Language Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Display Language
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" name="displayLanguage" value={languageSettings.displayLanguage} onChange={handleLanguageChange}>
                    <option value="en">English (US)</option>
                    <option value="es">Español (Spanish)</option>
                    <option value="fr">Français (French)</option>
                    <option value="de">Deutsch (German)</option>
                    <option value="zh">中文 (Chinese)</option>
                    <option value="ja">日本語 (Japanese)</option>
                    <option value="ko">한국어 (Korean)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date Format
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" name="dateFormat" value={languageSettings.dateFormat} onChange={handleLanguageChange}>
                    <option value="mdy">MM/DD/YYYY (US)</option>
                    <option value="dmy">DD/MM/YYYY (UK, EU)</option>
                    <option value="ymd">YYYY/MM/DD (ISO)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Time Format
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" name="timeFormat" value={languageSettings.timeFormat} onChange={handleLanguageChange}>
                    <option value="12h">12-hour (AM/PM)</option>
                    <option value="24h">24-hour</option>
                  </select>
                </div>
                <div className="pt-4">
                  <Button onClick={handleSaveLanguage}>Save Preferences</Button>
                </div>
              </div>
            </Card>}

          {activeSection === 'appearance' && <Card className="bg-white dark:bg-gray-800">
              <h2 className="text-lg font-medium mb-4 dark:text-white">
                Appearance Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-3 dark:text-white">Theme</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button className={`border ${appearanceSettings.selectedTheme === 'light' ? 'border-blue-500 dark:border-blue-400' : 'border-gray-300 dark:border-gray-600'} rounded-lg p-3 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors`} onClick={() => handleThemeChange('light')}>
                      <div className="h-12 bg-white rounded mb-2"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Light
                      </span>
                    </button>
                    <button className={`border ${appearanceSettings.selectedTheme === 'dark' ? 'border-blue-500 dark:border-blue-400' : 'border-gray-300 dark:border-gray-600'} rounded-lg p-3 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors`} onClick={() => handleThemeChange('dark')}>
                      <div className="h-12 bg-gray-900 rounded mb-2"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Dark
                      </span>
                    </button>
                  </div>
                </div>
                <div className="border-t pt-4 dark:border-gray-700">
                  <h3 className="font-medium mb-3 dark:text-white">
                    Font Size
                  </h3>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      A
                    </span>
                    <input type="range" min="1" max="5" value={appearanceSettings.fontSize} onChange={handleFontSizeChange} className="mx-4 flex-1" />
                    <span className="text-lg text-gray-700 dark:text-gray-300">
                      A
                    </span>
                  </div>
                </div>
                <div className="pt-4">
                  <Button onClick={handleSaveAppearance}>
                    Save Preferences
                  </Button>
                </div>
              </div>
            </Card>}

          {/* Danger Zone - Always visible */}
          <Card className="bg-white dark:bg-gray-800 mt-6">
            <h2 className="text-lg font-medium mb-4 dark:text-white">
              Danger Zone
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium dark:text-white">
                    Delete Account
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50 dark:text-red-500 dark:border-red-500 dark:hover:bg-red-950" onClick={handleDeleteAccount}>
                  Delete Account
                </Button>
              </div>
              <div className="pt-4 border-t dark:border-gray-700">
                <Button variant="outline" icon={<LogOutIcon size={18} />} onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>;
};
export default Settings;