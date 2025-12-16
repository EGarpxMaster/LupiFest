import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import AudioPlayer from './components/AudioPlayer';
import SecretSection from './components/SecretSection';
import Footer from './components/Footer';

function App() {
  const [isSecretUnlocked, setIsSecretUnlocked] = useState(false);
  const [showHero, setShowHero] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <div className="min-h-screen font-modern overflow-x-hidden">
      <Header />
      {showHero ? (
        <Hero onHide={() => setShowHero(false)} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Gallery />
          <AudioPlayer />
          <SecretSection 
            isUnlocked={isSecretUnlocked}
            onUnlock={() => setIsSecretUnlocked(true)}
          />
          <Footer />
        </motion.div>
      )}
      {/* Floating hearts animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-love-pink opacity-20"
            initial={{ y: '100vh', x: Math.random() * window.innerWidth }}
            animate={{
              y: '-100vh',
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{ fontSize: `${Math.random() * 30 + 20}px` }}
          >
            ♥
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default App;

