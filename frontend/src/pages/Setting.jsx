import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiEdit2, FiCamera, FiSave, FiX } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const backendURL = import.meta.env.VITE_BACKEND_URL
const ProfileSettings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    bio: '',
    hobbies: [],
    profilePic: ''
  });
  const [newHobby, setNewHobby] = useState('');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [error, setError] = useState('');

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${backendURL}/api/users/profile`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

        setUser(response.data);
        setAvatarPreview(response.data.profilePic || 'https://i.pravatar.cc/150?img=3');
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch user data');
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setUser(prev => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHobbyAdd = () => {
    if (newHobby.trim() && !user.hobbies.includes(newHobby.trim())) {
      setUser(prev => ({
        ...prev,
        hobbies: [...prev.hobbies, newHobby.trim()]
      }));
      setNewHobby('');
    }
  };

  const handleHobbyRemove = (hobbyToRemove) => {
    setUser(prev => ({
      ...prev,
      hobbies: prev.hobbies.filter(hobby => hobby !== hobbyToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
        const token = localStorage.getItem('token');
      const response = await axios.put(`${backendURL}/api/users/profile`, {
  username: user.username,
  bio: user.bio,
  hobbies: user.hobbies,
  profilePic: user.profilePic
}, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});


      setUser(response.data.user);
      // If you also update username separately, handle that here
      setIsEditingUsername(false);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-fuchsia-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf7f0] p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
          <p className="text-gray-600">Manage your personal information</p>
        </div>

        {/* Main Content */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          {error && (
            <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <img
                src={avatarPreview}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <label className="absolute bottom-0 right-0 bg-fuchsia-500 text-white p-3 rounded-full cursor-pointer shadow-md hover:bg-fuchsia-600 transition-all group-hover:opacity-100">
                <FiCamera className="w-5 h-5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
            <button
              type="button"
              onClick={() => document.querySelector('input[type="file"]').click()}
              className="mt-4 text-fuchsia-600 hover:underline text-sm"
            >
              Change profile photo
            </button>
          </div>

          {/* Username */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <div className="flex items-center">
              {isEditingUsername ? (
                <>
                  <input
                    type="text"
                    value={tempUsername}
                    onChange={(e) => setTempUsername(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-300 focus:border-transparent outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setUser(prev => ({ ...prev, username: tempUsername }));
                      setIsEditingUsername(false);
                    }}
                    className="ml-2 p-2 text-green-500 hover:bg-green-50 rounded-full"
                  >
                    <FiSave className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingUsername(false)}
                    className="ml-1 p-2 text-red-500 hover:bg-red-50 rounded-full"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 px-4 py-2 bg-gray-50 rounded-lg">{user.username}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setTempUsername(user.username);
                      setIsEditingUsername(true);
                    }}
                    className="ml-2 p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                  >
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              value={user.bio}
              onChange={(e) => setUser(prev => ({ ...prev, bio: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-300 focus:border-transparent outline-none"
              rows="4"
              placeholder="Tell others about yourself..."
            />
          </div>

          {/* Hobbies */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Hobbies</label>
            {/* <div className="flex flex-wrap gap-2 mb-3">
              {user.hobbies.map((hobby, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="flex items-center bg-fuchsia-100 text-fuchsia-800 px-3 py-1 rounded-full"
                >
                  <span>{hobby}</span>
                  <button
                    type="button"
                    onClick={() => handleHobbyRemove(hobby)}
                    className="ml-1 text-fuchsia-600 hover:text-fuchsia-800"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div> */}
            <div className="flex">
              <input
                type="text"
                value={newHobby}
                onChange={(e) => setNewHobby(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleHobbyAdd()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-fuchsia-300 focus:border-transparent outline-none"
                placeholder="Add a new hobby"
              />
              <button
                type="button"
                onClick={handleHobbyAdd}
                className="px-4 bg-fuchsia-500 text-white rounded-r-lg hover:bg-fuchsia-600 transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 bg-gradient-to-r from-fuchsia-400 to-violet-500 text-white rounded-lg font-medium shadow-lg hover:shadow-fuchsia-200 transition-all flex items-center"
            >
              {isSaving ? (
                <>
                  <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfileSettings;