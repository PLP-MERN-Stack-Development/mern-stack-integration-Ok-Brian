import { Heart, Mail, MapPin, Phone } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-8 h-8 text-primary-400" />
              <h3 className="text-2xl font-black">Health Checker</h3>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Empowering Kenyan youth with accessible health information and
              symptom checking. Contributing to SDG 3: Good Health and Well-being.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="w-4 h-4 text-primary-400" />
              <span className="text-gray-400">Serving all 47 counties of Kenya</span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-primary-400">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/diseases" className="text-gray-400 hover:text-white transition-colors">Disease Library</a></li>
              <li><a href="/facilities" className="text-gray-400 hover:text-white transition-colors">Health Facilities</a></li>
              <li><a href="/symptom" className="text-gray-400 hover:text-white transition-colors">Symptom Checker</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-primary-400">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary-400" />
                <span className="text-gray-400 text-sm">support@brianokelo01@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary-400" />
                <span className="text-gray-400 text-sm">+254 742367916</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Health Checker. Built with ❤️ for Kenyan Youth. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            This platform is for informational purposes only. Always consult healthcare professionals.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
