import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = ({ onHide }) => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => onHide && onHide()
    });

    tl.fromTo(titleRef.current,
      { opacity: 0.2 },
      {
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      }
    )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out'
        }
      )
      .to({}, { duration: 1 }) // Wait 3s with everything visible
      .to(sectionRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power1.in'
      });
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id="hero"
      className="min-h-screen flex items-center justify-center pt-20 px-4 relative"
      initial={{ opacity: 1 }}
    >
      <div className="container mx-auto text-center z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <div className="text-8xl mb-4 animate-pulse-slow">
            💝
          </div>
        </motion.div>
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-romantic font-bold text-white mb-6 leading-tight drop-shadow-lg"
        >
          Feliz Cumpleaños
          <span className="block text-love-gold mt-2">Mi Amor</span>
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-love-lavender max-w-2xl mx-auto mb-12"
        >
          Este es un viaje especial a través de nuestros momentos más preciados.
          Cada imagen cuenta una historia, cada recuerdo vive en mi corazón.
        </p>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white text-4xl"
        >
          ↓
        </motion.div>
      </div>
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-love-rose/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-1/3 right-20 w-32 h-32 bg-love-violet/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-love-gold/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
    </motion.section>
  );
};

export default Hero;
