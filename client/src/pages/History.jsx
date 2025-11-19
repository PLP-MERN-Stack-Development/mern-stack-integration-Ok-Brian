import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { assessmentAPI } from '../services/endpoints';
import AssessmentResult from '../components/AssessmentResult';
import Loader from '../components/Loader';
import { Calendar, TrendingUp } from 'lucide-react';

function History() {
  const { user } = useUser();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await assessmentAPI.getHistory();
      setAssessments(response.data.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader message="Loading your history..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black text-gray-900 mb-4">Assessment History</h1>
        <p className="text-xl text-gray-600">Review your past symptom assessments</p>
      </div>

      {assessments.length === 0 ? (
        <div className="text-center py-20">
          <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Assessments Yet</h3>
          <p className="text-gray-600 mb-8">Start tracking your health by checking your symptoms</p>
          <a href="/symptom" className="btn-primary inline-flex items-center space-x-2">
            <span>Check Symptoms Now</span>
          </a>
        </div>
      ) : (
        <>
          {!selectedAssessment ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assessments.map((assessment, index) => (
                <div
                  key={assessment._id}
                  onClick={() => setSelectedAssessment(assessment)}
                  className="card p-6 cursor-pointer hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-gray-500">
                      Assessment #{assessments.length - index}
                    </span>
                    <span className={`badge-${assessment.riskLevel}`}>
                      {assessment.riskLevel.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-600 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {new Date(assessment.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong>Symptoms:</strong> {assessment.symptoms?.length || 0}
                    </p>
                    {assessment.possibleConditions?.[0] && (
                      <p className="text-sm text-gray-600">
                        <strong>Possible:</strong> {assessment.possibleConditions[0].disease?.name}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <button
                onClick={() => setSelectedAssessment(null)}
                className="mb-6 px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold transition-colors"
              >
                ← Back to List
              </button>
              <AssessmentResult assessment={selectedAssessment} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default History;
