import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiHeart, FiUsers, FiCalendar, FiAward, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const HobbyHiveHome = () => {
  const [currentHobbyIndex, setCurrentHobbyIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignupRedirect = () => {
    navigate('/signup');
  };
  
  const hobbies = [
    { name: 'Painting', color: 'from-lime-200 to-cyan-200', icon: '🎨', shape: 'rounded-[40%]' },
    { name: 'Gardening', color: 'from-violet-200 to-fuchsia-200', icon: '🌿', shape: 'rounded-[60%]' },
    { name: 'Cooking', color: 'from-amber-200 to-rose-200', icon: '👨‍🍳', shape: 'rounded-[30%]' },
    { name: 'Photography', color: 'from-sky-200 to-indigo-200', icon: '📸', shape: 'rounded-[70%]' },
    { name: 'Crafting', color: 'from-emerald-200 to-teal-200', icon: '✂️', shape: 'rounded-[50%]' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHobbyIndex((prev) => (prev + 1) % hobbies.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf7f0] font-sans">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', bounce: 0.6 }}
        className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-black/10"
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            className="flex items-center space-x-2"
          >
            <span className="text-3xl">🐝</span>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-violet-500">
              HobbyHive
            </h1>
          </motion.div>
          
          {/* <div className="hidden md:flex space-x-1">
            {['Discover', 'Groups', 'Events', 'About'].map((item, i) => (
              <motion.a 
                key={item}
                whileHover={{ y: -3, scale: 1.05 }}
                className="px-3 py-2 text-sm font-medium hover:text-fuchsia-500 transition-all"
              >
                {item}
              </motion.a>
            ))}
          </div> */}
          
          <div className="flex items-center space-x-2">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignupRedirect}
              className="hidden md:flex items-center space-x-1 bg-black text-white px-4 py-2 rounded-full text-sm border-2 border-black hover:bg-transparent hover:text-black transition-all"
            >
              <span>Join Now</span>
              <FiHeart className="text-pink-400" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignupRedirect}
              className="hidden md:flex items-center space-x-1 bg-black text-white px-4 py-2 rounded-full text-sm border-2 border-black hover:bg-transparent hover:text-black transition-all"
            >
              <span>Login</span>
              <FiHeart className="text-pink-400" />
            </motion.button>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-black/5 transition-all"
            >
              <div className={`w-6 h-0.5 bg-black transition-all ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-black my-1.5 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-black transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></div>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/90 backdrop-blur-sm overflow-hidden"
            >
              <div className="container mx-auto px-4 py-2 flex flex-col space-y-1">
                {/* {['Discover', 'Groups', 'Events', 'About'].map((item) => (
                  <a 
                    key={item} 
                    href="#" 
                    className="py-3 px-2 font-medium hover:bg-black/5 rounded-lg transition-all hover:pl-4 flex items-center"
                  >
                    <span className="w-2 h-2 bg-fuchsia-400 rounded-full mr-3"></span>
                    {item}
                  </a>
                ))} */}
                <button className="w-full bg-black text-white px-4 py-3 rounded-full text-sm my-2 border-2 border-black hover:bg-transparent hover:text-black transition-all">
                  Join Now
                </button>
                <button className="w-full bg-black text-white px-4 py-3 rounded-full text-sm my-2 border-2 border-black hover:bg-transparent hover:text-black transition-all">
                  Login 
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-medium mb-4 border border-amber-200/50"
              >
                🐝 New Community Feature
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              >
                Find your <br />
                <span className="relative inline-block">
                  <span className="relative z-10">creative community</span>
                  <motion.span 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute bottom-2 left-0 w-full h-3 bg-amber-200/70 z-0 -rotate-1"
                  />
                </span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-gray-600 mb-8 max-w-md"
              >
                Connect with like-minded people through shared interests and passions.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3"
              >
                <div className="relative flex-grow">
                  <input 
                    type="text" 
                    placeholder="Search hobbies..." 
                    className="w-full px-5 py-3.5 rounded-xl bg-white border-2 border-black/10 focus:border-fuchsia-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-100 pr-12 placeholder-black/30 text-sm"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-lg hover:bg-fuchsia-500 transition-all">
                    <FiSearch className="w-4 h-4" />
                  </button>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-5 py-3.5 bg-gradient-to-r from-fuchsia-400 to-violet-500 text-white rounded-xl text-sm font-medium shadow-lg hover:shadow-fuchsia-200 transition-all flex items-center"
                >
                  Get Started
                  <span className="ml-2 text-lg">→</span>
                </motion.button>
              </motion.div>
            </div>
            
            <div className="md:w-1/2 flex justify-center relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="relative"
              >
                {/* Floating blob background */}
                <motion.div 
                  animate={{
                    rotate: 360,
                    transition: { duration: 40, repeat: Infinity, ease: "linear" }
                  }}
                  className="absolute -inset-12 bg-gradient-to-r from-amber-100/50 to-fuchsia-100/50 rounded-[40%] blur-xl"
                ></motion.div>
                
               
                <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentHobbyIndex}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 1.2, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className={`absolute inset-0 bg-gradient-to-br ${hobbies[currentHobbyIndex].color} ${hobbies[currentHobbyIndex].shape} flex items-center justify-center shadow-lg border-4 border-white`}
                    >
                      <span className="text-7xl md:text-8xl">{hobbies[currentHobbyIndex].icon}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 0 }}
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute ${i === 1 ? '-top-5 -left-5 w-16 h-16 bg-cyan-200/70' : ''} ${i === 2 ? '-bottom-8 -right-4 w-20 h-20 bg-fuchsia-200/70 rounded-[30%]' : ''} ${i === 3 ? 'top-1/2 -right-10 w-12 h-12 bg-amber-200/70 rounded-[60%]' : ''} rounded-full blur-[1px]`}
                  ></motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Hobbies Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-3">Explore Popular</h2>
            <div className="inline-flex flex-wrap justify-center gap-2">
              {['Creative Arts', 'Outdoor Activities', 'Culinary Skills', 'Photography', 'DIY Projects'].map((item, i) => (
                <span 
                  key={item}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${i % 2 === 0 ? 'bg-lime-100 text-lime-800' : 'bg-violet-100 text-violet-800'}`}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {hobbies.map((hobby, index) => (
              <motion.div
                key={hobby.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`bg-gradient-to-br ${hobby.color} p-0.5 rounded-2xl shadow-sm hover:shadow-md cursor-pointer ${hobby.shape}`}
              >
                <div className="bg-white rounded-[calc(1rem-2px)] p-6 flex flex-col items-center group transition-all h-full">
                  <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{hobby.icon}</span>
                  <h3 className="font-semibold text-center">{hobby.name}</h3>
                  <span className="text-xs text-gray-500 mt-1">{Math.floor(Math.random() * 50) + 10}k members</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#faf7f0]">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Why Choose <span className="relative">
              HobbyHive
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 20">
                <path 
                  d="M0,10 Q100,30 200,10" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  fill="none"
                  className="text-amber-300"
                />
              </svg>
            </span>
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { 
                icon: <FiUsers className="w-6 h-6" />, 
                title: 'Find Your Community', 
                desc: 'Connect with people who share your specific interests and passions',
                color: 'bg-pink-100 text-pink-800'
              },
              { 
                icon: <FiCalendar className="w-6 h-6" />, 
                title: 'Join Events', 
                desc: 'Participate in both virtual and in-person gatherings and workshops',
                color: 'bg-cyan-100 text-cyan-800'
              },
              { 
                icon: <FiAward className="w-6 h-6" />, 
                title: 'Develop Skills', 
                desc: 'Learn from beginners to experts with our curated resources',
                color: 'bg-amber-100 text-amber-800'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl border border-black/10 hover:border-transparent hover:shadow-lg transition-all"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center text-2xl mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
                <div className="mt-4 pt-3 border-t border-black/5 text-xs font-medium text-gray-400 flex items-center">
                  Learn more <span className="ml-1">→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-amber-50/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 to-fuchsia-100/30"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 rounded-full bg-black text-white text-sm font-medium mb-6"
          >
            Ready to begin?
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Join Our Growing Community
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            We're building an inclusive space for hobby enthusiasts of all kinds.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSignupRedirect}
              className="px-6 py-3.5 bg-black text-white rounded-xl font-medium shadow-lg hover:shadow-fuchsia-200 transition-all flex items-center justify-center"
            >
              Create Account
              <span className="ml-2">→</span>
            </motion.button>
            <button className="px-6 py-3.5 bg-white border-2 border-black/10 rounded-xl font-medium hover:border-fuchsia-300 transition-all">
              Explore Features
            </button>
          </motion.div>
        </div>
        
        {/* Floating emojis */}
        {['🎨', '🌱', '📷', '✂️'].map((emoji, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, rotate: 0 }}
            animate={{ y: [0, 15, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute text-3xl ${i === 0 ? 'top-20 left-10' : ''} ${i === 1 ? 'bottom-1/4 right-20' : ''} ${i === 2 ? 'top-1/3 right-1/4' : ''} ${i === 3 ? 'bottom-20 left-1/4' : ''}`}
          >
            {emoji}
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-black/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-3xl">🐝</span>
                <h2 className="text-xl font-bold">HobbyHive</h2>
              </div>
              <p className="text-gray-500 text-sm">
                Connecting people through shared hobbies and interests.
              </p>
              <div className="flex space-x-3 mt-4">
                {['🎨', '🌿', '📸', '✂️'].map((emoji, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -3, rotate: [0, -10, 10, 0] }}
                    className="w-10 h-10 rounded-lg bg-black/5 flex items-center justify-center cursor-pointer hover:bg-black/10 transition-all"
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Navigation</h3>
              <ul className="space-y-2">
                {['Home', 'Hobbies', 'Events', 'Resources'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-fuchsia-500 transition-all flex items-center">
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-2"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Legal</h3>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Community Guidelines', 'Safety'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-fuchsia-500 transition-all flex items-center">
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-2"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Newsletter</h3>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="w-full px-4 py-2.5 rounded-lg bg-black/5 border border-black/10 focus:outline-none focus:ring-1 focus:ring-fuchsia-300 text-sm placeholder-black/30"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-1.5 rounded-md hover:bg-fuchsia-500 transition-all">
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Subscribe for updates and new features
              </p>
            </div>
          </div>
          
          <div className="pt-8 border-t border-black/10 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} HobbyHive. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HobbyHiveHome;