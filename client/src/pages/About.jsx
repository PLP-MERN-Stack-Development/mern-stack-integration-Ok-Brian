import { Heart, Target, Users, Award } from 'lucide-react';

function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <Heart className="w-16 h-16 text-primary-500 mx-auto mb-6 animate-pulse" />
        <h1 className="text-5xl font-black text-gray-900 mb-4">About Health Checker</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Empowering Kenyan youth with accessible health information through technology
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="card p-8">
          <Target className="w-12 h-12 text-primary-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            To make healthcare information accessible to young Kenyans who cannot afford frequent doctor consultations. 
            We provide free, reliable health information to help you make informed decisions about your health.
          </p>
        </div>

        <div className="card p-8">
          <Users className="w-12 h-12 text-primary-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Who We Serve</h2>
          <p className="text-gray-600 leading-relaxed">
            We focus on Kenyan youth aged 13-35 who have internet access but limited financial resources. 
            Our platform helps you understand symptoms, learn about diseases, and know when to seek professional care.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-3xl p-12 mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            'Free symptom checking and assessment',
            'Information about common Kenyan diseases',
            'Directory of affordable healthcare facilities',
            'Health education and prevention tips',
            'Early detection of serious conditions',
            'Track your health history'
          ].map((item, idx) => (
            <div key={idx} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">✓</span>
              </div>
              <span className="text-gray-700 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-12 text-center">
        <Award className="w-16 h-16 text-primary-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">SDG 3: Good Health & Well-being</h2>
        <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto mb-6">
          We're committed to ensuring healthy lives and promoting well-being for all ages in Kenya. 
          Our platform contributes to achieving the United Nations Sustainable Development Goal 3.
        </p>
        <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-6 py-3 rounded-full font-bold">
          <span className="text-2xl">🇰🇪</span>
          <span>Serving All 47 Counties</span>
        </div>
      </div>

      <div className="mt-12 p-8 bg-blue-50 border-2 border-blue-200 rounded-2xl">
        <h3 className="text-xl font-bold text-blue-900 mb-3">⚠️ Important Disclaimer</h3>
        <p className="text-blue-800">
          This platform is for informational purposes only and does not replace professional medical advice.
          Always consult with qualified healthcare professionals for diagnosis and treatment. In emergencies, seek immediate medical attention.
        </p>
      </div>
    </div>
  );
}

export default About;
