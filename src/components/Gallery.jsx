import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

// --- DATA PREPARATION ---

const rawStoryData = [
  { text: "Hoy celebramos 24 años de tu vida, Guadalupe.", img: "1.jpg" },
  { text: "Y pensar que todo comenzó en un salón de clases.", img: "2.jpg" },
  { text: "Entre fórmulas de Electricidad y Magnetismo.", img: "5.1.jpg" },
  { text: "Tú con ese pantalón café y camisa verde...", img: "5.jpg" },
  { text: "Yo quedé flechado en el instante en que entraste.", img: "4.jpg" },
  { text: "Aunque admitámoslo, al principio yo te caía mal.", img: "14.4.jpg" },
  { text: "Pero el destino (y mi insistencia) tenía otros planes.", img: "14.5.jpg" },
  { text: "Y míranos ahora, un año y medio después.", img: "15.jpg" },

  // II. Tus "Pequeñas" Locuras
  { text: "Me enamoré de tus historias infinitas.", img: "9.jpg" },
  { text: "Y de tu obsesión por Gossip Girl (que ya me sé de memoria).", img: "12.jpg" },
  { text: "De ese ritual sagrado de limpiar el polvo de la cama...", img: "14.1.jpg" },
  { text: "...aunque a veces solo tú veas ese polvo.", img: "14.2.jpg" },
  { text: "Amo cuando cantas con ese tono dramático:", img: "17.jpg" },
  { text: "\"Me estoy muriendo de sueñoooo\".", img: "17.1.jpg" },
  { text: "O el clásico musical: \"Tengo mucha hambreee\".", img: "17.2.jpg" },
  { text: "Eres la única persona que conozco...", img: "20.1.jpg" },
  { text: "...que si se ríe de verdad, termina en el suelo.", img: "20.2.jpg" },
  { text: "Literalmente, en el suelo, sin importar dónde estemos.", img: "24.1.jpg" },
  { text: "Y si no estás en el suelo por risa, es por torpeza.", img: "24.2.jpg" },
  { text: "Porque caminar juntos es un deporte extremo...", img: "31.jpg" },
  { text: "...donde tu misión es tropezarte con el aire.", img: "31.1.jpg" },
  { text: "Pero no te preocupes, yo siempre te sostengo.", img: "30.3.jpg" },

  // III. Nostalgia y Lugares
  { text: "Hemos coleccionado coordenadas y recuerdos.", img: "6.jpg" },
  { text: "Como aquella brisa en Isla Blanca.", img: "11.jpg" },
  { text: "O esa noche en el barco Columbus...", img: "8.1.jpg" },
  { text: "...donde los nervios me mataban.", img: "8.2.jpg" },
  { text: "Te hice una pregunta y cambiaste mi vida.", img: "8.jpg" },
  { text: "Cenas que saben a gloria, como en Rolandis.", img: "3.5.jpg" },
  { text: "Momentos elegantes donde tú brillas más.", img: "35.1.jpg" },
  { text: "Y noches simples donde solo existimos tú y yo.", img: "35.2.jpg" },

  // IV. Aventuras en Monterrey y Montañas
  { text: "Qué gran viaje fue Monterrey.", img: "13.jpg" },
  { text: "Conquistando alturas (aunque te canses).", img: "16.jpg" },
  { text: "Entre montañas inmensas y cielos azules.", img: "16.1.jpg" },
  { text: "Tú, posando como si fueras dueña del cerro.", img: "16.2.jpg" },
  { text: "(Y yo, tomando la foto, por supuesto).", img: "16.3.jpg" },
  { text: "Cada paisaje se ve mejor si estás tú en el encuadre.", img: "16.01.jpg" },
  { text: "Explorando rincones coloniales y mágicos.", img: "18.1.jpg" },
  { text: "Subiendo escaleras infinitas hacia la meta.", img: "26.1.jpg" },
  { text: "Descansando cuando las piernas ya no daban.", img: "26.2.jpg" },
  { text: "Pero siempre con esa sonrisa que me desarma.", img: "27.1.jpg" },

  // V. La Ingeniera y La Compañera
  { text: "Te he visto crecer tanto este último año.", img: "37.jpg" },
  { text: "Ahora toda una profesional en su nueva etapa.", img: "37.1.jpg" },
  { text: "Ejerciendo con pasión, aprendiendo a diario.", img: "37.2.jpg" },
  { text: "Ya casi llega la graduación, mi futura colega.", img: "33.jpg" },
  { text: "Y sé que arrasarás con todo lo que venga.", img: "33.1.jpg" },
  { text: "Eres una compañera de aventuras 10/10.", img: "33.2.jpg" },
  { text: "Contigo es imposible aburrirse.", img: "33.3.jpg" },
  { text: "Porque cada día a tu lado es una anécdota nueva.", img: "32.jpg" },

  // VI. Naturaleza y Senderismo
  { text: "Nos encanta perdernos entre los árboles.", img: "30.jpg" },
  { text: "Respirar aire puro lejos de la ciudad.", img: "30.1.jpg" },
  { text: "Sentarnos en una roca a ver la vida pasar.", img: "30.2.jpg" },
  { text: "Tú con tu gorra, lista para la acción.", img: "30.4.jpg" },
  { text: "Aunque a los cinco minutos ya tengas \"hambre\".", img: "30.5.jpg" },
  { text: "Esos momentos de paz son mis favoritos.", img: "30.6.jpg" },
  { text: "Solo nosotros, el bosque y el silencio.", img: "30.7.jpg" },
  { text: "Preparándonos para retos más grandes.", img: "30.8.jpg" },
  { text: "Como el Volcán de Fuego que nos espera en Guatemala.", img: "30.9.jpg" },

  // VII. El Cierre
  { text: "Mi amor, gracias por este año y medio.", img: "32.1.jpg" },
  { text: "Por dejarme ser tu fotógrafo y tu apoyo.", img: "32.2.jpg" },
  { text: "Por tropezarte siempre hacia mis brazos.", img: "34.jpg" },
  { text: "El mundo es enorme y lo vamos a recorrer.", img: "35.jpg" },
  { text: "Pero hoy, el mundo cabe en esta foto.", img: "14.3.jpg" },
  { text: "¡Feliz cumpleaños, mi compañera de vida!", img: "36.jpg" },
  { text: "Pide un deseo, que yo me encargo de cumplirlo.", img: "38.jpg" }
];

const storyData = rawStoryData.map((item, index) => ({
  id: index,
  text: item.text,
  images: [item.img]
}));

// --- COMPONENTS ---

const SkeletonImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative ${className} bg-gray-800 overflow-hidden`}>
      {/* Skeleton / Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-700 animate-pulse">
          <svg className="w-10 h-10 text-white/20 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  );
};

const WheelItem = ({ story, index, onActive, containerRef }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-45% 0px -45% 0px", // Relaxed slightly to ensure trigger
    amount: "some" // Trigger as soon as any part enters this zone
  });

  useEffect(() => {
    if (isInView) {
      onActive(index);
    }
  }, [isInView, index, onActive]);

  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef, // Explicitly track relative to the scrolling parent
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 0.5, 1], ["25vw", "0vw", "25vw"]);
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
          {story.text}
        </p>
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="gallery" className="relative h-screen flex flex-row overflow-hidden bg-transparent">

      {/* 
        LEFT COLUMN: IMAGE STACK (Receiver) 
        - State-driven opacity (Observer) for perfect sync
      */}
      <div className="w-1/2 h-full relative overflow-hidden">
        {storyData.map((story, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: i === activeIndex ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }} // Smooth switch transition
          >
            <SkeletonImage
              src={`${import.meta.env.BASE_URL}images/fulls/${story.images[0]}`}
              alt="Memory"
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
          </motion.div>
        ))}
      </div>

      {/* 
        RIGHT COLUMN: TEXT WHEEL (Driver)
        - Vertical Scroll Picker
      */}
      <div
        ref={containerRef}
        className="w-1/2 h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar perspective-container"
        style={{ scrollBehavior: 'smooth', perspective: '1000px' }}
      >
        <div className="h-[25vh]" />

        {storyData.map((story, index) => (
          <WheelItem
            key={index}
            story={story}
            index={index}
            onActive={setActiveIndex}
            containerRef={containerRef}
          />
        ))}

        <div className="h-[25vh]" />
      </div>

    </section>
  );
};

export default Gallery;
