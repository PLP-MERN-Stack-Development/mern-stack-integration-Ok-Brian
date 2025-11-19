// src/router.jsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { SignIn, SignUp } from '@clerk/clerk-react';
import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import Symptom from './pages/Symptom';
import Diseases from './pages/Diseases';
import Facilities from './pages/Facilities';
import History from './pages/History';
import Profile from './pages/Profile';
import Dashboard from './pages/About';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      {
        path: 'sign-in/*',
        element: (
          <div className="auth-container">
            <SignIn routing="path" path="/sign-in" />
          </div>
        )
      },
      {
        path: 'sign-up/*',
        element: (
          <div className="auth-container">
            <SignUp routing="path" path="/sign-up" />
          </div>
        )
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
      },
      {
        path: 'symptom',
        element: (
          <ProtectedRoute>
            <Symptom />
          </ProtectedRoute>
        )
      },
      {
        path: 'diseases',
        element: (
          <ProtectedRoute>
            <Diseases />
          </ProtectedRoute>
        )
      },
      {
        path: 'facilities',
        element: (
          <ProtectedRoute>
            <Facilities />
          </ProtectedRoute>
        )
      },
      {
        path: 'history',
        element: (
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        )
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      },
      { path: '*', element: <NotFound /> }
    ]
  }
]);