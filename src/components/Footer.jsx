import { motion } from 'framer-motion';
import { FaHeart, FaGithub } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 relative z-10 border-t border-white/10">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <FaHeart className="text-love-rose text-3xl" />
            </motion.div>
          </div>
          
          <p className="text-love-lavender text-lg mb-2">
            Hecho con todo mi amor para ti
          </p>
          
          <p className="text-white/60 text-sm">
            © {currentYear} - Un regalo especial de cumpleaños
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-6 text-3xl"
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💕
          </motion.span>
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          >
            ✨
          </motion.span>
          <motion.span
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          >
            💖
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-love-lavender/60 text-xs"
        >
          <p>
            Cada línea de código fue escrita pensando en ti 💝
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
