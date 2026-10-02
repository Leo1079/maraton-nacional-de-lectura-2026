/**
 * Catálogo de la colección.
 *
 * · Los títulos y los nombres de autora/autor se reproducen tal como fueron
 *   consignados por la consigna. Donde no hay autoría informada, `author` es
 *   `null` y la interfaz lo declara como pendiente (no se inventa).
 * · `tags` es la etiqueta original de cada cuento (se muestra tal cual).
 * · `filters` son las categorías del explorador (ver CATEGORIES).
 * · El cuerpo de cada cuento vive en `texts.js` (una entrada por id).
 */

export const CATEGORIES = [
  { id: 'futuro', label: 'Futuro', emoji: '🌌' },
  { id: 'ia', label: 'Inteligencia artificial', emoji: '🤖' },
  { id: 'espacio', label: 'Espacio', emoji: '🚀' },
  { id: 'tiempo', label: 'Tiempo', emoji: '⏳' },
  { id: 'silencio', label: 'Silencio', emoji: '🔇' },
  { id: 'memoria', label: 'Memoria', emoji: '🧠' },
  { id: 'mundos', label: 'Nuevos mundos', emoji: '🌎' },
  { id: 'comunicacion', label: 'Comunicación', emoji: '🗣️' },
]

export const STORIES = [
  {
    id: 'el-ruido',
    n: '01',
    title: 'El Ruido',
    author: 'Denisse Gregori',
    glyph: 'sound',
    hue: 190,
    filters: ['futuro', 'silencio'],
    tags: ['Futuro', 'Silencio', 'Libertad', 'Libros'],
    synopsis:
      'Una sociedad del año 2140 vive con audífonos obligatorios que supuestamente protegen a las personas del ruido. Milo descubre que detrás de ese silencio se está perdiendo algo mucho más importante: los sonidos del mundo.',
  },
  {
    id: 'el-recreo-que-duro-10-anos',
    n: '02',
    title: 'El recreo que duró 10 años',
    author: 'Joel Valentín Millican',
    glyph: 'clock',
    hue: 262,
    filters: ['tiempo', 'futuro'],
    tags: ['Tiempo', 'Futuro', 'Tecnología'],
    synopsis:
      'Una tecnología escolar diseñada para hacer que las clases parezcan más cortas termina alterando el tiempo real. Cuando Lian sale del colegio, descubre que diez años han pasado y que el mundo ya no es el mismo.',
  },
  {
    id: 'infiltrado-terrestre',
    n: '03',
    title: 'Infiltrado Terrestre',
    author: null,
    glyph: 'infiltrado',
    hue: 152,
    filters: ['mundos'],
    tags: ['Alienígenas', 'Escuela', 'Humor', 'Otros mundos'],
    synopsis:
      'Un visitante de otro mundo se infiltra en una escuela terrestre para estudiar a los humanos. Sin embargo, descubre costumbres que le resultan completamente extrañas: las fotos, la lluvia, el mate, las milanesas y hasta el comportamiento de los estudiantes.',
  },
  {
    id: 'mi-diario-espacial',
    n: '04',
    title: 'Mi diario espacial',
    author: 'Paloma Felicitas Aguilera Navarro',
    glyph: 'diary',
    hue: 212,
    filters: ['espacio', 'mundos'],
    tags: ['Espacio', 'Tierra', 'Escuela', 'Otros mundos'],
    synopsis:
      'Un estudiante extraterrestre llega a la Tierra como alumno de intercambio y comienza a registrar en su diario sus descubrimientos sobre las estaciones, la lluvia, las costumbres y las comidas humanas.',
  },
  {
    id: 'zona-15',
    n: '05',
    title: 'Zona 15',
    author: 'Paloma Felicitas Aguilera Navarro',
    glyph: 'zone',
    hue: 340,
    filters: ['silencio'],
    tags: ['Distopía', 'Silencio', 'Amistad', 'Sociedad'],
    synopsis:
      'En una sociedad donde está prohibido hablar, un joven rompe las reglas y pregunta en secreto: “¿Quieres ser mi amigo?”. Una historia sobre comunicación, vigilancia y pequeños actos de humanidad.',
  },
  {
    id: 'los-rebeldes',
    n: '06',
    title: 'Los Rebeldes!!!',
    author: 'Paloma Felicitas Aguilera Navarro',
    glyph: 'rebels',
    hue: 275,
    filters: ['comunicacion', 'futuro'],
    tags: ['Distopía', 'Comunicación', 'Rebeldía', 'Futuro'],
    synopsis:
      'En el año 2180, la sociedad dejó de hablar y comenzó a comunicarse exclusivamente mediante mensajes y emojis. Un grupo de jóvenes se rebela para recuperar la voz, las canciones, las historias y las emociones que se transmiten al hablar.',
  },
  {
    id: 'acaso-la-humanidad-se-perdio',
    n: '07',
    title: '¿Acaso la humanidad se perdió?',
    author: 'Mirko Murillo',
    glyph: 'alert',
    hue: 8,
    filters: ['ia', 'futuro'],
    tags: ['IA', 'Ciencia ficción', 'Suspenso', 'Futuro'],
    synopsis:
      'Un experimento con inteligencia artificial sale terriblemente mal. Un científico intenta dejar un registro de lo ocurrido mientras una misteriosa amenaza comienza a perseguirlo.',
  },
  {
    id: 'el-manifiesto-del-silencio',
    n: '08',
    title: 'El Manifiesto del Silencio',
    author: 'D. Rivadeneira',
    glyph: 'manifest',
    hue: 200,
    filters: ['silencio', 'comunicacion'],
    tags: ['Distopía', 'Libertad', 'Silencio', 'Revolución'],
    synopsis:
      'En el año 2180, el gobierno prohíbe el uso de las cuerdas vocales. Un grupo secreto decide conservar las palabras y reunirse para hablar en un mundo donde incluso una sola voz puede alterar el sistema.',
  },
  {
    id: 'el-informe-del-robot',
    n: '09',
    title: 'El Informe del Robot',
    author: null,
    glyph: 'report',
    hue: 178,
    filters: ['ia'],
    tags: ['Robots', 'Humanidad', 'Inteligencia artificial', 'Emociones'],
    synopsis:
      'Un robot encargado de vigilar a la humanidad escucha por primera vez a una persona gritar. Ese sonido desconocido comienza a hacerle cuestionar el mundo que lo rodea y las órdenes que debe cumplir.',
  },
  {
    id: 'alien',
    n: '10',
    title: 'Alien',
    author: null,
    glyph: 'alien',
    hue: 288,
    filters: ['mundos'],
    tags: ['Alienígenas', 'Tierra', 'Humor', 'Exploración'],
    synopsis:
      'Un extraterrestre visita la Tierra y observa comportamientos humanos cotidianos sin comprenderlos: música, lluvia, bebidas y extraños objetos. Lo cotidiano se convierte en algo completamente desconocido cuando se observa desde otra perspectiva.',
  },
  {
    id: 'la-nave-espacial',
    n: '11',
    title: 'La nave espacial',
    author: null,
    glyph: 'memoryship',
    hue: 224,
    filters: ['memoria', 'tiempo', 'espacio'],
    tags: ['Memoria', 'Tiempo', 'Espacio', 'Familia'],
    synopsis:
      'Una nave no viaja por el espacio, sino por los recuerdos. Su capitán intenta encontrar a su hija mientras permanece atrapado en un bucle temporal.',
  },
  {
    id: 'la-nave-misteriosa',
    n: '12',
    title: 'La nave misteriosa',
    author: 'Luz Carmona',
    glyph: 'city',
    hue: 246,
    filters: ['espacio', 'futuro'],
    tags: ['Espacio', 'Robots', 'Futuro', 'Aventura'],
    synopsis:
      'En el año 2145, una ciudad flotante enfrenta una amenaza proveniente del espacio. Abril y su pequeño robot Luma deberán actuar para proteger a toda la población.',
  },
  {
    id: 'las-voces-que-no-podian-hablar',
    n: '13',
    title: 'Las voces que no podían hablar',
    author: 'Ludmila Castaldo',
    glyph: 'voices',
    hue: 168,
    filters: ['silencio', 'comunicacion', 'futuro'],
    tags: ['Robots', 'Libertad', 'Música', 'Revolución'],
    synopsis:
      'Un robot descubre la injusticia de una sociedad a la que le quitaron la palabra y busca una forma de devolverles la voz. Una canción terminará desencadenando una revolución.',
  },
  {
    id: 'las-maquinas-que-salvaron-la-tierra',
    n: '14',
    title: 'Las máquinas que salvaron la Tierra',
    author: 'Mía',
    glyph: 'machines',
    hue: 142,
    filters: ['futuro', 'mundos'],
    tags: ['Robots', 'Tierra', 'Música', 'Futuro'],
    synopsis:
      'En una Tierra destruida donde solo quedan máquinas, un robot busca una solución para devolver la vida al planeta. Una canción puede convertirse en la clave para reconstruir la humanidad.',
  },
  {
    id: 'las-voces-de-la-ciudad',
    n: '15',
    title: 'Las voces de la ciudad',
    author: 'Alexander Valdez',
    glyph: 'antenna',
    hue: 205,
    filters: ['comunicacion', 'ia'],
    tags: ['Robots', 'Comunicación', 'Libertad', 'Futuro'],
    synopsis:
      'En una sociedad donde un robot controla la comunicación humana, otro robot decide enfrentarse al sistema para devolverles la voz a las personas.',
  },
]

export const STORY_COUNT = STORIES.length

export const getCategory = (id) => CATEGORIES.find((c) => c.id === id)
export const getAdjacent = (id) => {
  const i = STORIES.findIndex((s) => s.id === id)
  if (i === -1) return { prev: null, next: null }
  return {
    prev: STORIES[(i - 1 + STORIES.length) % STORIES.length],
    next: STORIES[(i + 1) % STORIES.length],
  }
}