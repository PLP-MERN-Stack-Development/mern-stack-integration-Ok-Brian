import { Link } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { 
  Heart, Activity, Shield, TrendingUp, Users, Clock, 
  CheckCircle, ArrowRight, Sparkles, Stethoscope, FileText, MapPin 
} from 'lucide-react';

function Home() {
  const { isSignedIn } = useAuth();

  const features = [
    { icon: Activity, title: 'Symptom Checker', description: 'Get instant health assessments', color: 'from-blue-500 to-cyan-500' },
    { icon: Stethoscope, title: 'Disease Library', description: 'Learn about common diseases', color: 'from-purple-500 to-pink-500' },
    { icon: MapPin, title: 'Find Facilities', description: 'Locate affordable healthcare', color: 'from-green-500 to-teal-500' },
    { icon: Shield, title: 'Early Detection', description: 'Identify warning signs early', color: 'from-orange-500 to-red-500' }
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Users Helped' },
    { icon: FileText, value: '50+', label: 'Diseases Covered' },
    { icon: Clock, value: '24/7', label: 'Always Available' },
    { icon: CheckCircle, value: 'Free', label: 'Completely Free' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-purple-600 to-secondary-600">
          <div className="absolute top-20 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-bounce-slow"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-bounce-slow animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-bounce-slow animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <Sparkles className="w-16 h-16 text-yellow-300 mx-auto mb-6 animate-pulse" />
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            Your Health, <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">Simplified</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Free symptom checking and health information for Kenyan youth. Make informed decisions. 🇰🇪
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={isSignedIn ? "/symptom" : "/register"} className="btn-primary text-lg px-10 py-4 flex items-center justify-center space-x-2">
              <span>{isSignedIn ? 'Check Symptoms' : 'Get Started Free'}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/about" className="bg-white/20 backdrop-blur-lg text-white font-bold py-4 px-10 rounded-full border-2 border-white/50 hover:bg-white/30 transition-all">
              Learn More
            </Link>
          </div>
          <div className="mt-10 flex items-center justify-center space-x-2 text-white/80">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Trusted by 10,000+ young Kenyans</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center transform hover:scale-110 transition-transform">
              <stat.icon className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-4xl font-black text-gray-800 mb-2">{stat.value}</h3>
              <p className="text-gray-600 font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Why Choose Health Checker?</h2>
            <p className="text-xl text-gray-600">Everything you need for your health journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="card p-8 group hover:scale-105">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {!isSignedIn && (
        <section className="py-20 bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Take Control?</h2>
            <p className="text-xl text-white/90 mb-8">Join thousands making informed health decisions</p>
            <Link to="/register" className="inline-flex items-center space-x-3 bg-white text-primary-600 font-bold text-lg px-12 py-5 rounded-full shadow-2xl hover:-translate-y-1 transition-all">
              <span>Get Started - It's Free!</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
