import React, { useEffect, useState } from 'react';
import { SearchIcon, PlusIcon, CalendarIcon, ClockIcon, SendIcon, HistoryIcon, ChevronDownIcon, ChevronUpIcon, LoaderIcon, AlertCircleIcon } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
// Common symptoms for the multi-select
const commonSymptoms = ['Fever', 'Headache', 'Cough', 'Sore Throat', 'Fatigue', 'Nausea', 'Vomiting', 'Diarrhea', 'Shortness of Breath', 'Chest Pain', 'Abdominal Pain', 'Back Pain', 'Joint Pain', 'Muscle Pain', 'Rash', 'Dizziness', 'Chills', 'Loss of Appetite', 'Insomnia', 'Anxiety', 'Depression', 'Confusion'];
interface SymptomRecord {
  id: string;
  date: string;
  symptoms: string[];
  severity: number;
  aiResponse: {
    assessment: string;
    recommendation: string;
    urgency: 'mild' | 'caution' | 'urgent';
  };
  expanded?: boolean;
}
const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [symptomInput, setSymptomInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toTimeString().split(' ')[0].substring(0, 5));
  const [severity, setSeverity] = useState(5);
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<SymptomRecord['aiResponse'] | null>(null);
  const [history, setHistory] = useState<SymptomRecord[]>([]);
  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('symptomHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to parse history from localStorage', e);
      }
    }
  }, []);
  // Save history to localStorage when it changes
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('symptomHistory', JSON.stringify(history));
    }
  }, [history]);
  const filteredSymptoms = symptomInput ? commonSymptoms.filter(s => s.toLowerCase().includes(symptomInput.toLowerCase()) && !selectedSymptoms.includes(s)) : [];
  const handleSymptomSelect = (symptom: string) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(prev => [...prev, symptom]);
      setSymptomInput('');
      setShowSuggestions(false);
    }
  };
  const removeSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => prev.filter(s => s !== symptom));
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSymptomInput(e.target.value);
    setShowSuggestions(true);
  };
  const handleSubmit = () => {
    if (selectedSymptoms.length === 0) return;
    setLoading(true);
    // Capture current values to use in the timeout callback
    const currentSymptoms = [...selectedSymptoms];
    const currentSeverity = severity;
    const currentDate = date;
    const currentTime = time;
    // Simulate AI processing time
    setTimeout(() => {
      // Generate mock AI response based on symptoms and severity
      const mockResponses = [{
        assessment: 'Your symptoms suggest a common cold or mild viral infection.',
        recommendation: 'Rest, stay hydrated, and take over-the-counter pain relievers if needed. Monitor your symptoms for any changes.',
        urgency: 'mild' as const
      }, {
        assessment: 'Your symptoms could indicate a flu or moderate infection that needs attention.',
        recommendation: 'Rest, stay hydrated, and consider consulting with a healthcare provider if symptoms persist for more than 3 days or worsen.',
        urgency: 'caution' as const
      }, {
        assessment: 'Your combination of symptoms could indicate a more serious condition that requires medical attention.',
        recommendation: 'Please consult with a healthcare provider as soon as possible. If symptoms are severe, consider urgent care or emergency services.',
        urgency: 'urgent' as const
      }];
      // Choose response based on severity and symptoms
      let responseIndex = 0;
      if (currentSeverity > 7) {
        responseIndex = 2;
      } else if (currentSeverity > 4) {
        responseIndex = 1;
      }
      // Adjust for certain symptoms that might indicate more urgent conditions
      const urgentSymptoms = ['Chest Pain', 'Shortness of Breath', 'Confusion'];
      if (currentSymptoms.some(s => urgentSymptoms.includes(s))) {
        responseIndex = Math.max(responseIndex, 1); // At least caution
        if (currentSeverity > 5) {
          responseIndex = 2; // Urgent
        }
      }
      const response = mockResponses[responseIndex];
      // Save to history
      const newRecord: SymptomRecord = {
        id: Date.now().toString(),
        date: `${currentDate}T${currentTime}`,
        symptoms: currentSymptoms,
        severity: currentSeverity,
        aiResponse: response
      };
      setHistory(prevHistory => [newRecord, ...prevHistory]);
      setAiResponse(response);
      setLoading(false);
    }, 2000);
  };
  const toggleExpand = (id: string) => {
    setHistory(prevHistory => prevHistory.map(item => item.id === id ? {
      ...item,
      expanded: !item.expanded
    } : item));
  };
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };
  return <div className="p-4">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          AI Symptom Checker
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Track your symptoms and get AI-powered health insights
        </p>
      </div>
      {/* Symptom Input */}
      <Card className="mb-4 bg-white dark:bg-gray-800">
        <h2 className="text-base font-medium mb-3 dark:text-white">
          What symptoms are you experiencing?
        </h2>
        <div className="relative mb-3">
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <SearchIcon size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
            <input type="text" value={symptomInput} onChange={handleInputChange} onFocus={() => setShowSuggestions(true)} className="flex-1 bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" placeholder="Search symptoms..." />
          </div>
          {/* Symptom suggestions dropdown */}
          {showSuggestions && filteredSymptoms.length > 0 && <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredSymptoms.map(symptom => <div key={symptom} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-gray-800 dark:text-gray-200" onClick={() => handleSymptomSelect(symptom)}>
                  {symptom}
                </div>)}
            </div>}
        </div>
        {/* Selected symptoms tags */}
        {selectedSymptoms.length > 0 && <div className="flex flex-wrap gap-2 mb-4">
            {selectedSymptoms.map(symptom => <div key={symptom} className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm flex items-center">
                {symptom}
                <button className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200" onClick={() => removeSymptom(symptom)}>
                  &times;
                </button>
              </div>)}
          </div>}
        {/* Date and Time */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              When did it start?
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <CalendarIcon size={16} className="text-gray-500 dark:text-gray-400" />
              </div>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white" />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Time
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <ClockIcon size={16} className="text-gray-500 dark:text-gray-400" />
              </div>
              <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white" />
            </div>
          </div>
        </div>
        {/* Severity Slider */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            How severe are your symptoms?
          </label>
          <div className="flex items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">
              Mild
            </span>
            <input type="range" min="1" max="10" value={severity} onChange={e => setSeverity(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
              Severe
            </span>
          </div>
          <div className="flex justify-between mt-1">
            <div className={`w-8 h-1 ${severity >= 1 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'} rounded-full`}></div>
            <div className={`w-8 h-1 ${severity >= 3 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'} rounded-full`}></div>
            <div className={`w-8 h-1 ${severity >= 5 ? 'bg-yellow-500' : 'bg-gray-300 dark:bg-gray-600'} rounded-full`}></div>
            <div className={`w-8 h-1 ${severity >= 7 ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'} rounded-full`}></div>
            <div className={`w-8 h-1 ${severity >= 9 ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'} rounded-full`}></div>
          </div>
        </div>
        {/* Submit Button */}
        <Button onClick={handleSubmit} disabled={selectedSymptoms.length === 0 || loading} fullWidth icon={loading ? <LoaderIcon className="animate-spin" size={16} /> : <SendIcon size={16} />}>
          {loading ? 'Analyzing...' : 'Get AI Assessment'}
        </Button>
      </Card>
      {/* AI Response */}
      {aiResponse && !loading && <Card className={`mb-4 border-l-4 ${aiResponse.urgency === 'urgent' ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : aiResponse.urgency === 'caution' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10' : 'border-green-500 bg-green-50 dark:bg-green-900/10'}`}>
          <div className="flex items-start">
            <div className={`p-2 rounded-full mr-3 ${aiResponse.urgency === 'urgent' ? 'bg-red-100 dark:bg-red-900/30' : aiResponse.urgency === 'caution' ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-green-100 dark:bg-green-900/30'}`}>
              <AlertCircleIcon size={20} className={aiResponse.urgency === 'urgent' ? 'text-red-600 dark:text-red-400' : aiResponse.urgency === 'caution' ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'} />
            </div>
            <div>
              <h3 className="font-medium text-base dark:text-white mb-1">
                AI Assessment
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                {aiResponse.assessment}
              </p>
              <h4 className="font-medium text-sm dark:text-white mb-1">
                Recommendation
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {aiResponse.recommendation}
              </p>
              {/* Disclaimer */}
              <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                  This is an AI-generated assessment and should not replace
                  professional medical advice. If you're experiencing severe
                  symptoms, please seek immediate medical attention.
                </p>
              </div>
            </div>
          </div>
        </Card>}
      {/* History Section */}
      {history.length > 0 && <Card title="Symptom History" className="bg-white dark:bg-gray-800">
          <div className="space-y-3">
            {history.map(record => <div key={record.id} className={`border rounded-lg overflow-hidden ${record.aiResponse.urgency === 'urgent' ? 'border-red-200 dark:border-red-900/50' : record.aiResponse.urgency === 'caution' ? 'border-yellow-200 dark:border-yellow-900/50' : 'border-green-200 dark:border-green-900/50'}`}>
                <div className={`px-4 py-3 flex justify-between items-center cursor-pointer ${record.aiResponse.urgency === 'urgent' ? 'bg-red-50 dark:bg-red-900/10' : record.aiResponse.urgency === 'caution' ? 'bg-yellow-50 dark:bg-yellow-900/10' : 'bg-green-50 dark:bg-green-900/10'}`} onClick={() => toggleExpand(record.id)}>
                  <div>
                    <h4 className="font-medium text-sm dark:text-white">
                      {record.symptoms.join(', ')}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {formatDate(record.date)} • Severity: {record.severity}/10
                    </p>
                  </div>
                  <div>
                    {record.expanded ? <ChevronUpIcon size={18} className="text-gray-500 dark:text-gray-400" /> : <ChevronDownIcon size={18} className="text-gray-500 dark:text-gray-400" />}
                  </div>
                </div>
                {record.expanded && <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300 mb-1">
                      Assessment
                    </h5>
                    <p className="text-sm text-gray-800 dark:text-gray-200 mb-3">
                      {record.aiResponse.assessment}
                    </p>
                    <h5 className="font-medium text-xs text-gray-700 dark:text-gray-300 mb-1">
                      Recommendation
                    </h5>
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      {record.aiResponse.recommendation}
                    </p>
                  </div>}
              </div>)}
          </div>
        </Card>}
    </div>;
};
export default SymptomChecker;