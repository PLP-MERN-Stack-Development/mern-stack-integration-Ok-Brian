// src/pages/Assessment.jsx

import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

function Assessment() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <Activity className="w-16 h-16 text-primary-500 mx-auto mb-6" />
      <h1 className="text-4xl font-black text-gray-900 mb-4">Assessment Results</h1>
      <p className="text-xl text-gray-600 mb-8">
        Complete a symptom check to see your results here
      </p>
      <Link to="/symptom" className="btn-primary inline-flex items-center space-x-2">
        <span>Check Your Symptoms</span>
      </Link>
    </div>
  );
}

export default Assessment;