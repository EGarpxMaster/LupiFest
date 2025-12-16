import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLock, FaUnlock, FaHeart } from 'react-icons/fa';

const SecretSection = ({ isUnlocked, onUnlock }) => {
  const [date, setDate] = useState('');
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verificar la fecha de aniversario: 17/08/2024
    if (date === '17/08/2024' || date === '17-08-2024' || date === '2024-08-17') {
      setError(false);
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <section id="secret" className="py-20 px-4 relative z-10">
      <div className="container mx-auto max-w-4xl">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              data-aos="fade-up"
              className="glass-effect rounded-2xl p-8 md:p-12 shadow-2xl text-center"
            >
              <motion.div
                animate={{ rotate: error ? [0, -10, 10, -10, 10, 0] : 0 }}
                transition={{ duration: 0.5 }}
              >
                <FaLock className="text-6xl text-love-gold mx-auto mb-6" />
              </motion.div>
              
              <h2 className="text-4xl font-romantic font-bold text-white mb-4">
                Sección Secreta
              </h2>
              
              <p className="text-xl text-love-lavender mb-8">
                Hay algo muy especial esperándote aquí...
              </p>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-6">
                  <label className="block text-white mb-2 font-semibold">
                    Ingresa una fecha especial para nosotros
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="DD/MM/YYYY"
                    className={`w-full px-4 py-3 rounded-lg glass-effect text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-love-gold ${
                      error ? 'ring-2 ring-red-500' : ''
                    }`}
                  />
                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-400 mt-2 text-sm"
                    >
                      Esa no es la fecha correcta... 💔
                    </motion.p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full"
                >
                  Desbloquear 🔓
                </button>
              </form>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowHint(!showHint)}
                className="mt-6 text-love-lavender text-sm hover:text-love-gold transition-colors"
              >
                {showHint ? '🤫' : '¿Necesitas una pista?'}
              </motion.button>

              {showHint && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-love-peach mt-4 text-sm"
                >
                  Piensa en el día que comenzó nuestra historia juntos... 💕
                </motion.p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              {/* Confetti effect */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(50)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-2xl"
                    initial={{
                      x: '50%',
                      y: '50%',
                      opacity: 1,
                    }}
                    animate={{
                      x: `${Math.random() * 100}%`,
                      y: `${Math.random() * 100}%`,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.02,
                    }}
                  >
                    {['💖', '✨', '💕', '🌟', '💝'][Math.floor(Math.random() * 5)]}
                  </motion.div>
                ))}
              </div>

              <div className="glass-effect rounded-2xl p-8 md:p-12 shadow-2xl">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                >
                  <FaUnlock className="text-6xl text-love-gold mx-auto mb-6" />
                </motion.div>

                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-5xl font-romantic font-bold text-transparent bg-clip-text bg-gradient-to-r from-love-gold via-love-rose to-love-violet mb-6 text-center"
                >
                  ¡Lo Lograste! 💖
                </motion.h2>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-center mb-8"
                >
                  <p className="text-2xl text-white mb-4 font-romantic">
                    17 de Agosto de 2024
                  </p>
                  <p className="text-xl text-love-lavender">
                    El día que cambió nuestras vidas para siempre
                  </p>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="bg-gradient-to-r from-love-violet/30 to-love-rose/30 rounded-xl p-8 mb-8"
                >
                  <div className="text-white leading-relaxed space-y-4 text-lg">
                    <p>
                      Desde ese día mágico, cada momento a tu lado ha sido un regalo. 
                      Recordar cuando nos miramos por primera vez con esos ojos llenos 
                      de promesas me hace sonreír hasta el día de hoy.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cada 
                      aventura, cada risa compartida, cada abrazo en los días difíciles... 
                      todo ha construido la historia más hermosa que podría imaginar.
                    </p>
                    <p>
                      Hoy, en tu cumpleaños, quiero que sepas que eres la mejor decisión 
                      que he tomado. Eres mi persona favorita, mi cómplice, mi amor verdadero.
                    </p>
                    <p className="text-love-gold font-romantic text-xl text-center mt-6">
                      Te amo más que ayer, pero menos que mañana. 💕✨
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.3, type: 'spring' }}
                  className="flex justify-center gap-4 text-5xl"
                >
                  <motion.span
                    animate={{ rotate: [0, 20, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    💖
                  </motion.span>
                  <motion.span
                    animate={{ rotate: [0, -20, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  >
                    ✨
                  </motion.span>
                  <motion.span
                    animate={{ rotate: [0, 20, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  >
                    💕
                  </motion.span>
                </motion.div>

                {/* Interactive hearts */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="mt-8 text-center"
                >
                  <p className="text-love-lavender mb-4">
                    Haz clic en los corazones 💕
                  </p>
                  <div className="flex justify-center gap-4 flex-wrap">
                    {[...Array(10)].map((_, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.3, rotate: 360 }}
                        whileTap={{ scale: 0.8 }}
                        className="text-4xl"
                      >
                        <FaHeart className="text-love-rose hover:text-love-gold transition-colors" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SecretSection;
