import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

// ... (Playlist array remains same, skipping lines for brevity if possible, but tool requires contiguous block. I will just replace the top imports and then scroll down to logic) 
// Actually I need to replace imports first.

// Let's do imports first.


// Lista de canciones (reemplaza con las rutas reales de los archivos de audio)
const playlist = [
  { id: 1, title: 'Baile Inolvidable', artist: 'Unknown', url: '/audio/BaileInolvidable.mp3' },
  { id: 2, title: 'Berghain', artist: 'Unknown', url: '/audio/Berghain.mp3' },
  { id: 3, title: 'Con Toda Libertad', artist: 'Unknown', url: '/audio/ConTodaLibertad.mp3' },
  { id: 4, title: 'Die With A Smile', artist: 'Lady Gaga & Bruno Mars', url: '/audio/DieWithASmile.mp3' },
  { id: 5, title: 'Dulce Soledad', artist: 'Enjambre', url: '/audio/DulceSoledad.mp3' },
  { id: 6, title: 'Ojitos Lindos', artist: 'Bad Bunny', url: '/audio/OjitosLindos.mp3' },
  { id: 7, title: 'Si Te Pillara', artist: 'Unknown', url: '/audio/SiTePillara.mp3' },
  { id: 8, title: 'Tu Misterioso Alguien', artist: 'Miranda!', url: '/audio/TuMisteriosoAlguien.mp3' },
  { id: 9, title: 'Veo En Ti La Luz', artist: 'Tangled', url: '/audio/VeoEnTiLaLuz.mp3' },
];

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [volume, setVolume] = useState(0.7);

  // Smart Shuffle State
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Initial Shuffle on Mount
  useEffect(() => {
    const indices = [...Array(playlist.length).keys()];
    const shuffled = shuffleArray(indices);
    setQueue(shuffled);
    setCurrentIndex(0);
    // Be ready to play the first one
    setCurrentSong(playlist[shuffled[0]]);
  }, []);

  // Fisher-Yates Shuffle Helper
  const shuffleArray = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const playSongAtIndex = (idx, currentQueue) => {
    const songIndex = currentQueue[idx];
    const song = playlist[songIndex];
    setCurrentSong(song);

    // Tiny timeout to ensure DOM updates source if needed, though simple state update usually works
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.log('Error playing audio:', err));
        setIsPlaying(true);
      }
    }, 0);
  };

  const playPrevious = () => {
    let prevIndex = currentIndex - 1;
    // Wrap around if at start
    if (prevIndex < 0) {
      prevIndex = queue.length - 1;
    }
    setCurrentIndex(prevIndex);
    playSongAtIndex(prevIndex, queue);
  };

  const playNext = () => {
    let nextIndex = currentIndex + 1;
    let currentQueue = queue;

    // Cycle complete? Reshuffle.
    if (nextIndex >= queue.length) {
      const indices = [...Array(playlist.length).keys()];
      currentQueue = shuffleArray(indices);
      setQueue(currentQueue);
      nextIndex = 0;
    }

    setCurrentIndex(nextIndex);
    playSongAtIndex(nextIndex, currentQueue);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // If we have a song selected (which we should from useEffect), just play it
      if (currentSong) {
        audioRef.current.play().catch(e => console.error("Play failed", e));
        setIsPlaying(true);
      } else if (queue.length > 0) {
        // Fallback if currentSong wasn't set for some reason
        playSongAtIndex(currentIndex, queue);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSongEnd = () => {
    playNext();
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 w-full z-40 glass-effect border-t border-white/10 p-3 sm:p-4"
    >
      <div className="container mx-auto flex items-center justify-between gap-4">

        {/* Song Info (Left) */}
        <div className="flex items-center gap-4 min-w-[150px] w-1/3">
          <div className={`w-12 h-12 rounded-lg bg-love-rose flex items-center justify-center text-2xl text-white ${isPlaying ? 'animate-pulse' : ''}`}>
            🎵
          </div>
          <div className="hidden sm:block overflow-hidden">
            <p className="text-white font-bold truncate">{currentSong ? currentSong.title : 'Selecciona una canción'}</p>
            <p className="text-love-lavender text-sm truncate">{currentSong ? currentSong.artist : '...'}</p>
          </div>
        </div>

        {/* Controls (Center) */}
        <div className="flex items-center justify-center gap-6 w-1/3">

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={playPrevious}
            className="text-white hover:text-love-gold text-xl"
            aria-label="Anterior"
          >
            <FaBackward />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-love-rose to-love-pink text-white flex items-center justify-center text-xl shadow-lg hover:shadow-love-gold/50 transition-shadow"
          >
            {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={playNext}
            className="text-white hover:text-love-gold text-xl"
            aria-label="Siguiente"
          >
            <FaForward />
          </motion.button>
        </div>

        {/* Volume (Right) */}
        <div className="flex items-center justify-end gap-3 w-1/3">
          <button onClick={toggleMute} className="text-white hover:text-love-gold">
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24 sm:w-32 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #F72585 0%, #F72585 ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`
            }}
          />
        </div>

        <audio
          ref={audioRef}
          src={currentSong?.url}
          onEnded={handleSongEnd}
          className="hidden"
        />
      </div>
    </motion.div>
  );
};

export default AudioPlayer;
