import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ image, message, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="glass-effect rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="text-white hover:text-love-rose transition-colors text-2xl"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={image.full}
                alt={image.title}
                className="rounded-lg w-full h-auto shadow-2xl"
              />
            </motion.div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white"
            >
              <h3 className="text-3xl font-romantic font-bold text-love-gold mb-4">
                {image.title}
              </h3>
              <p className="text-lg text-love-lavender leading-relaxed">
                {message}
              </p>
              <div className="mt-6 flex gap-2">
                <span className="text-4xl">💕</span>
                <span className="text-4xl">✨</span>
                <span className="text-4xl">💖</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
