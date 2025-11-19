import { useState, useEffect } from 'react';
import { facilityAPI } from '../services/endpoints';
import FacilityCard from '../components/FacilityCard';
import Loader from '../components/Loader';
import { MapPin, Filter } from 'lucide-react';

function Facilities() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [county, setCounty] = useState('');
  const [type, setType] = useState('all');

  const kenyanCounties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Kiambu',
    'Machakos', 'Meru', 'Nyeri', 'Kakamega', 'Bungoma'
  ];

  useEffect(() => {
    fetchFacilities();
  }, [county, type]);

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      const params = {};
      if (county) params.county = county;
      if (type !== 'all') params.type = type;

      const response = await facilityAPI.getAll(params);
      setFacilities(response.data.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader message="Loading facilities..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black text-gray-900 mb-4">Health Facilities</h1>
        <p className="text-xl text-gray-600">Find affordable healthcare near you</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex-1 min-w-[200px]">
          <select
            value={county}
            onChange={(e) => setCounty(e.target.value)}
            className="input-field"
          >
            <option value="">All Counties</option>
            {kenyanCounties.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="input-field"
          >
            <option value="all">All Types</option>
            <option value="hospital">Hospital</option>
            <option value="clinic">Clinic</option>
            <option value="dispensary">Dispensary</option>
            <option value="health_center">Health Center</option>
          </select>
        </div>
      </div>

      {facilities.length === 0 ? (
        <div className="text-center py-20">
          <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-xl">No facilities found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {facilities.map(facility => (
            <FacilityCard key={facility._id} facility={facility} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Facilities;