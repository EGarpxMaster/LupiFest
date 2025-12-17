import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ image, onClose, children }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative max-w-5xl w-full flex flex-col items-center justify-center pointer-events-none"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button - pointer events enabled */}
          <div className="absolute -top-12 right-0 pointer-events-auto">
            <button
              onClick={onClose}
              className="text-white hover:text-love-rose transition-colors text-3xl"
            >
              <FaTimes />
            </button>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="pointer-events-auto"
          >
            <img
              src={image.full}
              alt={image.title}
              className="rounded-lg max-h-[85vh] w-auto shadow-2xl mx-auto"
            />
          </motion.div>

          {/* Children (Navigation buttons) - pointer events enabled */}
          <div className="mt-4 pointer-events-auto">
            {children}
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
