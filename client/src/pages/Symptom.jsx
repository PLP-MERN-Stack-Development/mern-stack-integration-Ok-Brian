import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { symptomAPI, assessmentAPI } from '../services/endpoints';
import SymptomCard from '../components/SymptomCard';
import AssessmentResult from '../components/AssessmentResult';
import Loader from '../components/Loader';
import Notification from '../components/Notification';
import { Search, X } from 'lucide-react';

function Symptom() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchSymptoms();
  }, []);

  const fetchSymptoms = async () => {
    try {
      const response = await symptomAPI.getAll();
      setSymptoms(response.data.data || []);
    } catch (error) {
      setNotification({ type: 'error', message: 'Failed to load symptoms' });
    }
  };

  const handleSelectSymptom = (symptom) => {
    const exists = selectedSymptoms.find(s => s.symptom === symptom._id);
    if (!exists) {
      setSelectedSymptoms([...selectedSymptoms, {
        symptom: symptom._id,
        name: symptom.name,
        severity: 'moderate',
        isEmergency: symptom.isEmergency
      }]);
    } else {
      setSelectedSymptoms(selectedSymptoms.filter(s => s.symptom !== symptom._id));
    }
  };

  const updateSeverity = (symptomId, severity) => {
    setSelectedSymptoms(selectedSymptoms.map(s =>
      s.symptom === symptomId ? { ...s, severity } : s
    ));
  };

  const handleSubmit = async () => {
    if (selectedSymptoms.length === 0) {
      setNotification({ type: 'warning', message: 'Please select at least one symptom' });
      return;
    }

    setLoading(true);
    try {
      const response = await assessmentAPI.create({
        symptoms: selectedSymptoms.map(({ symptom, severity }) => ({ symptom, severity })),
        additionalInfo: {
          age: user?.publicMetadata?.age || 20,
          gender: user?.publicMetadata?.gender || 'not specified',
          county: user?.publicMetadata?.county || 'Nairobi'
        }
      });
      
      setResult(response.data.data);
      setNotification({ type: 'success', message: 'Assessment completed!' });
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } catch (error) {
      setNotification({ type: 'error', message: 'Assessment failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const filteredSymptoms = symptoms.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {notification && <Notification {...notification} onClose={() => setNotification(null)} />}

      <div className="text-center mb-12">
        <h1 className="text-5xl font-black text-gray-900 mb-4">Symptom Checker</h1>
        <p className="text-xl text-gray-600">Select your symptoms to get a health assessment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Symptoms List */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search symptoms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredSymptoms.map(symptom => (
              <SymptomCard
                key={symptom._id}
                symptom={symptom}
                onSelect={handleSelectSymptom}
                isSelected={!!selectedSymptoms.find(s => s.symptom === symptom._id)}
              />
            ))}
          </div>

          {filteredSymptoms.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No symptoms found matching "{searchTerm}"</p>
            </div>
          )}
        </div>

        {/* Selected Symptoms */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Selected Symptoms ({selectedSymptoms.length})
            </h3>

            {selectedSymptoms.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No symptoms selected yet</p>
                <p className="text-sm text-gray-400 mt-2">Click on symptoms to select them</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedSymptoms.map(symptom => (
                  <div key={symptom.symptom} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-gray-900">{symptom.name}</span>
                      <button
                        onClick={() => handleSelectSymptom({ _id: symptom.symptom })}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <select
                      value={symptom.severity}
                      onChange={(e) => updateSeverity(symptom.symptom, e.target.value)}
                      className="input-field text-sm"
                    >
                      <option value="mild">Mild</option>
                      <option value="moderate">Moderate</option>
                      <option value="severe">Severe</option>
                    </select>
                  </div>
                ))}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50"
                >
                  {loading ? 'Analyzing...' : 'Get Assessment'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {loading && <Loader message="Analyzing your symptoms..." />}
      {result && <AssessmentResult assessment={result} />}
    </div>
  );
}

export default Symptom;