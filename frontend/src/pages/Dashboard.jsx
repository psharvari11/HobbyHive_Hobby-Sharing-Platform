import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiActivity, FiBookmark, FiUsers, FiCalendar, FiSettings } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


  // Mock user data - replace with actual data from your backend/context
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         // In a real app, you would fetch this from your backend
//         const mockUser = {
//           name: 'Alex Johnson',
//           username: 'alexcreative',
//           email: 'alex@example.com',
//           joinDate: '2023-05-15',
//           hobbies: ['Photography', 'Painting', 'Gardening'],
//           avatar: 'https://i.pravatar.cc/150?img=5'
//         };
//         setUser(mockUser);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8000/api/users/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) throw new Error("Failed to fetch user data");

      const data = await response.json();
      setUser(data.user); // Make sure your backend sends `{ user: { name, username, ... } }`
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);
  const handleNavigation = (tabId) => {
    setActiveTab(tabId);
    switch(tabId) {
      case 'settings':
        navigate('/settings');
        break;
      case 'hobbies':
        navigate('/hobbies');
        break;
      case 'community':
        navigate('/community');
        break;
      case 'events':
        navigate('/events');
        break;
      default:
        navigate('/dashboard');
    }
  };
const handleLogout = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8000/api/users/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.msg || "Logout failed");
    }

    // Remove token from localStorage
    localStorage.removeItem("token");

    // Redirect to login or homepage
    navigate("/login");

  } catch (error) {
    console.error("Logout error:", error.message);
    alert("Failed to logout. Try again!");
  }
};

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#faf7f0]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-fuchsia-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#faf7f0]">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200"
      >
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <span className="text-3xl">🐝</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-fuchsia-400 to-violet-500 bg-clip-text text-transparent">
              HobbyHive
            </h1>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {[
            { icon: <FiActivity />, name: 'Dashboard', id: 'dashboard' },
            { icon: <FiBookmark />, name: 'My Hobbies', id: 'hobbies' },
            { icon: <FiUsers />, name: 'Community', id: 'community' },
            { icon: <FiCalendar />, name: 'Events', id: 'events' },
            { icon: <FiSettings />, name: 'Settings', id: 'settings' }
          ].map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
             onClick={() => handleNavigation(item.id)}
              className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${activeTab === item.id ? 'bg-gradient-to-r from-fuchsia-50 to-violet-50 text-fuchsia-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </motion.button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <img 
              src={user?.avatar} 
              alt={user?.name} 
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div>
              <p className="font-medium text-sm">{user?.name}</p>
              <p className="text-xs text-gray-500">@{user?.username}</p>
            </div>
          </div>
          <button
    onClick={handleLogout}
    className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
  >
    Logout
  </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🐝</span>
            <h1 className="text-lg font-bold">HobbyHive</h1>
          </div>
          <button className="p-2 rounded-full bg-gray-100">
            <img 
              src={user?.avatar} 
              alt={user?.name} 
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Welcome Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-fuchsia-50 to-violet-50 rounded-2xl p-6 md:p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Welcome back, <span className="text-fuchsia-600">{user?.username.split(' ')[0]}!</span>

                </h2>
                <p className="text-gray-600">
                  Ready to explore your hobbies today?
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-fuchsia-400 to-violet-500 text-white rounded-xl font-medium shadow-lg hover:shadow-fuchsia-200 transition-all"
              >
                Discover New Hobbies
              </motion.button>
            </div>
          </motion.section>

          {/* Stats Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            {[
              { title: 'Active Hobbies', value: user?.hobbies.length || 0, icon: '🌿', color: 'bg-emerald-100 text-emerald-600' },
              { title: 'Upcoming Events', value: 3, icon: '📅', color: 'bg-blue-100 text-blue-600' },
              { title: 'Community Friends', value: 24, icon: '👥', color: 'bg-amber-100 text-amber-600' }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center text-2xl mb-4`}>
                  {stat.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-500">{stat.title}</h3>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
            ))}
          </motion.section>

          {/* Recent Activity */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Your Recent Activity</h3>
              <button className="text-sm text-fuchsia-600 hover:underline">View All</button>
            </div>
            
            <div className="space-y-4">
              {[
                { action: 'Posted in Photography Group', time: '2 hours ago', icon: '📷' },
                { action: 'Attended Watercolor Workshop', time: '1 day ago', icon: '🎨' },
                { action: 'Started new Gardening Project', time: '3 days ago', icon: '🌱' }
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-all"
                >
                  <span className="text-2xl mr-4">{activity.icon}</span>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;