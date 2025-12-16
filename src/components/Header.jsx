import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const Header = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <FaHeart className="text-love-rose text-2xl animate-pulse" />
            <h1 className="text-2xl font-romantic font-bold text-white">
              Un Regalo Especial
            </h1>
          </motion.div>
          
          <nav className="hidden md:flex gap-6">
            <a href="#hero" className="text-white hover:text-love-gold transition-colors">
              Inicio
            </a>
            <a href="#gallery" className="text-white hover:text-love-gold transition-colors">
              Momentos
            </a>
            <a href="#secret" className="text-white hover:text-love-gold transition-colors">
              Secreto
            </a>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
