import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon, PillIcon, StethoscopeIcon } from 'lucide-react';
const Calendar = () => {
  // State for tracking the current month/year
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventType, setEventType] = useState('medication');
  // Sample events data - in a real app this would come from an API or state management
  const events = [{
    id: 1,
    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
    title: 'Lisinopril 10mg',
    time: '8:00 AM',
    type: 'medication',
    recurring: 'daily'
  }, {
    id: 2,
    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
    title: 'Metformin 500mg',
    time: '6:00 PM',
    type: 'medication',
    recurring: 'daily'
  }, {
    id: 3,
    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
    title: 'Dr. Smith Appointment',
    time: '10:30 AM',
    type: 'appointment',
    recurring: 'none'
  }, {
    id: 4,
    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 20),
    title: 'Blood Test',
    time: '9:00 AM',
    type: 'appointment',
    recurring: 'none'
  }, {
    id: 5,
    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 25),
    title: 'Refill Prescription',
    time: '11:00 AM',
    type: 'reminder',
    recurring: 'none'
  }];
  // Get month names
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  // Get day names
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  const goToToday = () => {
    const today = new Date();
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
  };
  // Function to generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    // First day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay();
    // Last day of the month
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const totalDaysInMonth = lastDayOfMonth.getDate();
    // Days from previous month to show
    const daysInPreviousMonth = new Date(year, month, 0).getDate();
    const days = [];
    // Add days from previous month
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, daysInPreviousMonth - i),
        isCurrentMonth: false,
        isToday: false
      });
    }
    // Add days from current month
    const today = new Date();
    for (let i = 1; i <= totalDaysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
      });
    }
    // Add days from next month to complete the grid (6 rows of 7 days)
    const totalDaysToShow = 42; // 6 rows of 7 days
    const remainingDays = totalDaysToShow - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        isToday: false
      });
    }
    return days;
  };
  const calendarDays = generateCalendarDays();
  // Function to check if a date has events
  const getEventsForDate = date => {
    return events.filter(event => event.date.getDate() === date.getDate() && event.date.getMonth() === date.getMonth() && event.date.getFullYear() === date.getFullYear());
  };
  // Function to format date
  const formatDate = date => {
    return `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };
  // Function to handle date selection
  const handleDateSelect = date => {
    setSelectedDate(date);
  };
  // Function to handle adding new event
  const handleAddEvent = () => {
    setShowEventModal(true);
  };
  const handleEventTypeChange = type => {
    setEventType(type);
  };
  const selectedDateEvents = getEventsForDate(selectedDate);
  return <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Calendar
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Manage your schedule
          </p>
        </div>
        <Button icon={<PlusIcon size={16} />} onClick={handleAddEvent} size="sm">
          Add
        </Button>
      </div>

      {/* Calendar Header */}
      <Card className="bg-white dark:bg-gray-800 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold dark:text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex items-center space-x-2">
            <button className="p-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full" onClick={goToPreviousMonth}>
              <ChevronLeftIcon size={16} />
            </button>
            <button className="p-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full" onClick={goToToday}>
              <CalendarIcon size={16} />
            </button>
            <button className="p-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full" onClick={goToNextMonth}>
              <ChevronRightIcon size={16} />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day names */}
          {dayNames.map(day => <div key={day} className="text-center py-1 text-xs font-medium text-gray-600 dark:text-gray-300">
              {day}
            </div>)}

          {/* Calendar days */}
          {calendarDays.map((day, index) => {
          const dayEvents = getEventsForDate(day.date);
          const isSelected = selectedDate.getDate() === day.date.getDate() && selectedDate.getMonth() === day.date.getMonth() && selectedDate.getFullYear() === day.date.getFullYear();
          return <div key={index} onClick={() => handleDateSelect(day.date)} className={`
                  min-h-[40px] p-1 border rounded-md cursor-pointer transition-colors
                  ${!day.isCurrentMonth ? 'bg-gray-50 dark:bg-gray-900 text-gray-400' : ''}
                  ${day.isToday ? 'border-blue-500 dark:border-blue-400' : 'border-gray-200 dark:border-gray-700'}
                  ${isSelected ? 'bg-blue-50 dark:bg-blue-900/30' : ''}
                  hover:bg-gray-100 dark:hover:bg-gray-700/50
                `}>
                <div className="flex justify-between items-start">
                  <span className={`
                    text-xs font-medium p-1 h-5 w-5 flex items-center justify-center rounded-full
                    ${day.isToday ? 'bg-blue-500 text-white' : ''}
                  `}>
                    {day.date.getDate()}
                  </span>
                  {dayEvents.length > 0 && <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-1 rounded-full">
                      {dayEvents.length}
                    </span>}
                </div>
              </div>;
        })}
        </div>
      </Card>

      {/* Event Details */}
      <Card className="bg-white dark:bg-gray-800">
        <div className="mb-3 border-b pb-2 dark:border-gray-700">
          <h2 className="text-base font-medium dark:text-white">
            {formatDate(selectedDate)}
          </h2>
        </div>
        {selectedDateEvents.length > 0 ? <div className="space-y-3">
            {selectedDateEvents.map(event => <div key={event.id} className={`
                  p-3 rounded-lg border
                  ${event.type === 'medication' ? 'border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20' : event.type === 'appointment' ? 'border-purple-200 dark:border-purple-900 bg-purple-50 dark:bg-purple-900/20' : 'border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-900/20'}
                `}>
                <div className="flex items-start">
                  <div className={`
                    p-2 rounded-full mr-3
                    ${event.type === 'medication' ? 'bg-green-100 dark:bg-green-900/30' : event.type === 'appointment' ? 'bg-purple-100 dark:bg-purple-900/30' : 'bg-orange-100 dark:bg-orange-900/30'}
                  `}>
                    {event.type === 'medication' ? <PillIcon size={14} className="text-green-600 dark:text-green-400" /> : event.type === 'appointment' ? <StethoscopeIcon size={14} className="text-purple-600 dark:text-purple-400" /> : <CalendarIcon size={14} className="text-orange-600 dark:text-orange-400" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm dark:text-white">
                      {event.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {event.time}
                    </p>
                    {event.recurring !== 'none' && <span className="text-xs px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full mt-1 inline-block">
                        {event.recurring}
                      </span>}
                  </div>
                </div>
              </div>)}
          </div> : <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            <CalendarIcon size={24} className="mx-auto mb-2 text-gray-400 dark:text-gray-600" />
            <p className="text-sm">No events scheduled for this day</p>
            <Button variant="outline" size="sm" className="mt-3" onClick={handleAddEvent}>
              Add Event
            </Button>
          </div>}
      </Card>

      {/* Add Event Modal */}
      {showEventModal && <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <Card className="bg-white dark:bg-gray-800 w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b pb-3 mb-4 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-medium dark:text-white">
                Add New Event
              </h2>
              <button onClick={() => setShowEventModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                &times;
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Event Type
                </label>
                <div className="flex space-x-2">
                  <button type="button" onClick={() => handleEventTypeChange('medication')} className={`flex-1 py-2 px-3 rounded-md border flex items-center justify-center ${eventType === 'medication' ? 'border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'border-gray-300 dark:border-gray-600'}`}>
                    <PillIcon size={16} className="mr-2" />
                    Medication
                  </button>
                  <button type="button" onClick={() => handleEventTypeChange('appointment')} className={`flex-1 py-2 px-3 rounded-md border flex items-center justify-center ${eventType === 'appointment' ? 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' : 'border-gray-300 dark:border-gray-600'}`}>
                    <StethoscopeIcon size={16} className="mr-2" />
                    Appointment
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" placeholder={eventType === 'medication' ? 'Medication name and dose' : 'Appointment title'} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" defaultValue={`${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Time
                  </label>
                  <input type="time" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" />
                </div>
              </div>
              {eventType === 'medication' && <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Frequency
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md">
                    <option value="once">Once</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notes (Optional)
                </label>
                <textarea className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" rows={3} placeholder="Add any additional information"></textarea>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <Button variant="outline" onClick={() => setShowEventModal(false)}>
                  Cancel
                </Button>
                <Button>Save Event</Button>
              </div>
            </form>
          </Card>
        </div>}
    </div>;
};
export default Calendar;