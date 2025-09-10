import React, { useState } from 'react';
import { HeartIcon, DropletIcon, ScaleIcon, ThermometerIcon, PlusIcon } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// Sample data
const bloodPressureData = [{
  date: 'May 1',
  systolic: 120,
  diastolic: 80
}, {
  date: 'May 2',
  systolic: 118,
  diastolic: 78
}, {
  date: 'May 3',
  systolic: 122,
  diastolic: 82
}, {
  date: 'May 4',
  systolic: 119,
  diastolic: 79
}, {
  date: 'May 5',
  systolic: 121,
  diastolic: 81
}, {
  date: 'May 6',
  systolic: 117,
  diastolic: 77
}, {
  date: 'May 7',
  systolic: 120,
  diastolic: 80
}];
const glucoseData = [{
  date: 'May 1',
  level: 95
}, {
  date: 'May 2',
  level: 102
}, {
  date: 'May 3',
  level: 98
}, {
  date: 'May 4',
  level: 97
}, {
  date: 'May 5',
  level: 105
}, {
  date: 'May 6',
  level: 99
}, {
  date: 'May 7',
  level: 96
}];
const weightData = [{
  date: 'Apr 7',
  weight: 165
}, {
  date: 'Apr 14',
  weight: 164
}, {
  date: 'Apr 21',
  weight: 163.5
}, {
  date: 'Apr 28',
  weight: 162
}, {
  date: 'May 5',
  weight: 161.5
}, {
  date: 'May 12',
  weight: 160
}, {
  date: 'May 19',
  weight: 160.5
}];
const temperatureData = [{
  date: 'May 1',
  temp: 98.6
}, {
  date: 'May 2',
  temp: 98.4
}, {
  date: 'May 3',
  temp: 99.1
}, {
  date: 'May 4',
  temp: 98.7
}, {
  date: 'May 5',
  temp: 98.6
}, {
  date: 'May 6',
  temp: 98.5
}, {
  date: 'May 7',
  temp: 98.4
}];
const HealthTracker = () => {
  const [activeTab, setActiveTab] = useState('bloodPressure');
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('');
  const handleAddReading = type => {
    setFormType(type);
    setShowForm(true);
  };
  return <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Health Tracker
        </h1>
      </div>

      {/* Metrics Selection */}
      <div className="mb-4 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          <button className={`px-3 py-2 rounded-lg flex flex-col items-center min-w-[80px] ${formType === 'bloodPressure' || showForm === false ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' : 'bg-white dark:bg-gray-800'}`} onClick={() => handleAddReading('bloodPressure')}>
            <HeartIcon size={18} className="mb-1" />
            <span className="text-xs">Blood Pressure</span>
          </button>
          <button className={`px-3 py-2 rounded-lg flex flex-col items-center min-w-[80px] ${formType === 'glucose' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' : 'bg-white dark:bg-gray-800'}`} onClick={() => handleAddReading('glucose')}>
            <DropletIcon size={18} className="mb-1" />
            <span className="text-xs">Glucose</span>
          </button>
          <button className={`px-3 py-2 rounded-lg flex flex-col items-center min-w-[80px] ${formType === 'weight' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'bg-white dark:bg-gray-800'}`} onClick={() => handleAddReading('weight')}>
            <ScaleIcon size={18} className="mb-1" />
            <span className="text-xs">Weight</span>
          </button>
          <button className={`px-3 py-2 rounded-lg flex flex-col items-center min-w-[80px] ${formType === 'temperature' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300' : 'bg-white dark:bg-gray-800'}`} onClick={() => handleAddReading('temperature')}>
            <ThermometerIcon size={18} className="mb-1" />
            <span className="text-xs">Temperature</span>
          </button>
        </div>
      </div>

      {/* Input Form */}
      {showForm && <Card className="mb-4 bg-white dark:bg-gray-800">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-base font-medium flex items-center">
              {formType === 'bloodPressure' && <>
                  <HeartIcon className="mr-2 h-4 w-4 text-red-500" />
                  Blood Pressure
                </>}
              {formType === 'glucose' && <>
                  <DropletIcon className="mr-2 h-4 w-4 text-blue-500" />
                  Blood Glucose
                </>}
              {formType === 'weight' && <>
                  <ScaleIcon className="mr-2 h-4 w-4 text-green-500" />
                  Weight
                </>}
              {formType === 'temperature' && <>
                  <ThermometerIcon className="mr-2 h-4 w-4 text-orange-500" />
                  Temperature
                </>}
            </h2>
            <button className="text-gray-500 dark:text-gray-400" onClick={() => setShowForm(false)}>
              &times;
            </button>
          </div>
          <form>
            {formType === 'bloodPressure' && <div className="space-y-3">
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Systolic (mmHg)
                    </label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" placeholder="120" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Diastolic (mmHg)
                    </label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" placeholder="80" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date & Time
                  </label>
                  <input type="datetime-local" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" />
                </div>
              </div>}
            {formType === 'glucose' && <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Glucose Level (mg/dL)
                  </label>
                  <input type="number" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" placeholder="95" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Measurement Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md">
                    <option>Fasting</option>
                    <option>Before Meal</option>
                    <option>After Meal</option>
                    <option>Bedtime</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date & Time
                  </label>
                  <input type="datetime-local" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" />
                </div>
              </div>}
            {formType === 'weight' && <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Weight (lbs)
                  </label>
                  <input type="number" step="0.1" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" placeholder="160.5" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" />
                </div>
              </div>}
            {formType === 'temperature' && <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Temperature (°F)
                  </label>
                  <input type="number" step="0.1" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" placeholder="98.6" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date & Time
                  </label>
                  <input type="datetime-local" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" />
                </div>
              </div>}
            <div className="flex justify-end mt-4">
              <Button icon={<PlusIcon size={16} />} size="sm">
                Add Reading
              </Button>
            </div>
          </form>
        </Card>}

      {/* Graphs */}
      <Card className="bg-white dark:bg-gray-800 mb-4">
        <div className="mb-3">
          <div className="flex space-x-1 border-b overflow-x-auto">
            <button className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap ${activeTab === 'bloodPressure' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`} onClick={() => setActiveTab('bloodPressure')}>
              Blood Pressure
            </button>
            <button className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap ${activeTab === 'glucose' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`} onClick={() => setActiveTab('glucose')}>
              Glucose
            </button>
            <button className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap ${activeTab === 'weight' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`} onClick={() => setActiveTab('weight')}>
              Weight
            </button>
            <button className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap ${activeTab === 'temperature' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`} onClick={() => setActiveTab('temperature')}>
              Temperature
            </button>
          </div>
        </div>
        <div className="h-60">
          {activeTab === 'bloodPressure' && <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bloodPressureData} margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 5
          }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{
              fontSize: 10
            }} />
                <YAxis domain={[60, 140]} tick={{
              fontSize: 10
            }} />
                <Tooltip />
                <Legend wrapperStyle={{
              fontSize: '10px'
            }} />
                <Line type="monotone" dataKey="systolic" stroke="#ef4444" name="Systolic" strokeWidth={2} />
                <Line type="monotone" dataKey="diastolic" stroke="#3b82f6" name="Diastolic" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>}
          {activeTab === 'glucose' && <ResponsiveContainer width="100%" height="100%">
              <LineChart data={glucoseData} margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 5
          }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{
              fontSize: 10
            }} />
                <YAxis domain={[70, 120]} tick={{
              fontSize: 10
            }} />
                <Tooltip />
                <Legend wrapperStyle={{
              fontSize: '10px'
            }} />
                <Line type="monotone" dataKey="level" stroke="#0ea5e9" name="Glucose" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>}
          {activeTab === 'weight' && <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightData} margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 5
          }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{
              fontSize: 10
            }} />
                <YAxis domain={[155, 170]} tick={{
              fontSize: 10
            }} />
                <Tooltip />
                <Legend wrapperStyle={{
              fontSize: '10px'
            }} />
                <Line type="monotone" dataKey="weight" stroke="#10b981" name="Weight" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>}
          {activeTab === 'temperature' && <ResponsiveContainer width="100%" height="100%">
              <LineChart data={temperatureData} margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 5
          }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{
              fontSize: 10
            }} />
                <YAxis domain={[97, 100]} tick={{
              fontSize: 10
            }} />
                <Tooltip />
                <Legend wrapperStyle={{
              fontSize: '10px'
            }} />
                <Line type="monotone" dataKey="temp" stroke="#f97316" name="Temperature" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>}
        </div>
      </Card>

      {/* Recent Readings */}
      <Card title="Recent Readings" className="bg-white dark:bg-gray-800">
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Value
                </th>
                <th className="py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <HeartIcon className="h-4 w-4 text-red-500 mr-1.5" />
                    <span className="text-xs">BP</span>
                  </div>
                </td>
                <td className="py-3 whitespace-nowrap text-xs">120/80 mmHg</td>
                <td className="py-3 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                  May 7, 8:30 AM
                </td>
              </tr>
              <tr>
                <td className="py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <DropletIcon className="h-4 w-4 text-blue-500 mr-1.5" />
                    <span className="text-xs">Glucose</span>
                  </div>
                </td>
                <td className="py-3 whitespace-nowrap text-xs">96 mg/dL</td>
                <td className="py-3 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                  May 7, 7:15 AM
                </td>
              </tr>
              <tr>
                <td className="py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <ScaleIcon className="h-4 w-4 text-green-500 mr-1.5" />
                    <span className="text-xs">Weight</span>
                  </div>
                </td>
                <td className="py-3 whitespace-nowrap text-xs">160.5 lbs</td>
                <td className="py-3 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                  May 5, 7:00 AM
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>;
};
export default HealthTracker;