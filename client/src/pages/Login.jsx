import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignIn } from '@clerk/clerk-react';
import { Mail, Lock, ArrowRight, Heart, Loader2 } from 'lucide-react';
import Notification from '../components/Notification'; // ✅ FIXED

function Login() {
  const { signIn, setActive } = useSignIn();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null); // ✅ FIXED (was 'toast')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn.create({
        identifier: email,
        password: password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        setNotification({ type: 'success', message: 'Welcome back! 🎉' });
        setTimeout(() => navigate('/symptom'), 1000);
      }
    } catch (error) {
      setNotification({ 
        type: 'error', 
        message: error.errors?.[0]?.message || 'Login failed. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-primary-50 via-purple-50 to-secondary-50">
      {notification && ( // ✅ FIXED
        <Notification {...notification} onClose={() => setNotification(null)} />
      )}

      <div className="max-w-md w-full">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Heart className="w-16 h-16 text-primary-500 animate-pulse" />
              <div className="absolute inset-0 bg-primary-500 rounded-full blur-xl opacity-20"></div>
            </div>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Welcome Back! 👋</h1>
          <p className="text-gray-600">Sign in to continue your health journey</p>
        </div>

        <div className="card p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-12"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-12"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500 font-medium">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="text-primary-600 font-bold hover:text-primary-700 transition-colors"
            >
              Register here
            </Link>
          </p>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl animate-slide-up">
          <p className="text-sm text-blue-800 text-center">
            <strong>New here?</strong> Create a free account to start checking your symptoms and tracking your health!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
