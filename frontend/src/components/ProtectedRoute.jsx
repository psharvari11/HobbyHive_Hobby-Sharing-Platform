import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import  Spinner  from './Spinner.jsx';
import axios from 'axios';

const ProtectedRoute = ({ roles = [] }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: null,
    user: null
  });
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          throw new Error('No token found');
        }

        // Verify token with backend
        const response = await axios.get('/api/auth/verify', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setAuthState({
          isAuthenticated: true,
          user: response.data.user
        });
      } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setAuthState({
          isAuthenticated: false,
          user: null
        });
      }
    };

    checkAuth();
  }, []);

  if (authState.isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles.length > 0 && !roles.includes(authState.user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;