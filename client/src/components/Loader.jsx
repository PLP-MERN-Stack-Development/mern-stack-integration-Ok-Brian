import { Loader2 } from 'lucide-react';

function Loader({ message = 'Loading...' }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-purple-50 to-secondary-50">
      <div className="text-center">
        <Loader2 className="w-16 h-16 text-primary-500 animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">{message}</h2>
        <p className="text-gray-500">Please wait...</p>
      </div>
    </div>
  );
}

export default Loader;