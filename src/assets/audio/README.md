# Directorio de Audio

## Instrucciones

Coloca tus archivos de música en este directorio.

### Formato recomendado:
- **Formato**: MP3
- **Nombres**: song1.mp3, song2.mp3, song3.mp3, etc.
- **Bitrate**: 192 kbps o mayor para buena calidad

### Ejemplo de estructura:

```
audio/
├── song1.mp3
├── song2.mp3
├── song3.mp3
└── ...
```

### Configuración

Después de agregar tus canciones, actualiza el archivo:
`src/components/AudioPlayer.jsx`

Modifica el array `playlist`:

```javascript
const playlist = [
  {
    id: 1,
    title: 'Nombre de la Canción 1',
    artist: 'Nombre del Artista',
    url: '/audio/song1.mp3'
  },
  {
    id: 2,
    title: 'Nombre de la Canción 2',
    artist: 'Nombre del Artista',
    url: '/audio/song2.mp3'
  },
  // Agrega más canciones aquí...
];
```

**Nota**: Asegúrate de tener los derechos o permisos necesarios para usar la música.
