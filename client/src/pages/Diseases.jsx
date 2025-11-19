import { useState, useEffect } from 'react';
import { diseaseAPI } from '../services/endpoints';
import DiseaseCard from '../components/DiseaseCard';
import Loader from '../components/Loader';
import { Search, Filter } from 'lucide-react';

function Diseases() {
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDiseases();
  }, [filter, category]);

  const fetchDiseases = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filter === 'kenya') params.commonInKenya = true;
      if (category !== 'all') params.category = category;

      const response = await diseaseAPI.getAll(params);
      setDiseases(response.data.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDiseases = diseases.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader message="Loading diseases..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black text-gray-900 mb-4">Disease Library</h1>
        <p className="text-xl text-gray-600">Learn about common diseases in Kenya</p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search diseases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-12"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-full font-bold transition-all ${
              filter === 'all' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            All Diseases
          </button>
          <button
            onClick={() => setFilter('kenya')}
            className={`px-6 py-3 rounded-full font-bold transition-all ${
              filter === 'kenya' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            Common in Kenya 🇰🇪
          </button>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-6 py-3 border-2 border-primary-500 rounded-full font-bold cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="infectious">Infectious</option>
            <option value="chronic">Chronic</option>
            <option value="respiratory">Respiratory</option>
            <option value="digestive">Digestive</option>
          </select>
        </div>
      </div>

      {filteredDiseases.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl">No diseases found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiseases.map(disease => (
            <DiseaseCard key={disease._id} disease={disease} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Diseases;
