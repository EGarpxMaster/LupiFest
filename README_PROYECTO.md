# 💝 Feliz Cumpleaños - Regalo Especial

Una experiencia web interactiva creada con React, Vite y Tailwind CSS como regalo de cumpleaños.

## ✨ Características

- 🎨 **Diseño vibrante y emotivo** con paleta de colores rosa, morado y dorado
- 📸 **Galería interactiva** con modales que muestran mensajes emotivos
- 🎵 **Reproductor de audio** con reproducción aleatoria de canciones favoritas
- 🔐 **Sección secreta** que se desbloquea con la fecha de aniversario (17/08/2024)
- 🎭 **Animaciones avanzadas** usando Framer Motion, AOS y GSAP
- 📱 **Diseño responsive** que se adapta a todos los dispositivos
- ✨ **Efectos de scrollytelling** para una experiencia narrativa envolvente

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Header.jsx          # Encabezado con navegación
│   ├── Hero.jsx            # Sección hero con animaciones GSAP
│   ├── Gallery.jsx         # Galería de fotos interactiva
│   ├── Modal.jsx           # Modal para mostrar fotos y mensajes
│   ├── AudioPlayer.jsx     # Reproductor de música aleatorio
│   ├── SecretSection.jsx   # Sección secreta con validación de fecha
│   └── Footer.jsx          # Pie de página
├── App.jsx                 # Componente principal
├── main.jsx               # Punto de entrada
└── index.css              # Estilos globales con Tailwind
```

## 🎨 Paleta de Colores

- **love-pink**: #FF6B9D
- **love-purple**: #C06C84
- **love-violet**: #9D4EDD
- **love-gold**: #FFD700
- **love-rose**: #F72585
- **love-lavender**: #E0B0FF
- **love-peach**: #FFB5A7
- **love-dark**: #2D1B69

## 📝 Personalización

### Agregar tus propias fotos

1. Coloca tus imágenes en las carpetas:
   - `/public/images/thumbs/` (miniaturas)
   - `/public/images/fulls/` (imágenes completas)

2. Edita el archivo `src/components/Gallery.jsx`:
   - Actualiza el array `galleryImages`
   - Reemplaza los mensajes Lorem Ipsum con tus propios mensajes emotivos

### Agregar tu música

1. Coloca tus archivos de audio (MP3) en `/public/audio/`

2. Edita el archivo `src/components/AudioPlayer.jsx`:
   - Actualiza el array `playlist` con tus canciones

### Personalizar mensajes

- **Hero**: Edita `src/components/Hero.jsx`
- **Galería**: Edita los mensajes en `src/components/Gallery.jsx`
- **Sección Secreta**: Edita `src/components/SecretSection.jsx`

## 🎭 Tecnologías Utilizadas

- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **Framer Motion** - Animaciones React
- **AOS** - Animate On Scroll
- **GSAP** - Animaciones avanzadas
- **React Icons** - Iconos

## 🔐 Sección Secreta

La sección secreta se desbloquea ingresando la fecha: **17/08/2024**

Formatos aceptados:
- 17/08/2024
- 17-08-2024
- 2024-08-17

## 💖 Créditos

Creado con amor como regalo de cumpleaños especial.

---

**Nota**: Este es un proyecto personal diseñado para expresar amor y aprecio. Siéntete libre de personalizarlo completamente para tu ser querido.
