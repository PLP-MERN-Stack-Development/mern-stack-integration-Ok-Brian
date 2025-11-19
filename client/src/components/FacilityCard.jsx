import { MapPin, Phone, Clock, Shield } from 'lucide-react';

function FacilityCard({ facility }) {
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{facility.name}</h3>
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            {facility.type.replace('_', ' ')} • {facility.county}
          </p>
        </div>
        {facility.emergencyServices && (
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
            24/7 Emergency
          </span>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-start space-x-2">
          <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
          <span className="text-gray-700">{facility.location || facility.county}</span>
        </div>

        {facility.contactNumber && (
          <div className="flex items-center space-x-2">
            <Phone className="w-5 h-5 text-primary-500" />
            <span className="text-gray-700">{facility.contactNumber}</span>
          </div>
        )}

        {facility.isGovernment && (
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="text-green-700 font-semibold">Government Facility (Affordable)</span>
          </div>
        )}

        {facility.operatingHours && (
          <div className="flex items-start space-x-2">
            <Clock className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-600">
              <p>Weekdays: {facility.operatingHours.weekdays}</p>
              <p>Weekends: {facility.operatingHours.weekends}</p>
            </div>
          </div>
        )}
      </div>

      {facility.services && facility.services.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="font-bold text-gray-800 mb-2">Services</h4>
          <div className="flex flex-wrap gap-2">
            {facility.services.slice(0, 5).map((service, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                {service}
              </span>
            ))}
          </div>
        </div>
      )}

      {facility.averageCost && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <strong>Consultation:</strong> {facility.averageCost.consultation}
          </p>
        </div>
      )}
    </div>
  );
}

export default FacilityCard;