import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const data = [
  {
    id: faker.datatype.uuid(),
    titulo: "El Origen de XBOX : La Historia en 1 Video",
    descripcion: "Prueba",
    seccion: "Videojuegos",
    destacado: true,
    url: 'https://www.youtube.com/watch?v=uJzdQPBOvdY&list=LL&index=17&pp=gAQBiAQB',
  },
  {
    id: faker.datatype.uuid(),
    titulo: "Colegio Gringo vs. Colegio Latino",
    descripcion: "Prueba",
    seccion: "Entretenimiento",
    destacado: true,
    url: 'https://www.youtube.com/watch?v=YEJNOGV64oA&list=LL&index=23&t=3s&pp=gAQBiAQB',
  },
  {
    id: faker.datatype.uuid(),
    titulo: "CALL OF DUTY ZOMBIES: La Saga en 1 Video",
    descripcion: "Prueba",
    seccion: "Videojuegos",
    destacado: true,
    url: 'https://www.youtube.com/watch?v=NqPDick4d0s&list=LL&index=28&t=1651s&pp=gAQBiAQB',
  },
  {
    id: faker.datatype.uuid(),
    titulo: "Productos ORIGINALES vs GENÉRICOS | ¿Conviene gastar más?",
    descripcion: "Prueba",
    seccion: "Entretenimiento",
    destacado: false,
    url: 'https://www.youtube.com/watch?v=YfmbmUJ0aXI&list=LL&index=73&pp=gAQBiAQB',
  },
  {
    id: faker.datatype.uuid(),
    titulo: "Gnarls Barkley - Crazy (Official Video)",
    descripcion: "Prueba",
    seccion: "Musica",
    destacado: false,
    url: 'https://www.youtube.com/watch?v=-N4jf6rtyuw&list=LL&index=37&pp=gAQBiAQB',
  },
  {
    id: faker.datatype.uuid(),
    titulo: "MASE - Psycho! (Lyrics) i might just go psycho",
    descripcion: "Prueba",
    seccion: "Musica",
    destacado: true,
    url: 'https://www.youtube.com/watch?v=PjCmqWzXH_0&list=LL&index=38&pp=gAQBiAQB',
  },
  {
    id: faker.datatype.uuid(),
    titulo: "Facundo y Súper Escorpión Al Volante!",
    descripcion: "Prueba",
    seccion: "Entretenimiento",
    destacado: true,
    url: 'https://www.youtube.com/watch?v=w7iZs9noN1A&list=LL&index=79&pp=gAQBiAQB',
  }
];

export default data;

