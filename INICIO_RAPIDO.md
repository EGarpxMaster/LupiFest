# 🚀 INICIO RÁPIDO - LupiFest Birthday Gift

## ✅ El proyecto está listo y funcionando!

### 🌐 Ver el proyecto
El servidor de desarrollo está corriendo en:
**http://localhost:5173/**

Abre tu navegador y visita esa URL para ver tu regalo de cumpleaños.

---

## 📝 3 PASOS PARA PERSONALIZAR

### 1️⃣ Agrega tus FOTOS (5 minutos)
```bash
# Coloca tus fotos aquí:
public/images/thumbs/01.jpg    # Miniatura (recomendado: 400x300px)
public/images/thumbs/02.jpg
# ... hasta 06.jpg

public/images/fulls/01.jpg     # Imagen completa (recomendado: 1200x900px)
public/images/fulls/02.jpg
# ... hasta 06.jpg
```

**Nota:** Actualmente hay placeholders SVG. Reemplázalos con tus fotos JPG/PNG.

### 2️⃣ Escribe tus MENSAJES EMOTIVOS (10-15 minutos)
Abre: `src/components/Gallery.jsx`

Busca la línea 7 y edita cada `message`:
```javascript
{
  id: 1,
  // ...
  message: '¡AQUÍ ESCRIBE TU MENSAJE EMOTIVO!' // ⬅️ EDITA ESTO
}
```

Haz lo mismo para las 6 fotos.

### 3️⃣ Agrega tu MÚSICA (5 minutos)
```bash
# Coloca archivos MP3 en:
public/audio/cancion1.mp3
public/audio/cancion2.mp3
public/audio/cancion3.mp3
```

Luego edita: `src/components/AudioPlayer.jsx` (línea 7):
```javascript
const playlist = [
  {
    id: 1,
    title: 'Nombre de la Canción',
    artist: 'Artista',
    url: '/audio/cancion1.mp3'  // ⬅️ EDITA ESTO
  },
  // Agrega más canciones...
];
```

---

## 🎁 EXTRAS OPCIONALES

### Personalizar mensaje de la Sección Secreta
Edita: `src/components/SecretSection.jsx` (línea 90+)

### Cambiar título principal
Edita: `src/components/Hero.jsx` (línea 43)

---

## 🔑 DATO IMPORTANTE

**Fecha secreta:** 17/08/2024
Esta es la fecha de aniversario que desbloquea la sección especial.

---

## 🛠️ COMANDOS ÚTILES

```bash
# Ver el proyecto (ya está corriendo)
npm run dev

# Detener el servidor
Ctrl + C en la terminal

# Construir para producción
npm run build

# El proyecto construido estará en: dist/
```

---

## 🎨 CARACTERÍSTICAS INCLUIDAS

✅ Header con navegación smooth
✅ Hero con animaciones GSAP
✅ Galería de 6 fotos con modales
✅ Reproductor de música aleatorio
✅ Sección secreta (fecha: 17/08/2024)
✅ Footer con animaciones
✅ Corazones flotantes de fondo
✅ Paleta de colores vibrante y emotiva
✅ Diseño 100% responsive
✅ Animaciones de scrollytelling

---

## 📱 PRUEBA EN TU CELULAR

1. En la terminal verás: `Network: use --host to expose`
2. Ejecuta: `npm run dev -- --host`
3. Verás una IP como: `http://192.168.x.x:5173`
4. Abre esa URL en tu celular (misma red WiFi)

---

## 🎉 ¡LISTO!

Tu proyecto está completamente funcional.
Solo personaliza las fotos, mensajes y música.

**Todo lo demás ya está configurado y funcionando.**

💕 ¡Disfruta creando este regalo especial! 💕

---

### 📚 Más información
Lee `GUIA_COMPLETA.md` para detalles avanzados.
