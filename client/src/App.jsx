import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Symptom from './pages/Symptom';
import Assessment from './pages/Assessment';
import Diseases from './pages/Diseases';
import Facilities from './pages/Facilities';
import History from './pages/History';
import NotFound from './pages/NotFound';

import './App.css';

function App() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return <Loader message="Loading..." />;
  }

  const needsProfile = isSignedIn && !user?.publicMetadata?.profileComplete;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navbar />
      
      <main className="flex-1">
        {needsProfile ? (
          <Navigate to="/register?step=profile" replace />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            
            <Route 
              path="/login" 
              element={isSignedIn ? <Navigate to="/symptom" /> : <Login />} 
            />
            <Route 
              path="/register" 
              element={isSignedIn && !needsProfile ? <Navigate to="/symptom" /> : <Register />} 
            />

            <Route path="/symptom" element={<ProtectedRoute><Symptom /></ProtectedRoute>} />
            <Route path="/assessment" element={<ProtectedRoute><Assessment /></ProtectedRoute>} />
            <Route path="/diseases" element={<ProtectedRoute><Diseases /></ProtectedRoute>} />
            <Route path="/facilities" element={<ProtectedRoute><Facilities /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;