import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-primary-500 mb-4">404</h1>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary inline-flex items-center space-x-2">
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
          <Link to="/symptom" className="btn-secondary inline-flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Check Symptoms</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
