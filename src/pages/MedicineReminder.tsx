import React, { useEffect, useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, BellIcon, BellOffIcon, CalendarIcon, ClockIcon, PhoneIcon, CheckIcon, XIcon } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
interface Medicine {
  id: number;
  name: string;
  description: string;
  startDate: string;
  nextDose: string;
  notificationsEnabled: boolean;
  history?: MedicineHistory[];
}
interface MedicineHistory {
  id: number;
  date: string;
  status: 'taken' | 'missed' | 'upcoming';
}
interface EmergencyContact {
  name: string;
  phone: string;
  notifyOnMissed: boolean;
}
const MedicineReminder = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const [showEmergencyContactForm, setShowEmergencyContactForm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyFilter, setHistoryFilter] = useState<'all' | 'taken' | 'missed'>('all');
  // Load data from localStorage or use defaults
  const loadFromStorage = (key: string, defaultValue: any) => {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(`Failed to parse ${key} from localStorage`, e);
        return defaultValue;
      }
    }
    return defaultValue;
  };
  const [medicines, setMedicines] = useState<Medicine[]>(loadFromStorage('medicines', [{
    id: 1,
    name: 'Lisinopril 10mg',
    description: 'Once daily at 1:00 PM with food',
    startDate: 'Apr 15, 2023',
    nextDose: 'Today 1:00 PM',
    notificationsEnabled: true,
    history: [{
      id: 101,
      date: '2023-05-07T13:00:00',
      status: 'taken'
    }, {
      id: 102,
      date: '2023-05-06T13:00:00',
      status: 'taken'
    }, {
      id: 103,
      date: '2023-05-05T13:00:00',
      status: 'missed'
    }, {
      id: 104,
      date: '2023-05-04T13:00:00',
      status: 'taken'
    }]
  }, {
    id: 2,
    name: 'Metformin 500mg',
    description: 'Twice daily at 9:00 AM and 6:00 PM with meals',
    startDate: 'Mar 10, 2023',
    nextDose: 'Today 6:00 PM',
    notificationsEnabled: true,
    history: [{
      id: 201,
      date: '2023-05-07T09:00:00',
      status: 'taken'
    }, {
      id: 202,
      date: '2023-05-06T18:00:00',
      status: 'taken'
    }, {
      id: 203,
      date: '2023-05-06T09:00:00',
      status: 'missed'
    }, {
      id: 204,
      date: '2023-05-05T18:00:00',
      status: 'taken'
    }]
  }, {
    id: 3,
    name: 'Vitamin D 1000IU',
    description: 'Once daily at 9:00 PM',
    startDate: 'Jan 5, 2023',
    nextDose: 'Today 9:00 PM',
    notificationsEnabled: false,
    history: [{
      id: 301,
      date: '2023-05-06T21:00:00',
      status: 'taken'
    }, {
      id: 302,
      date: '2023-05-05T21:00:00',
      status: 'taken'
    }, {
      id: 303,
      date: '2023-05-04T21:00:00',
      status: 'taken'
    }, {
      id: 304,
      date: '2023-05-03T21:00:00',
      status: 'taken'
    }]
  }, {
    id: 4,
    name: 'Aspirin 81mg',
    description: 'Once daily at 8:00 AM with breakfast',
    startDate: 'Feb 20, 2023',
    nextDose: 'Tomorrow 8:00 AM',
    notificationsEnabled: true,
    history: [{
      id: 401,
      date: '2023-05-07T08:00:00',
      status: 'taken'
    }, {
      id: 402,
      date: '2023-05-06T08:00:00',
      status: 'missed'
    }, {
      id: 403,
      date: '2023-05-05T08:00:00',
      status: 'taken'
    }, {
      id: 404,
      date: '2023-05-04T08:00:00',
      status: 'taken'
    }]
  }]));
  const [emergencyContact, setEmergencyContact] = useState<EmergencyContact>(loadFromStorage('emergencyContact', {
    name: '',
    phone: '',
    notifyOnMissed: true
  }));
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [medicineToDelete, setMedicineToDelete] = useState<number | null>(null);
  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('medicines', JSON.stringify(medicines));
  }, [medicines]);
  useEffect(() => {
    localStorage.setItem('emergencyContact', JSON.stringify(emergencyContact));
  }, [emergencyContact]);
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    if (showEditForm) setShowEditForm(false);
  };
  const handleEdit = (medicine: Medicine) => {
    setEditingMedicine(medicine);
    setShowEditForm(true);
    setShowAddForm(false);
  };
  const handleToggleNotification = (id: number) => {
    setMedicines(medicines.map(medicine => medicine.id === id ? {
      ...medicine,
      notificationsEnabled: !medicine.notificationsEnabled
    } : medicine));
  };
  const handleDelete = (id: number) => {
    setMedicineToDelete(id);
    setShowDeleteConfirm(true);
  };
  const confirmDelete = () => {
    if (medicineToDelete === null) return;
    setMedicines(medicines.filter(medicine => medicine.id !== medicineToDelete));
    setShowDeleteConfirm(false);
    setMedicineToDelete(null);
  };
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setMedicineToDelete(null);
  };
  const handleSaveReminder = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const nameInput = form.elements.namedItem('medicine-name') as HTMLInputElement;
    const dosageInput = form.elements.namedItem('medicine-dosage') as HTMLInputElement;
    const frequencyInput = form.elements.namedItem('medicine-frequency') as HTMLSelectElement;
    const timeInput = form.elements.namedItem('medicine-time') as HTMLInputElement;
    const dateInput = form.elements.namedItem('medicine-date') as HTMLInputElement;
    const notesInput = form.elements.namedItem('medicine-notes') as HTMLTextAreaElement;
    const appNotifyInput = form.elements.namedItem('notification-app') as HTMLInputElement;
    // Create a new medicine object
    const newMedicine: Medicine = {
      id: Date.now(),
      name: `${nameInput.value} ${dosageInput.value}`,
      description: `${frequencyInput.value} at ${timeInput.value} ${notesInput.value ? '- ' + notesInput.value : ''}`,
      startDate: new Date(dateInput.value).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      nextDose: `Today ${timeInput.value}`,
      notificationsEnabled: appNotifyInput.checked,
      history: []
    };
    setMedicines(prevMedicines => [...prevMedicines, newMedicine]);
    setShowAddForm(false);
    form.reset();
  };
  const handleUpdateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMedicine) return;
    const form = e.target as HTMLFormElement;
    const nameInput = form.elements.namedItem('medicine-name') as HTMLInputElement;
    const dosageInput = form.elements.namedItem('medicine-dosage') as HTMLInputElement;
    const frequencyInput = form.elements.namedItem('medicine-frequency') as HTMLSelectElement;
    // Update the medicine
    setMedicines(prevMedicines => prevMedicines.map(medicine => medicine.id === editingMedicine.id ? {
      ...medicine,
      name: `${nameInput.value} ${dosageInput.value}`,
      description: medicine.description.replace(/^[^at]+ at/, `${frequencyInput.value} at`)
    } : medicine));
    setShowEditForm(false);
    setEditingMedicine(null);
  };
  const handleSaveEmergencyContact = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const nameInput = form.elements.namedItem('contact-name') as HTMLInputElement;
    const phoneInput = form.elements.namedItem('contact-phone') as HTMLInputElement;
    const notifyInput = form.elements.namedItem('contact-notify') as HTMLInputElement;
    setEmergencyContact({
      name: nameInput.value,
      phone: phoneInput.value,
      notifyOnMissed: notifyInput.checked
    });
    setShowEmergencyContactForm(false);
  };
  // Get all medicine history items and sort by date
  const getAllMedicineHistory = () => {
    const allHistory: Array<MedicineHistory & {
      medicineName: string;
    }> = [];
    medicines.forEach(medicine => {
      if (medicine.history) {
        const historyWithName = medicine.history.map(item => ({
          ...item,
          medicineName: medicine.name
        }));
        allHistory.push(...historyWithName);
      }
    });
    return allHistory.filter(item => historyFilter === 'all' || item.status === historyFilter).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };
  // Format date for display
  const formatHistoryDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };
  return <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Medicine Reminders
        </h1>
        <Button onClick={toggleAddForm} icon={<PlusIcon size={16} />} size="sm">
          Add
        </Button>
      </div>
      {/* Emergency Contact Section */}
      <Card className="mb-4 bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-medium flex items-center dark:text-white">
            <PhoneIcon size={16} className="mr-2 text-blue-600 dark:text-blue-400" />
            Emergency Contact
          </h2>
          <Button size="sm" variant={emergencyContact.name ? 'outline' : 'primary'} onClick={() => setShowEmergencyContactForm(true)}>
            {emergencyContact.name ? 'Edit' : 'Add Contact'}
          </Button>
        </div>
        {emergencyContact.name ? <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium dark:text-white">
                  {emergencyContact.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                  <PhoneIcon size={14} className="mr-1" />
                  {emergencyContact.phone}
                </p>
              </div>
              <div className="flex items-center">
                <span className={`px-2 py-1 text-xs rounded-full ${emergencyContact.notifyOnMissed ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-300'}`}>
                  {emergencyContact.notifyOnMissed ? 'Notifications On' : 'Notifications Off'}
                </span>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {emergencyContact.notifyOnMissed ? 'This contact will be notified if you miss a dose.' : 'This contact will not be notified if you miss a dose.'}
            </p>
          </div> : <p className="text-sm text-gray-600 dark:text-gray-400">
            Add an emergency contact who will be notified if you miss a dose.
          </p>}
      </Card>
      {/* Emergency Contact Form */}
      {showEmergencyContactForm && <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <Card className="bg-white dark:bg-gray-800 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium dark:text-white">
                Emergency Contact
              </h2>
              <button onClick={() => setShowEmergencyContactForm(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                <XIcon size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveEmergencyContact}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Contact Name
                  </label>
                  <input id="contact-name" name="contact-name" type="text" defaultValue={emergencyContact.name} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input id="contact-phone" name="contact-phone" type="tel" defaultValue={emergencyContact.phone} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="(123) 456-7890" required />
                </div>
                <div className="flex items-center">
                  <input id="contact-notify" name="contact-notify" type="checkbox" defaultChecked={emergencyContact.notifyOnMissed} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label htmlFor="contact-notify" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Notify this contact if I miss a dose
                  </label>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <Button type="button" variant="outline" onClick={() => setShowEmergencyContactForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Contact</Button>
                </div>
              </div>
            </form>
          </Card>
        </div>}
      {/* Add Medicine Form */}
      {showAddForm && <Card className="mb-4 bg-white dark:bg-gray-800">
          <h2 className="text-base font-medium mb-3 dark:text-white">
            Add New Medicine
          </h2>
          <form onSubmit={handleSaveReminder}>
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Medicine Name
                </label>
                <input type="text" name="medicine-name" id="medicine-name" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Lisinopril" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Dosage
                </label>
                <input type="text" name="medicine-dosage" id="medicine-dosage" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., 10mg" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Frequency
                </label>
                <select name="medicine-frequency" id="medicine-frequency" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  <option>Once daily</option>
                  <option>Twice daily</option>
                  <option>Three times daily</option>
                  <option>Every other day</option>
                  <option>Weekly</option>
                  <option>As needed</option>
                  <option>Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Time(s)
                </label>
                <div className="flex space-x-2">
                  <input type="time" name="medicine-time" id="medicine-time" className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  <button type="button" className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
                    <PlusIcon size={16} />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Date
                </label>
                <div className="relative">
                  <input type="date" name="medicine-date" id="medicine-date" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Notes (Optional)
              </label>
              <textarea name="medicine-notes" id="medicine-notes" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows={2} placeholder="e.g., Take with food"></textarea>
            </div>
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Notifications
              </label>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center">
                  <input type="checkbox" id="notification-app" name="notification-app" className="mr-2" defaultChecked />
                  <label htmlFor="notification-app" className="text-xs text-gray-700 dark:text-gray-300">
                    App
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="notification-email" name="notification-email" className="mr-2" />
                  <label htmlFor="notification-email" className="text-xs text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="notification-sms" name="notification-sms" className="mr-2" />
                  <label htmlFor="notification-sms" className="text-xs text-gray-700 dark:text-gray-300">
                    SMS
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="notification-emergency" name="notification-emergency" className="mr-2" />
                  <label htmlFor="notification-emergency" className="text-xs text-gray-700 dark:text-gray-300">
                    Emergency Contact
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={toggleAddForm} type="button">
                Cancel
              </Button>
              <Button type="submit" size="sm">
                Save
              </Button>
            </div>
          </form>
        </Card>}
      {/* Edit Medicine Form */}
      {showEditForm && editingMedicine && <Card className="mb-4 bg-white dark:bg-gray-800">
          <h2 className="text-base font-medium mb-3 dark:text-white">
            Edit Medicine
          </h2>
          <form onSubmit={handleUpdateReminder}>
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Medicine Name
                </label>
                <input type="text" name="medicine-name" id="medicine-name" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue={editingMedicine.name.split(' ')[0]} required />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Dosage
                </label>
                <input type="text" name="medicine-dosage" id="medicine-dosage" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue={editingMedicine.name.split(' ')[1] || ''} required />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Frequency
                </label>
                <select name="medicine-frequency" id="medicine-frequency" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue={editingMedicine.description.split(' at')[0]} required>
                  <option>Once daily</option>
                  <option>Twice daily</option>
                  <option>Three times daily</option>
                  <option>Every other day</option>
                  <option>Weekly</option>
                  <option>As needed</option>
                  <option>Custom</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" type="button" onClick={() => {
            setShowEditForm(false);
            setEditingMedicine(null);
          }}>
                Cancel
              </Button>
              <Button type="submit" size="sm">
                Update
              </Button>
            </div>
          </form>
        </Card>}
      {/* Medicine List */}
      <Card className="bg-white dark:bg-gray-800 mb-4">
        <h2 className="text-base font-medium mb-3 dark:text-white">
          Your Medications
        </h2>
        <div className="space-y-3">
          {medicines.map(medicine => <div key={medicine.id} className="border dark:border-gray-700 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-base font-medium dark:text-white">
                    {medicine.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    {medicine.description}
                  </p>
                </div>
                <div className="flex space-x-1">
                  <button className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full" onClick={() => handleEdit(medicine)} aria-label="Edit medicine">
                    <PencilIcon size={14} />
                  </button>
                  <button className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full" onClick={() => handleDelete(medicine.id)} aria-label="Delete medicine">
                    <TrashIcon size={14} />
                  </button>
                  <button className="p-1.5 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-full" onClick={() => handleToggleNotification(medicine.id)} aria-label={medicine.notificationsEnabled ? 'Disable notifications' : 'Enable notifications'}>
                    {medicine.notificationsEnabled ? <BellIcon size={14} /> : <BellOffIcon size={14} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-3">
                <div className="flex items-center">
                  <CalendarIcon size={12} className="mr-1" />
                  <span>Started: {medicine.startDate}</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon size={12} className="mr-1" />
                  <span>Next: {medicine.nextDose}</span>
                </div>
              </div>
            </div>)}
        </div>
      </Card>
      {/* Medicine History Section */}
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-base font-medium dark:text-white">
          Medication History
        </h2>
        <button onClick={() => setShowHistory(!showHistory)} className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
          {showHistory ? 'Hide' : 'Show'}
        </button>
      </div>
      {showHistory && <Card className="bg-white dark:bg-gray-800 mb-4">
          <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
            <button className={`px-3 py-1 rounded-full text-xs font-medium ${historyFilter === 'all' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'}`} onClick={() => setHistoryFilter('all')}>
              All
            </button>
            <button className={`px-3 py-1 rounded-full text-xs font-medium ${historyFilter === 'taken' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'}`} onClick={() => setHistoryFilter('taken')}>
              Taken
            </button>
            <button className={`px-3 py-1 rounded-full text-xs font-medium ${historyFilter === 'missed' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'}`} onClick={() => setHistoryFilter('missed')}>
              Missed
            </button>
          </div>
          <div className="space-y-2">
            {getAllMedicineHistory().map(item => <div key={`${item.id}`} className="flex items-center justify-between p-2 border-b dark:border-gray-700 last:border-0">
                <div className="flex items-center">
                  <div className={`p-1 rounded-full mr-2 ${item.status === 'taken' ? 'bg-green-100 dark:bg-green-900/30' : item.status === 'missed' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-yellow-100 dark:bg-yellow-900/30'}`}>
                    {item.status === 'taken' ? <CheckIcon size={12} className="text-green-600 dark:text-green-400" /> : item.status === 'missed' ? <XIcon size={12} className="text-red-600 dark:text-red-400" /> : <ClockIcon size={12} className="text-yellow-600 dark:text-yellow-400" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium dark:text-white">
                      {item.medicineName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatHistoryDate(item.date)}
                    </p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${item.status === 'taken' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : item.status === 'missed' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'}`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </div>)}
          </div>
        </Card>}
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <Card className="bg-white dark:bg-gray-800 w-full max-w-xs">
            <h2 className="text-lg font-medium mb-3 dark:text-white">
              Confirm Deletion
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Are you sure you want to delete this medicine reminder?
            </p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={cancelDelete}>
                Cancel
              </Button>
              <Button onClick={confirmDelete} size="sm" className="bg-red-600 hover:bg-red-700 focus:ring-red-300 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-800">
                Delete
              </Button>
            </div>
          </Card>
        </div>}
    </div>;
};
export default MedicineReminder;