import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PillIcon, DropletIcon, HeartIcon, ActivityIcon, MoonIcon, BellIcon, ChevronRightIcon, CheckIcon } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useUser } from '../contexts/UserContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const healthData = [{
  day: 'Mon',
  bloodPressure: 120,
  heartRate: 72,
  sleep: 7.2
}, {
  day: 'Tue',
  bloodPressure: 118,
  heartRate: 75,
  sleep: 6.8
}, {
  day: 'Wed',
  bloodPressure: 122,
  heartRate: 70,
  sleep: 7.5
}, {
  day: 'Thu',
  bloodPressure: 119,
  heartRate: 73,
  sleep: 8.0
}, {
  day: 'Fri',
  bloodPressure: 121,
  heartRate: 74,
  sleep: 7.0
}, {
  day: 'Sat',
  bloodPressure: 117,
  heartRate: 76,
  sleep: 7.8
}, {
  day: 'Sun',
  bloodPressure: 120,
  heartRate: 71,
  sleep: 8.2
}];
const Dashboard = () => {
  const navigate = useNavigate();
  const {
    user
  } = useUser();
  const [medicationTaken, setMedicationTaken] = useState(false);
  const [showMedicationConfirm, setShowMedicationConfirm] = useState(false);
  const handleTakeMedication = () => {
    setShowMedicationConfirm(true);
  };
  const confirmMedication = () => {
    setMedicationTaken(true);
    setShowMedicationConfirm(false);
  };
  const cancelMedication = () => {
    setShowMedicationConfirm(false);
  };
  const handleViewAllMedications = () => {
    navigate('/medicine');
  };
  return <div className="p-4">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Hey, {user?.name || 'there'}!
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Here's your health summary for today.
        </p>
      </div>

      {/* Next Reminder Card */}
      <Card className="mb-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-l-4 border-blue-500">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-800/40 rounded-full mr-3">
              {medicationTaken ? <CheckIcon className="h-5 w-5 text-green-600 dark:text-green-400" /> : <BellIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
            </div>
            <div>
              <h3 className="font-medium text-base dark:text-white">
                {medicationTaken ? 'Medication Taken: Lisinopril 10mg' : 'Next Medication: Lisinopril 10mg'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Today at 1:00 PM with food
              </p>
            </div>
          </div>
          {!medicationTaken && <Button size="sm" onClick={handleTakeMedication}>
              Take Now
            </Button>}
          {medicationTaken && <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full">
              Taken
            </span>}
        </div>
      </Card>

      {/* Health Summary Cards - Horizontal Scrollable */}
      <div className="mb-6 overflow-x-auto pb-2">
        <div className="flex space-x-3" style={{
        minWidth: 'max-content'
      }}>
          <Card className="bg-white dark:bg-gray-800 w-24">
            <div className="flex flex-col items-center text-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-2">
                <PillIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xs font-medium dark:text-white">Medicines</h3>
              <p className="text-lg font-bold mt-1 dark:text-white">
                {medicationTaken ? '4/5' : '3/5'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Taken</p>
            </div>
          </Card>
          <Card className="bg-white dark:bg-gray-800 w-24">
            <div className="flex flex-col items-center text-center">
              <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mb-2">
                <DropletIcon className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-xs font-medium dark:text-white">Water</h3>
              <p className="text-lg font-bold mt-1 dark:text-white">1.2/2.5</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Liters</p>
            </div>
          </Card>
          <Card className="bg-white dark:bg-gray-800 w-24">
            <div className="flex flex-col items-center text-center">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full mb-2">
                <HeartIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xs font-medium dark:text-white">BP</h3>
              <p className="text-lg font-bold mt-1 dark:text-white">120/80</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">mmHg</p>
            </div>
          </Card>
          <Card className="bg-white dark:bg-gray-800 w-24">
            <div className="flex flex-col items-center text-center">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-2">
                <ActivityIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xs font-medium dark:text-white">
                Heart Rate
              </h3>
              <p className="text-lg font-bold mt-1 dark:text-white">72</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">BPM</p>
            </div>
          </Card>
          <Card className="bg-white dark:bg-gray-800 w-24">
            <div className="flex flex-col items-center text-center">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-2">
                <MoonIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xs font-medium dark:text-white">Sleep</h3>
              <p className="text-lg font-bold mt-1 dark:text-white">7.5</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Hours</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Health Trends */}
      <div className="mb-4">
        <Card title="Blood Pressure Trend" className="bg-white dark:bg-gray-800 mb-4">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={healthData} margin={{
              top: 5,
              right: 10,
              left: 0,
              bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{
                fontSize: 10
              }} />
                <YAxis domain={[100, 140]} tick={{
                fontSize: 10
              }} />
                <Tooltip />
                <Area type="monotone" dataKey="bloodPressure" stroke="#3b82f6" fill="#93c5fd" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Heart Rate & Sleep" className="bg-white dark:bg-gray-800">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={healthData} margin={{
              top: 5,
              right: 10,
              left: 0,
              bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{
                fontSize: 10
              }} />
                <YAxis yAxisId="left" domain={[60, 90]} tick={{
                fontSize: 10
              }} />
                <YAxis yAxisId="right" orientation="right" domain={[4, 10]} tick={{
                fontSize: 10
              }} />
                <Tooltip />
                <Area yAxisId="left" type="monotone" dataKey="heartRate" stroke="#f97316" fill="#fed7aa" />
                <Area yAxisId="right" type="monotone" dataKey="sleep" stroke="#6366f1" fill="#c7d2fe" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Upcoming Medications */}
      <Card title="Today's Medication Schedule" className="mb-4 bg-white dark:bg-gray-800">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full mr-3">
                <PillIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-medium text-sm dark:text-white">
                  Lisinopril 10mg
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  1:00 PM with food
                </p>
              </div>
            </div>
            <span className={`px-2 py-1 ${medicationTaken ? 'bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-300' : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'} text-xs rounded-full`}>
              {medicationTaken ? 'Taken' : 'Upcoming'}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full mr-3">
                <PillIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-medium text-sm dark:text-white">
                  Metformin 500mg
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  6:00 PM with dinner
                </p>
              </div>
            </div>
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full">
              Upcoming
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 dark:bg-gray-600 rounded-full mr-3">
                <PillIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <h4 className="font-medium text-sm dark:text-white">
                  Aspirin 81mg
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  8:00 AM with breakfast
                </p>
              </div>
            </div>
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-300 text-xs rounded-full">
              Taken
            </span>
          </div>
        </div>
        <div className="mt-4">
          <Button variant="outline" fullWidth onClick={handleViewAllMedications}>
            <span className="flex items-center justify-center">
              View All Medications
              <ChevronRightIcon size={16} className="ml-1" />
            </span>
          </Button>
        </div>
      </Card>

      {/* Medication Confirmation Modal */}
      {showMedicationConfirm && <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <Card className="bg-white dark:bg-gray-800 w-full max-w-xs">
            <h2 className="text-lg font-medium mb-3 dark:text-white">
              Confirm Medication
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Are you taking Lisinopril 10mg now?
            </p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={cancelMedication}>
                Cancel
              </Button>
              <Button onClick={confirmMedication} size="sm">
                Confirm
              </Button>
            </div>
          </Card>
        </div>}
    </div>;
};
export default Dashboard;