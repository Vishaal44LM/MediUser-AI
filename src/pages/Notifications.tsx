import React, { useState } from 'react';
import { BellIcon, CheckIcon, TrashIcon, FilterIcon } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'medication' | 'appointment' | 'system';
}
const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([{
    id: 1,
    title: 'Medication Reminder',
    message: 'Time to take Lisinopril 10mg',
    time: '2 hours ago',
    read: false,
    type: 'medication'
  }, {
    id: 2,
    title: 'Appointment Reminder',
    message: 'You have an appointment with Dr. Smith tomorrow at 10:30 AM',
    time: '5 hours ago',
    read: false,
    type: 'appointment'
  }, {
    id: 3,
    title: 'Health Reading Alert',
    message: 'Your blood pressure reading is higher than normal',
    time: 'Yesterday',
    read: true,
    type: 'system'
  }, {
    id: 4,
    title: 'Medication Refill',
    message: 'Your prescription for Metformin will run out in 3 days',
    time: '2 days ago',
    read: true,
    type: 'medication'
  }]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'medication' | 'appointment'>('all');
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => notification.id === id ? {
      ...notification,
      read: true
    } : notification));
  };
  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });
  return <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Notifications
        </h1>
        <Button variant="outline" size="sm" onClick={markAllAsRead}>
          Mark all as read
        </Button>
      </div>
      {/* Filters */}
      <div className="mb-4 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          <button className={`px-3 py-2 rounded-lg text-sm ${filter === 'all' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' : 'bg-white dark:bg-gray-800'}`} onClick={() => setFilter('all')}>
            All
          </button>
          <button className={`px-3 py-2 rounded-lg text-sm ${filter === 'unread' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' : 'bg-white dark:bg-gray-800'}`} onClick={() => setFilter('unread')}>
            Unread
          </button>
          <button className={`px-3 py-2 rounded-lg text-sm ${filter === 'medication' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' : 'bg-white dark:bg-gray-800'}`} onClick={() => setFilter('medication')}>
            Medication
          </button>
          <button className={`px-3 py-2 rounded-lg text-sm ${filter === 'appointment' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' : 'bg-white dark:bg-gray-800'}`} onClick={() => setFilter('appointment')}>
            Appointments
          </button>
        </div>
      </div>
      {/* Notifications List */}
      <Card className="bg-white dark:bg-gray-800">
        {filteredNotifications.length > 0 ? <div className="space-y-3">
            {filteredNotifications.map(notification => <div key={notification.id} className={`p-3 border rounded-lg ${notification.read ? 'border-gray-200 dark:border-gray-700' : 'border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/20'}`}>
                <div className="flex">
                  <div className={`p-2 rounded-full mr-3 ${notification.type === 'medication' ? 'bg-green-100 dark:bg-green-900/30' : notification.type === 'appointment' ? 'bg-purple-100 dark:bg-purple-900/30' : 'bg-orange-100 dark:bg-orange-900/30'}`}>
                    <BellIcon size={16} className={`${notification.type === 'medication' ? 'text-green-600 dark:text-green-400' : notification.type === 'appointment' ? 'text-purple-600 dark:text-purple-400' : 'text-orange-600 dark:text-orange-400'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-sm dark:text-white">
                        {notification.title}
                        {!notification.read && <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {notification.message}
                    </p>
                    <div className="flex mt-2 space-x-2">
                      {!notification.read && <button onClick={() => markAsRead(notification.id)} className="text-xs flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                          <CheckIcon size={12} className="mr-1" />
                          Mark as read
                        </button>}
                      <button onClick={() => deleteNotification(notification.id)} className="text-xs flex items-center text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                        <TrashIcon size={12} className="mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>)}
          </div> : <div className="text-center py-6">
            <BellIcon size={24} className="mx-auto text-gray-400 mb-2" />
            <p className="text-gray-500 dark:text-gray-400">
              No notifications found
            </p>
          </div>}
      </Card>
    </div>;
};
export default Notifications;