import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaForward, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

// Lista de canciones (reemplaza con las rutas reales de los archivos de audio)
const playlist = [
  {
    id: 1,
    title: 'Con Toda Libertad',
    artist: 'Artista',
    url: '/audio/ConTodaLibertad.mp3'
  },
  {
    id: 2,
    title: 'Canción Favorita 2',
    artist: 'Artista 2',
    url: '/audio/song2.mp3'
  },
  {
    id: 3,
    title: 'Canción Favorita 3',
    artist: 'Artista 3',
    url: '/audio/song3.mp3'
  },
];

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const playRandomSong = () => {
    const randomIndex = Math.floor(Math.random() * playlist.length);
    const song = playlist[randomIndex];
    setCurrentSong(song);
    
    if (audioRef.current) {
      audioRef.current.src = song.url;
      audioRef.current.play().catch(err => console.log('Error playing audio:', err));
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (!currentSong) {
        playRandomSong();
        return;
      }
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSongEnd = () => {
    playRandomSong();
  };

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          data-aos="fade-up"
          className="glass-effect rounded-2xl p-8 shadow-2xl"
        >
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
              className="text-6xl mb-4"
            >
              🎵
            </motion.div>
            <h2 className="text-3xl font-romantic font-bold text-white mb-2">
              Nuestra Música
            </h2>
            <p className="text-love-lavender">
              Las canciones que nos hacen sonreír
            </p>
          </div>

          {currentSong && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6 p-4 bg-white/5 rounded-lg"
            >
              <p className="text-white font-semibold text-lg">{currentSong.title}</p>
              <p className="text-love-lavender text-sm">{currentSong.artist}</p>
            </motion.div>
          )}

          <div className="flex items-center justify-center gap-6 mb-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-love-rose to-love-pink text-white flex items-center justify-center text-2xl shadow-lg hover:shadow-love-gold/50 transition-shadow"
            >
              {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={playRandomSong}
              className="w-12 h-12 rounded-full glass-effect text-white flex items-center justify-center text-lg hover:bg-white/20 transition-colors"
            >
              <FaForward />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMute}
              className="w-12 h-12 rounded-full glass-effect text-white flex items-center justify-center text-lg hover:bg-white/20 transition-colors"
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </motion.button>
          </div>

          <div className="flex items-center gap-4">
            <FaVolumeUp className="text-white" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #F72585 0%, #F72585 ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`
              }}
            />
          </div>

          <audio
            ref={audioRef}
            onEnded={handleSongEnd}
            className="hidden"
          />

          {!currentSong && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-6"
            >
              <button
                onClick={playRandomSong}
                className="btn-primary"
              >
                Reproducir Música Aleatoria 🎶
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AudioPlayer;
