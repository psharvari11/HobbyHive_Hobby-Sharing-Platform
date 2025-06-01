import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HobbyHiveHome from './pages/Homepage.jsx';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard.jsx';
import ProfileSettings from './pages/Setting.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
// import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Main Home Page */}
          <Route path="/" element={<HobbyHiveHome />} />
          
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/settings" element={<ProfileSettings />} />
          
          {/* 404 Page */}
          {/* <Route path="*" element={<NotFound />} /> */} 
        </Routes>
      </AnimatePresence>
    </Router>
  );
};

export default App;