// import { motion } from 'framer-motion';
// import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

// const Signup = () => {
//   return (
//     <div className="min-h-screen bg-[#faf7f0] flex items-center justify-center p-4">
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden"
//       >
//         <div className="p-8">
//           <div className="flex justify-center mb-6">
//             <div className="bg-gradient-to-r from-fuchsia-400 to-violet-500 p-3 rounded-full">
//               <span className="text-3xl">🐝</span>
//             </div>
//           </div>
          
//           <h2 className="text-2xl font-bold text-center mb-2">Join HobbyHive</h2>
//           <p className="text-gray-500 text-center mb-8">Find your people and share your passions</p>
          
//           <form className="space-y-4">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiUser className="text-gray-400" />
//               </div>
//               <input 
//                 type="text" 
//                 placeholder="Username" 
//                 className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-300 focus:border-transparent outline-none transition-all"
//               />
//             </div>
            
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiMail className="text-gray-400" />
//               </div>
//               <input 
//                 type="email" 
//                 placeholder="Email" 
//                 className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-300 focus:border-transparent outline-none transition-all"
//               />
//             </div>
            
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiLock className="text-gray-400" />
//               </div>
//               <input 
//                 type="password" 
//                 placeholder="Password" 
//                 className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-300 focus:border-transparent outline-none transition-all"
//               />
//             </div>
          
            
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               type="submit"
//               className="w-full bg-gradient-to-r from-fuchsia-400 to-violet-500 text-white py-3.5 px-6 rounded-lg font-medium flex items-center justify-center space-x-2"
//             >
//               <span>Create Account</span>
//               <FiArrowRight className="ml-1" />
//             </motion.button>
//           </form>
          
//           <div className="mt-6 text-center text-sm text-gray-500">
//             Already have an account?{' '}
//             <a href="/login" className="text-fuchsia-500 hover:underline font-medium">
//               Log in
//             </a>
//           </div>
//         </div>
        
//         <div className="bg-gray-50 px-8 py-4 text-center">
//           <p className="text-xs text-gray-400">
//             By joining, you agree to our Terms and Privacy Policy
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Signup;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = {
      username,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      setLoading(false);
      navigate("/login"); // success flyin' you to login page
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f0] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-fuchsia-400 to-violet-500 p-3 rounded-full">
              <span className="text-3xl">🐝</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-2">Join HobbyHive</h2>
          <p className="text-gray-500 text-center mb-8">Find your people and share your passions</p>

          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-300 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-300 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-300 focus:border-transparent outline-none transition-all"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full text-white py-3.5 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-fuchsia-400 to-violet-500"
              }`}
            >
              <span>{loading ? "Creating Account..." : "Create Account"}</span>
              {!loading && <FiArrowRight className="ml-1" />}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="text-fuchsia-500 hover:underline font-medium">
              Log in
            </a>
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-4 text-center">
          <p className="text-xs text-gray-400">
            By joining, you agree to our Terms and Privacy Policy
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
