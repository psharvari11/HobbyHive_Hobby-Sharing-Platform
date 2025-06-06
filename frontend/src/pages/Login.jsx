// import { motion } from 'framer-motion';
// import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

// const Login = () => {
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
          
//           <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
//           <p className="text-gray-500 text-center mb-8">Continue your hobby journey</p>
          
//           <form className="space-y-4">
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
            
//             <div className="flex items-center justify-between">
//               <label className="flex items-center">
//                 <input type="checkbox" className="rounded text-fuchsia-500 focus:ring-fuchsia-300" />
//                 <span className="ml-2 text-sm text-gray-600">Remember me</span>
//               </label>
              
//               <a href="/forgot-password" className="text-sm text-fuchsia-500 hover:underline">
//                 Forgot password?
//               </a>
//             </div>
            
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               type="submit"
//               className="w-full bg-gradient-to-r from-fuchsia-400 to-violet-500 text-white py-3.5 px-6 rounded-lg font-medium flex items-center justify-center space-x-2"
//             >
//               <span>Log In</span>
//               <FiArrowRight className="ml-1" />
//             </motion.button>
//           </form>
          
//           <div className="mt-6 text-center text-sm text-gray-500">
//             New to HobbyHive?{' '}
//             <a href="/signup" className="text-fuchsia-500 hover:underline font-medium">
//               Create account
//             </a>
//           </div>
//         </div>
        
//         <div className="bg-gray-50 px-8 py-4 text-center">
//           <p className="text-xs text-gray-400">
//             By logging in, you agree to our Terms and Privacy Policy
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
const backendURL = import.meta.env.VITE_BACKEND_URL

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = { email, password };

    try {
      const response = await axios.post(
        `${backendURL}/api/users/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Save token to localStorage (you can also use cookies if you prefer)
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user)); // optional

      setLoading(false);
       alert("Login Successful!");
      //  console.log(backendURL)
      navigate("/dashboard"); // redirect after login
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Login failed. Try again.");
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

          <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
          <p className="text-gray-500 text-center mb-8">Continue your hobby journey</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-300 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded text-fuchsia-500 focus:ring-fuchsia-300" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>

              <a href="/forgot-password" className="text-sm text-fuchsia-500 hover:underline">
                Forgot password?
              </a>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center -mt-2">{error}</p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-fuchsia-400 to-violet-500 text-white py-3.5 px-6 rounded-lg font-medium flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span>Logging in...</span>
              ) : (
                <>
                  <span>Log In</span>
                  <FiArrowRight className="ml-1" />
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            New to HobbyHive?{" "}
            <a href="/signup" className="text-fuchsia-500 hover:underline font-medium">
              Create account
            </a>
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-4 text-center">
          <p className="text-xs text-gray-400">
            By logging in, you agree to our Terms and Privacy Policy
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
