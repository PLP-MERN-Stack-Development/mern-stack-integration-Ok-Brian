import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useSignUp, useUser } from '@clerk/clerk-react';
import { Mail, Lock, User, Calendar, Users, MapPin, ArrowRight, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import Notification from '../components/Notification'; // ✅ FIXED
import { userAPI } from '../services/endpoints';

function Register() {
  const { signUp, setActive } = useSignUp();
  const { user } = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const initialStep = searchParams.get('step') === 'profile' ? 2 : 1;
  const [currentStep, setCurrentStep] = useState(initialStep);
  
  // Step 1: Auth
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  
  // Step 2: Profile
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [county, setCounty] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null); // ✅ FIXED (was 'toast')

  const kenyanCounties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Kiambu',
    'Machakos', 'Meru', 'Nyeri', 'Kakamega', 'Bungoma', 'Garissa', 'Kericho',
    'Kitale', 'Malindi', 'Nyahururu', 'Naivasha', 'Voi', 'Migori'
  ];

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signUp.create({
        emailAddress: email,
        password: password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
      setNotification({ type: 'success', message: 'Verification code sent to your email!' });
    } catch (error) {
      setNotification({ type: 'error', message: error.errors?.[0]?.message || 'Sign up failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });
      
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        setNotification({ type: 'success', message: 'Email verified! Complete your profile.' });
        setCurrentStep(2);
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'Invalid verification code' });
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save to backend
      await userAPI.createProfile({
        clerkId: user?.id || signUp?.createdUserId,
        name,
        email: email || user?.primaryEmailAddress?.emailAddress,
        age: parseInt(age),
        gender,
        county
      });

      // Update Clerk metadata
      if (user) {
        await user.update({
          publicMetadata: {
            profileComplete: true,
            name,
            age: parseInt(age),
            gender,
            county
          }
        });
      }

      setNotification({ type: 'success', message: 'Profile created successfully! 🎉' });
      setTimeout(() => navigate('/symptom'), 1500);
    } catch (error) {
      setNotification({ type: 'error', message: 'Profile creation failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-primary-50 via-purple-50 to-secondary-50">
      {notification && ( // ✅ FIXED
        <Notification {...notification} onClose={() => setNotification(null)} />
      )}

      <div className="max-w-2xl w-full">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8 animate-fade-in">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-300'}`}>
                {currentStep > 1 ? <CheckCircle className="w-6 h-6" /> : '1'}
              </div>
              <span className="font-bold hidden sm:inline">Account</span>
            </div>
            <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-primary-500' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-300'}`}>
                2
              </div>
              <span className="font-bold hidden sm:inline">Profile</span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="card p-8 animate-slide-up">
          {/* Step 1: Sign Up */}
          {currentStep === 1 && !pendingVerification && (
            <>
              <div className="text-center mb-6">
                <h1 className="text-3xl font-black text-gray-900 mb-2">Create Account 🎉</h1>
                <p className="text-gray-600">Join thousands of young Kenyans on their health journey</p>
              </div>

              <form onSubmit={handleSignUp} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
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
                  <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-field pl-12"
                      placeholder="At least 8 characters"
                      minLength={8}
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters long</p>
                </div>

                <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center space-x-2">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Continue</span>}
                  {!loading && <ArrowRight className="w-5 h-5" />}
                </button>
              </form>
            </>
          )}

          {/* Step 1.5: Verification */}
          {currentStep === 1 && pendingVerification && (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary-600" />
                </div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">Check Your Email 📧</h1>
                <p className="text-gray-600">We sent a verification code to <strong>{email}</strong></p>
              </div>

              <form onSubmit={handleVerification} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Verification Code</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="input-field text-center text-2xl tracking-widest"
                    placeholder="000000"
                    maxLength={6}
                    required
                  />
                </div>

                <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center space-x-2">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Verify Email</span>}
                  {!loading && <ArrowRight className="w-5 h-5" />}
                </button>
              </form>
            </>
          )}

          {/* Step 2: Profile */}
          {currentStep === 2 && (
            <>
              <div className="text-center mb-6">
                <h1 className="text-3xl font-black text-gray-900 mb-2">Tell Us About You 👤</h1>
                <p className="text-gray-600">This helps us provide accurate health recommendations</p>
              </div>

              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-field pl-12"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Age</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="input-field pl-12"
                        placeholder="22"
                        min="13"
                        max="120"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Gender</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select value={gender} onChange={(e) => setGender(e.target.value)} className="input-field pl-12" required>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer_not_to_say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">County</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select value={county} onChange={(e) => setCounty(e.target.value)} className="input-field pl-12" required>
                      <option value="">Select Your County</option>
                      {kenyanCounties.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center space-x-2">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Complete Registration</span>}
                  {!loading && <CheckCircle className="w-5 h-5" />}
                </button>
              </form>
            </>
          )}

          {/* Login Link */}
          {currentStep === 1 && (
            <>
              <div className="my-6 flex items-center">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 text-sm text-gray-500 font-medium">OR</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              <p className="text-center text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-600 font-bold hover:text-primary-700 transition-colors">
                  Login here
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;