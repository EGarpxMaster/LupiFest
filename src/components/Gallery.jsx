import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// --- DATA PREPARATION ---

// 1. Image List
const allFulls = [
  "1.jpg", "2.jpg", "3.jpg", "3.5.jpg", "4.jpg", "5.jpg", "5.1.jpg", "6.jpg", "8.jpg", "8.1.jpg", "8.2.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "12.1.jpg", "13.jpg", "14.jpg", "14.1.jpg", "14.2.jpg", "14.3.jpg", "14.4.jpg", "14.5.jpg", "15.jpg", "16.jpg", "16.01.jpg", "16.1.jpg", "16.2.jpg", "16.3.jpg", "17.jpg", "17.1.jpg", "17.2.jpg", "18.1.jpg", "20.1.jpg", "20.2.jpg", "24.1.jpg", "24.2.jpg", "26.1.jpg", "26.2.jpg", "27.1.jpg", "30.jpg", "30.1.jpg", "30.2.jpg", "30.3.jpg", "30.4.jpg", "30.5.jpg", "30.6.jpg", "30.7.jpg", "30.8.jpg", "30.9.jpg", "31.jpg", "31.1.jpg", "32.jpg", "32.1.jpg", "32.2.jpg", "33.jpg", "33.1.jpg", "33.2.jpg", "33.3.jpg", "34.jpg", "35.jpg", "35.1.jpg", "35.2.jpg", "36.jpg", "37.jpg", "37.1.jpg", "37.2.jpg", "38.jpg"
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

// Force groups to fit poem lines by merging
while (imageGroups.length > poemLines.length) {
  // Find the smallest group and merge it with its neighbor
  let minIndex = 0;
  for (let i = 1; i < imageGroups.length - 1; i++) {
    if (imageGroups[i].length < imageGroups[minIndex].length) {
      minIndex = i;
    }
  }
  // Merge current with next
  if (minIndex < imageGroups.length - 1) {
    imageGroups[minIndex] = [...imageGroups[minIndex], ...imageGroups[minIndex + 1]];
    imageGroups.splice(minIndex + 1, 1);
  } else {
    // If last group is smallest, merge with previous
    imageGroups[minIndex - 1] = [...imageGroups[minIndex - 1], ...imageGroups[minIndex]];
    imageGroups.splice(minIndex, 1);
  }
}

// 4. Map Lines to Image Groups
const storyData = poemLines.map((text, index) => {
  const groupIndex = Math.floor((index / poemLines.length) * imageGroups.length);
  return {
    id: index,
    text,
    images: imageGroups[groupIndex] || imageGroups[0]
  };
});

// --- COMPONENTS ---

const WheelItem = ({ story }) => {
  return (
    <div className="h-[50vh] flex items-center justify-center p-6 snap-center">
      <div className="bg-love-dark/40 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-xl max-w-sm text-center">
        <p className="text-2xl text-white font-romantic leading-relaxed drop-shadow-md">
          "{story.text}"
        </p>
      </div>
    </div>
  );
};

const Gallery = () => {
  const containerRef = useRef(null);

  // Track scroll progress of the Right Container (0 to 1)
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  // Smooth out the scroll progress for a "fluid gear" feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  const totalItems = storyData.length;
  // Map vertical scroll progress to horizontal translation
  // If progress is 0 (Top), x should be 0%.
  // If progress is 1 (Bottom), x should be - (N-1)/N * 100 %.
  // The `x` transform percentage is relative to the element's own width.
  // The track has a width of `totalItems * 100%` (relative to its parent `w-1/2`).
  // To show image `k`, we need to shift by `k` times the width of one image.
  // One image width is `100%` of the parent container, which is `1/totalItems` of the track's total width.
  // So, to shift by `k` images, `x` should be `-(k / totalItems) * 100%`.
  // When scrollYProgress is 0, k=0, x=0%.
  // When scrollYProgress is 1, k=totalItems-1, x = -((totalItems - 1) / totalItems) * 100%.
  const finalXPercentage = -((totalItems - 1) / totalItems) * 100;

  const x = useTransform(smoothProgress, [0, 1], ["0%", `${finalXPercentage}%`]);

  return (
    <section id="gallery" className="relative h-screen flex flex-row overflow-hidden bg-transparent">

      {/* 
        LEFT COLUMN: IMAGE CAROUSEL (Receiver) 
        - Horizontal Scroll View linked to Right Scroll
        - No scaling, pure translation
      */}
      <div className="w-1/2 h-full relative overflow-hidden">
        <motion.div
          className="flex h-full"
          style={{
            x, // Driven directly by scroll progress (Linear 1:1)
            width: `${totalItems * 100}%`
          }}
        >
          {storyData.map((story, i) => (
            <div
              key={i}
              className="h-full flex-shrink-0 relative"
              style={{ width: `${100 / totalItems}%` }}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/fulls/${story.images[0]}`}
                alt="Memory"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* 
        RIGHT COLUMN: TEXT WHEEL (Driver)
        - Vertical Scroll Picker
        - Drives synchronization via useScroll
        - Visual "Wheel" effect
      */}
      <div
        ref={containerRef}
        className="w-1/2 h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
        style={{ scrollBehavior: 'smooth' }} // Enhance snap feel
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
