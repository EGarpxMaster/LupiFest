import { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from './Modal';

// Utilidad para agrupar imágenes por prefijo numérico
function groupImagesByPrefix(images) {
  const groups = {};
  images.forEach((img) => {
    // Extrae el prefijo antes del primer punto
    const match = img.match(/^(\d+)/);
    const key = match ? match[1] : img;
    if (!groups[key]) groups[key] = [];
    groups[key].push(img);
  });
  // Ordena los grupos y las imágenes dentro de cada grupo
  return Object.entries(groups)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([key, files]) => ({
      key,
      files: files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    }));
}

// Lista de imágenes en /fulls (generada manualmente por ahora)
const allFulls = [
  "1.jpg", "2.jpg", "3.jpg", "3.5.jpg", "4.jpg", "5.jpg", "5.1.jpg", "6.jpg", "8.jpg", "8.1.jpg", "8.2.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "12.1.jpg", "13.jpg", "14.jpg", "14.1.jpg", "14.2.jpg", "14.3.jpg", "14.4.jpg", "14.5.jpg", "15.jpg", "16.jpg", "16.01.jpg", "16.1.jpg", "16.2.jpg", "16.3.jpg", "17.jpg", "17.1.jpg", "17.2.jpg", "18.1.jpg", "20.1.jpg", "20.2.jpg", "24.1.jpg", "24.2.jpg", "26.1.jpg", "26.2.jpg", "27.1.jpg", "30.jpg", "30.1.jpg", "30.2.jpg", "30.3.jpg", "30.4.jpg", "30.5.jpg", "30.6.jpg", "30.7.jpg", "30.8.jpg", "30.9.jpg", "31.jpg", "31.1.jpg", "32.jpg", "32.1.jpg", "32.2.jpg", "33.jpg", "33.1.jpg", "33.2.jpg", "33.3.jpg", "34.jpg", "35.jpg", "35.1.jpg", "35.2.jpg", "36.jpg", "37.jpg", "37.1.jpg", "37.2.jpg", "38.jpg"
];

const grouped = groupImagesByPrefix(allFulls);

const poemStanzas = [
  `No buscaba nada más que entender las fórmulas, las leyes invisibles que mueven al mundo, hasta que la puerta del salón se abrió en esa clase de Electricidad y Magnetismo. Y allí estabas.`,

  `No fue un cálculo, fue un impacto. Recuerdo tu caminar, firme, decidido, como quien sabe exactamente a dónde va. Recuerdo los colores de ese día como si fuera hoy: un pantalón café, una playera verde, y tu cabello, que parecía tener su propia estática, capturando toda la luz del aula, capturándome a mí.`,

  `Me enamoré primero de lo que vi, de esa sonrisa que desarma, del ritmo de tus caderas y de tu pelo, pero me quedé por lo que descubrí después. Me quedé por tu inteligencia afilada, por esa fuerza inmensa que llevas dentro, y por ese don extraordinario de soltar una ocurrencia en el momento justo y hacer que el mundo estalle en risas.`,

  `Hemos recorrido mapas juntos. Desde las calles de Monterrey, hasta la tensión y el cansancio de aquella Jornada de Ingeniería, donde aprendimos que el reto no es el obstáculo, sino con quién lo enfrentas. Celebramos la victoria en el Rally de Aguakan, pero mi verdadero premio fue verte brillar, verte disfrutar la música que amas, perderte en una canción mientras yo me pierdo en ti.`,

  `Hoy, mirándote, entiendo que tú eres mi motor. Eres quien me motiva a diario a no conformarme, a pulirme, a ser un mejor hombre. El futuro es un mapa en blanco que quiero llenar contigo, viajando por el mundo, descubriendo nuevos lugares, pero sabiendo siempre que mi único lugar favorito, mi verdadero norte, eres tú.`
];

// Distribute groups across stanzas
const chunkSize = Math.ceil(grouped.length / poemStanzas.length);
const stanzaImages = poemStanzas.map((_, i) => {
  return grouped.slice(i * chunkSize, (i + 1) * chunkSize);
});

const Gallery = () => {
  const [selected, setSelected] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Para abrir modal de grupo
  const openModal = (group) => {
    setSelected(group);
    setCarouselIndex(0);
  };

  // Para navegar en el carousel
  const next = () => setCarouselIndex((i) => (i + 1) % selected.files.length);
  const prev = () => setCarouselIndex((i) => (i - 1 + selected.files.length) % selected.files.length);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-love-dark/20 to-love-dark/5 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div data-aos="fade-up" className="text-center mb-32">
          <h2 className="text-5xl font-romantic font-bold text-white mb-4 drop-shadow-lg">
            Nuestra Historia
          </h2>
          <p className="text-xl text-love-lavender max-w-2xl mx-auto drop-shadow-md">
            Un poema a la casualidad más hermosa de mi vida.
          </p>
        </motion.div>

        <div className="space-y-32">
          {poemStanzas.map((stanza, i) => {
            const isEven = i % 2 === 0;
            const images = stanzaImages[i] || [];
            // Use the first image of the group as the "cover" for this section
            const coverImage = images.length > 0 && images[0].files.length > 0
              ? images[0]
              : null;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col md:flex-row items-center gap-12 ${isEven ? '' : 'md:flex-row-reverse'}`}
              >
                {/* Image Side */}
                <div className="w-full md:w-1/2">
                  {coverImage ? (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="relative overflow-hidden rounded-2xl shadow-xl cursor-pointer group"
                      onClick={() => openModal(coverImage)}
                    >
                      <img
                        src={`/images/fulls/${coverImage.files[0]}`}
                        alt="Recuerdo"
                        className="w-full h-[500px] object-cover blur-2xl transition-all duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-xl font-romantic border-b border-love-gold pb-1">Ver Galería</span>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-64 bg-love-rose/10 rounded-xl flex items-center justify-center text-love-lavender">
                      Sin imagen disponible
                    </div>
                  )}
                </div>

                {/* Text Side */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <p className="text-2xl md:text-3xl text-white font-romantic leading-relaxed drop-shadow-md px-6">
                    "{stanza}"
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal/Carousel */}
      {selected && (
        <Modal
          image={{
            full: `/images/fulls/${selected.files[carouselIndex]}`,
            title: `Recuerdo #${selected.key} (${carouselIndex + 1}/${selected.files.length})`
          }}
          message={"..."}
          onClose={() => setSelected(null)}
        >
          {selected.files.length > 1 && (
            <div className="flex justify-center gap-4 mt-4">
              <button onClick={prev} className="btn-secondary">Anterior</button>
              <button onClick={next} className="btn-primary">Siguiente</button>
            </div>
          )}
        </Modal>
      )}
    </section>
  );
};

export default Gallery;
