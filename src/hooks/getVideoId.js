// Expresión regular para buscar el ID del video en la URL de YouTube
const YOUTUBE_VIDEO_ID_REGEX = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^?&]+)/;


// Función para obtener el ID de un enlace de YouTube
const getVideoId = (url) => {
  // Intentar encontrar el ID del video en la URL
  const match = url.match(YOUTUBE_VIDEO_ID_REGEX);

  // Si se encuentra un ID válido, devolverlo, de lo contrario, devolver null
  if (match && match[1]) {
    return match[1];
  }
    return null;
};

export default getVideoId;