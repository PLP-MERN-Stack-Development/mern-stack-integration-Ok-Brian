import { AlertCircle, CheckCircle, TrendingUp, Heart } from 'lucide-react';

function AssessmentResult({ assessment }) {
  if (!assessment) return null;

  const riskConfig = {
    low: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: CheckCircle,
      badge: 'badge-low'
    },
    medium: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: AlertCircle,
      badge: 'badge-medium'
    },
    high: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: TrendingUp,
      badge: 'badge-high'
    },
    emergency: {
      bg: 'bg-red-100',
      border: 'border-red-300',
      text: 'text-red-900',
      icon: AlertCircle,
      badge: 'badge-emergency'
    }
  };

  const config = riskConfig[assessment.riskLevel] || riskConfig.medium;
  const Icon = config.icon;

  return (
    <div className={`${config.bg} border-2 ${config.border} rounded-2xl p-6 mt-8 animate-slide-up`}>
      <div className="flex items-center space-x-3 mb-6">
        <Icon className={`w-10 h-10 ${config.text}`} />
        <div>
          <h2 className="text-2xl font-black text-gray-900">Assessment Results</h2>
          <span className={config.badge}>
            Risk Level: {assessment.riskLevel.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl p-5 mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
          <Heart className="w-5 h-5 mr-2 text-primary-500" />
          Recommendations
        </h3>
        <ul className="space-y-2">
          {assessment.recommendations?.map((rec, index) => (
            <li key={index} className="flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Possible Conditions */}
      {assessment.possibleConditions && assessment.possibleConditions.length > 0 && (
        <div className="bg-white rounded-xl p-5 mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Possible Conditions</h3>
          <div className="space-y-3">
            {assessment.possibleConditions.map((condition, index) => (
              <div key={index} className="border-l-4 border-primary-500 pl-4">
                <h4 className="font-bold text-gray-800">{condition.disease?.name}</h4>
                <p className="text-sm text-gray-600">{condition.disease?.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Professional Care Warning */}
      {assessment.needsProfessionalCare && (
        <div className="bg-red-600 text-white rounded-xl p-5 font-bold flex items-center space-x-3">
          <AlertCircle className="w-6 h-6" />
          <span>⚠️ Professional medical care is recommended</span>
        </div>
      )}
    </div>
  );
}

export default AssessmentResult;
