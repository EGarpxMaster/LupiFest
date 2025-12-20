import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// --- DATA PREPARATION ---

// 1. Image List
// 1. Image Data
const allFulls = [
  "10.jpg", "11.jpg", "12.1.jpg", "12.jpg", "13.jpg",
  "14.1.jpg", "14.2.jpg", "14.3.jpg", "14.4.jpg", "14.5.jpg", "14.jpg",
  "15.jpg", "16.01.jpg", "16.1.jpg", "16.2.jpg", "16.3.jpg", "16.jpg",
  "17.1.jpg", "17.2.jpg", "17.jpg", "18.1.jpg", "1.jpg", "20.1.jpg", "20.2.jpg",
  "24.1.jpg", "24.2.jpg", "26.1.jpg", "26.2.jpg", "27.1.jpg", "2.jpg",
  "30.1.jpg", "30.2.jpg", "30.3.jpg", "30.4.jpg", "30.5.jpg", "30.6.jpg", "30.7.jpg", "30.8.jpg", "30.9.jpg", "30.jpg",
  "31.1.jpg", "31.jpg", "32.1.jpg", "32.2.jpg", "32.jpg",
  "33.1.jpg", "33.2.jpg", "33.3.jpg", "33.jpg", "34.jpg", "35.1.jpg", "35.2.jpg", "3.5.jpg", "35.jpg",
  "36.jpg", "37.1.jpg", "37.2.jpg", "37.jpg", "38.jpg", "3.jpg", "4.jpg",
  "5.1.jpg", "5.jpg", "6.jpg", "8.1.jpg", "8.2.jpg", "8.jpg", "9.jpg"
];

// 2. Group Images Logic
function groupImages(images) {
  const groups = {};
  images.forEach(img => {
    // Group by integer prefix (e.g. "14.1.jpg" -> "14")
    const match = img.match(/^(\d+)/);
    const key = match ? match[1] : 'misc';
    if (!groups[key]) groups[key] = [];
    groups[key].push(img);
  });
  // Sort keys numerically
  const sortedKeys = Object.keys(groups).sort((a, b) => Number(a) - Number(b));
  return sortedKeys.map(key => groups[key].sort());
}

let imageGroups = groupImages(allFulls);

// 3. Poem Data (Split into granular lines/phrases)
const poemLines = [
  // Stanza 1
  "No buscaba nada más que entender las fórmulas...",
  "Las leyes invisibles que mueven al mundo.",
  "Hasta que la puerta del salón se abrió en esa clase de Electricidad y Magnetismo.",
  "Y allí estabas.",

  // Stanza 2
  "No fue un cálculo, fue un impacto.",
  "Recuerdo tu caminar, firme, decidido, como quien sabe exactamente a dónde va.",
  "Recuerdo los colores de ese día como si fuera hoy: un pantalón café, una playera verde...",
  "Y tu cabello, que parecía tener su propia estática, capturando toda la luz del aula, capturándome a mí.",

  // Stanza 3
  "Me enamoré primero de lo que vi, de esa sonrisa que desarma.",
  "Del ritmo de tus caderas y de tu pelo.",
  "Pero me quedé por lo que descubrí después.",
  "Me quedé por tu inteligencia afilada.",
  "Por esa fuerza inmensa que llevas dentro.",
  "Y por ese don extraordinario de soltar una ocurrencia en el momento justo y hacer que el mundo estalle en risas.",

  // Stanza 4
  "Hemos recorrido mapas juntos. Desde las calles de Monterrey...",
  "Hasta la tensión y el cansancio de aquella Jornada de Ingeniería.",
  "Donde aprendimos que el reto no es el obstáculo, sino con quién lo enfrentas.",
  "Celebramos la victoria en el Rally de Aguakan.",
  "Pero mi verdadero premio fue verte brillar.",
  "Verte disfrutar la música que amas, perderte en una canción mientras yo me pierdo en ti.",

  // Stanza 5
  "Hoy, mirándote, entiendo que tú eres mi motor.",
  "Eres quien me motiva a diario a no conformarme, a pulirme, a ser un mejor hombre.",
  "El futuro es un mapa en blanco que quiero llenar contigo.",
  "Viajando por el mundo, descubriendo nuevos lugares.",
  "Pero sabiendo siempre que mi único lugar favorito, mi verdadero norte...",
  "Eres tú."
];

// 4. Map Lines to Image Groups - 1:1 Mapping (One text box per image)
const flatImages = imageGroups.flat();

const storyData = flatImages.map((img, index) => {
  // Distribute poem lines across all images
  const textIndex = Math.floor((index / flatImages.length) * poemLines.length);
  return {
    id: index,
    text: poemLines[textIndex] || poemLines[poemLines.length - 1], // Fallback to last line
    images: [img] // Strict 1 image per card
  };
});

// --- COMPONENTS ---

const SkeletonImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative ${className} bg-gray-900 overflow-hidden`}>
      {/* Skeleton / Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-white/10 animate-pulse z-10" />
      )}

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover transition-opacity duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

const WheelItem = ({ story }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Ferris Wheel Logic with C-Shape Arc (Semicircle right-to-left):
  // - x: Starts Right (25vw), Arcs IN Left (-10vw) at center to meet image, Ends Right (25vw).
  // - Radius: approx 1/4 screen width effective movement.

  const x = useTransform(scrollYProgress, [0, 0.5, 1], ["25vw", "-10vw", "25vw"]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [300, 0, -300]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const z = useTransform(scrollYProgress, [0, 0.5, 1], [-200, 0, -200]);

  return (
    <motion.div
      ref={ref}
      style={{
        x,           // C-Shape Arc
        y,           // Vertical movement
        z,           // Depth movement
        scale,       // Size change
        opacity,     // Fade at edges
        rotateX: 0   // KEEP FLAT
      }}
      className="h-[50vh] flex items-center justify-center p-6 snap-center origin-center"
    >
      <div className="bg-love-dark/40 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-xl max-w-sm text-center">
        <p className="text-2xl text-white font-romantic leading-relaxed drop-shadow-md">
          "{story.text}"
        </p>
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  const containerRef = useRef(null);

  // Track scroll progress of the Right Container (0 to 1)
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const totalItems = storyData.length;

  return (
    <section id="gallery" className="relative h-screen flex flex-row overflow-hidden bg-transparent">

      {/* 
        LEFT COLUMN: IMAGE STACK (Receiver) 
        - Absolute positioning
        - Opacity driven by scroll progress to ensure 1:1 match with text
      */}
      <div className="w-1/2 h-full relative overflow-hidden">
        {storyData.map((story, i) => {
          // Calculate visibility range for this image
          // It should be visible when the corresponding text box is roughly in the center
          // Scroll Progress goes 0 to 1.
          // Item i is centered roughly at i / N? No, scroll is continuous.
          // Let's us useTransform to map scrollYProgress to opacity based on index.

          // Simple discrete visibility: if we are in the "zone" for item i.
          // Zone size = 1 / totalItems.
          const step = 1 / totalItems;
          const start = (i * step); // Start of this item's zone
          const center = start + (step / 2); // Center of zone
          const end = start + step; // End of zone

          // We want it visible when we are near 'center'.
          // A bit of overlap (crossfade) is nice, or strict cut? User said "only one image".
          // Strict cut logic:
          const isVisible = useTransform(scrollYProgress, (val) => {
            // Map 0-1 to 0-(totalItems-1)
            const activeIndex = Math.round(val * (totalItems - 1));
            return activeIndex === i ? 1 : 0;
          });

          return (
            <motion.div
              key={i}
              className="absolute inset-0 w-full h-full"
              style={{ opacity: isVisible }}
            >
              <SkeletonImage
                src={`${import.meta.env.BASE_URL}images/fulls/${story.images[0]}`}
                alt="Memory"
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            </motion.div>
          );
        })}
      </div>

      {/* 
        RIGHT COLUMN: TEXT WHEEL (Driver)
        - Vertical Scroll Picker
      */}
      <div
        ref={containerRef}
        className="w-1/2 h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar perspective-container"
        style={{ scrollBehavior: 'smooth', perspective: '1000px' }} // Enhance snap feel + 3D
      >
        {/* Spacers to center first and last items */}
        <div className="h-[25vh]" />

        {storyData.map((story, index) => (
          <WheelItem key={index} story={story} />
        ))}

        <div className="h-[25vh]" />
      </div>

    </section>
  );
};

export default Gallery;
