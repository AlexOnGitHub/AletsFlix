import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const POSTS = [
  {
    title: "El curso de Oracle One Next Education impartido por Alura es todo un exitó!",
    cover: "OracleONE"
  },
  {
    title: "Mira el nuevo trailer del DLC para RE4 Remake",
    cover: "RE4DLC"
  },
  {
    title: "El live action de One Piece es todo un exitó!",
    cover: "OnePieceLA"
  },
  {
    title: "Novedades para Cyberpunk 2077!",
    cover: "CyberPunk"
  },
  {
    title: "Shakira Lanza nueva canción",
    cover: "ShakiraFuerzaRegida"
  },
  {
    title: "Nuevo titulo: Lies Of P",
    cover: "LiesOfP"
  },
  {
    title: "El juego prometedor de XBOX",
    cover: "Starfield"
  },
  {
    title: "Mira la presentación del nuevo Iphone 15",
    cover: "Iphone15"
  },
  {
    title: "Proximo estreno: La Monja 2",
    cover: "Monja2"
  },
  {
    title: "Música para relajarte",
    cover: "Lofi"
  },
  {
    title: "Mira el resultado del partído Cruz Azul vs Mazatlan",
    cover: "MvsCA"
  },
  {
    title: "Nuevo exitó musical de Ricky Martin & Christian Nodal",
    cover: "Ricky"
  },
  {
    title: "Nuevo trailer de Aquaman 2: El Reino Perdido",
    cover: "Aquaman"
  },
  {
    title: "Mira la pelicula del videojuego Five Nights at Freddy's",
    cover: "FiveNights"
  },
  {
    title: "Así fue la asamblea sobre el aumento al aguinaldo en México",
    cover: "Noticia"
  },
];


const posts = POSTS.map((post, index) => ({
  id: faker.datatype.uuid(),
  cover: `/assets/images/covers/${post.cover}.png`,
  title: post.title,
  createdAt: faker.date.past(),
  view: faker.datatype.number(),
  comment: faker.datatype.number(),
  share: faker.datatype.number(),
  favorite: faker.datatype.number(),
  author: {
    name: faker.name.fullName(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
}));


export default posts;
