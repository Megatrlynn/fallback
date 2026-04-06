import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ArrowLeft, ExternalLink, Globe, MonitorSmartphone, Server } from 'lucide-react';

const ParticleBackground = () => {
  const particles = Array.from({ length: 30 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-white/20 filter blur-[1px]"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.1,
          }}
          animate={{
            y: [null, Math.random() * -500 - 100],
            x: [null, Math.random() * 200 - 100 + (Math.random() * window.innerWidth)],
            opacity: [null, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const Blob = ({ className, delay }) => (
  <motion.div
    className={`absolute rounded-full mix-blend-screen filter blur-[80px] opacity-40 ${className}`}
    animate={{
      scale: [1, 1.2, 0.9, 1],
      rotate: [0, 90, 180, 360],
      borderRadius: ["50%", "40% 60%", "60% 40%", "50%"],
    }}
    transition={{
      duration: 15,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#030014] overflow-hidden font-sans text-white perspective-1000">
      
      {/* Dynamic Animated Orbs */}
      <Blob className="w-[500px] h-[500px] bg-indigo-600 top-[-20%] left-[-10%]" delay={0} />
      <Blob className="w-[400px] h-[400px] bg-purple-600 bottom-[-10%] right-[-10%]" delay={2} />
      <Blob className="w-[600px] h-[600px] bg-fuchsia-600 top-[30%] left-[40%]" delay={4} />
      <ParticleBackground />

      <motion.div 
        className="relative z-10 max-w-3xl w-full p-1"
        style={{
          rotateX: mousePosition.y * -1,
          rotateY: mousePosition.x,
          transformStyle: "preserve-3d"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-[2.5rem] blur-xl" />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative bg-white/[0.03] backdrop-blur-[40px] border border-white/[0.08] p-10 md:p-16 rounded-[2rem] shadow-2xl flex flex-col items-center text-center overflow-hidden"
        >
          {/* Inner ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[30%] bg-white/[0.05] filter blur-[50px] rounded-full" />

          {/* Icon Array */}
          <motion.div variants={itemVariants} className="flex gap-4 mb-10">
            {[Globe, MonitorSmartphone, Server].map((Icon, idx) => (
              <motion.div
                key={idx}
                className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-white/50"
                whileHover={{ y: -5, scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,1)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Icon size={20} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6 relative">
            <motion.div 
              animate={{ 
                boxShadow: ["0px 0px 0px 0px rgba(168,85,247,0)", "0px 0px 100px 20px rgba(168,85,247,0.4)", "0px 0px 0px 0px rgba(168,85,247,0)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
            />
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.5)]">
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <AlertTriangle size={48} className="text-white drop-shadow-lg" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-6xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-indigo-200 to-purple-400 drop-shadow-sm"
          >
            Access Denied
          </motion.h1>

          <motion.div variants={itemVariants} className="h-[2px] w-24 bg-gradient-to-r from-transparent via-purple-400 to-transparent mb-8" />

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-indigo-100/80 mb-6 leading-relaxed max-w-xl font-medium"
          >
            The stars aligned, but the server didn't. 
            The link you followed for the GitHub repository, demo page, or hosted app is currently <span className="text-purple-300 font-bold">unavailable</span>.
          </motion.p>

          <motion.p 
            variants={itemVariants}
            className="text-sm md:text-base text-white/40 mb-10 max-w-lg"
          >
            We're likely performing cosmic maintenance or spinning up new instances. Please hold tight and try again shortly!
          </motion.p>

          <motion.div variants={itemVariants}>
            <motion.button
              onClick={() => window.history.back()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] hover:border-purple-500/50 rounded-full font-semibold text-white shadow-lg overflow-hidden transition-all duration-300 flex items-center gap-3 backdrop-blur-md"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/20 to-fuchsia-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="relative z-10 tracking-wide">Return to Safety</span>
            </motion.button>
          </motion.div>

        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;
