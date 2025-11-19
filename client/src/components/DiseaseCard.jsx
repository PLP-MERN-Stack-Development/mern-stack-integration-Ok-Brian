import { Activity, AlertTriangle } from 'lucide-react';

function DiseaseCard({ disease }) {
  const severityColors = {
    low: 'border-green-300 bg-green-50',
    medium: 'border-yellow-300 bg-yellow-50',
    high: 'border-red-300 bg-red-50',
    emergency: 'border-red-500 bg-red-100'
  };

  return (
    <div className={`card p-6 border-l-4 ${severityColors[disease.seriousnessLevel]}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{disease.name}</h3>
          <span className={`badge-${disease.seriousnessLevel}`}>
            {disease.seriousnessLevel.toUpperCase()}
          </span>
        </div>
        {disease.commonInKenya && (
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
            🇰🇪 Common in Kenya
          </span>
        )}
      </div>

      <p className="text-gray-600 mb-4 leading-relaxed">{disease.description}</p>

      <div className="space-y-3">
        <div>
          <h4 className="font-bold text-gray-800 mb-2 flex items-center">
            <Activity className="w-4 h-4 mr-2" />
            Symptoms
          </h4>
          <div className="flex flex-wrap gap-2">
            {disease.symptoms?.slice(0, 4).map((symptom, index) => (
              <span key={index} className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs">
                {symptom}
              </span>
            ))}
          </div>
        </div>

        {disease.redFlags && disease.redFlags.length > 0 && (
          <div>
            <h4 className="font-bold text-red-800 mb-2 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Red Flags
            </h4>
            <ul className="text-sm text-red-700 space-y-1">
              {disease.redFlags.slice(0, 2).map((flag, index) => (
                <li key={index}>• {flag}</li>
              ))}
            </ul>
          </div>
        )}

        {disease.estimatedCost && (
          <div className="pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Est. Cost:</strong> {disease.estimatedCost.consultation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DiseaseCard;