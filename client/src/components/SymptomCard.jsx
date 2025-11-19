import { Activity, AlertTriangle } from 'lucide-react';

function SymptomCard({ symptom, onSelect, isSelected }) {
  return (
    <div
      onClick={() => onSelect(symptom)}
      className={`card p-4 cursor-pointer transition-all ${
        isSelected 
          ? 'border-2 border-primary-500 bg-primary-50' 
          : 'border-2 border-transparent hover:border-primary-300'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Activity className={`w-5 h-5 ${isSelected ? 'text-primary-600' : 'text-gray-400'}`} />
          <h4 className="font-bold text-gray-900">{symptom.name}</h4>
        </div>
        {symptom.isEmergency && (
          <AlertTriangle className="w-5 h-5 text-red-500" />
        )}
      </div>

      {symptom.description && (
        <p className="text-sm text-gray-600 mb-2">{symptom.description}</p>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 uppercase tracking-wide">
          {symptom.bodyPart}
        </span>
        {isSelected && (
          <span className="text-xs font-bold text-primary-600">✓ Selected</span>
        )}
      </div>
    </div>
  );
}

export default SymptomCard;