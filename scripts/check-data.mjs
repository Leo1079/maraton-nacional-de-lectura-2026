/**
 * Verificación de integridad de la colección — sin dependencias.
 * Corre: node scripts/check-data.mjs
 *
 * Comprueba que:
 *  · los 15 cuentos tienen texto completo y no hay textos huérfanos
 *  · los títulos y las autorías coinciden exactamente con la consigna
 *  · las etiquetas originales se conservan sin modificar
 *  · los 8 filtros del explorador tienen al menos un cuento
 *  · los seis grandes temas apuntan a cuentos existentes y cubren la colección
 */

import { STORIES, CATEGORIES, getAdjacent } from '../src/data/stories.js'
import { TEXTS } from '../src/data/texts.js'
import { WORLDS } from '../src/data/worlds.js'

/** Consigna original: título → autoría tal como fue informada. */
const CONSIGNADO = {
  'El Ruido': 'Denisse Gregori',
  'El recreo que duró 10 años': 'Joel Valentín Millican',
  'Infiltrado Terrestre': null,
  'Mi diario espacial': 'Paloma Felicitas Aguilera Navarro',
  'Zona 15': 'Paloma Felicitas Aguilera Navarro',
  'Los Rebeldes!!!': 'Paloma Felicitas Aguilera Navarro',
  '¿Acaso la humanidad se perdió?': 'Mirko Murillo',
  'El Manifiesto del Silencio': 'D. Rivadeneira',
  'El Informe del Robot': null,
  Alien: null,
  'La nave espacial': null,
  'La nave misteriosa': 'Luz Carmona',
  'Las voces que no podían hablar': 'Ludmila Castaldo',
  'Las máquinas que salvaron la Tierra': 'Mía',
  'Las voces de la ciudad': 'Alexander Valdez',
}

/** Etiquetas originales por cuento, sin reescrituras. */
const ETIQUETAS = {
  'El Ruido': ['Futuro', 'Silencio', 'Libertad', 'Libros'],
  'El recreo que duró 10 años': ['Tiempo', 'Futuro', 'Tecnología'],
  'Infiltrado Terrestre': ['Alienígenas', 'Escuela', 'Humor', 'Otros mundos'],
  'Mi diario espacial': ['Espacio', 'Tierra', 'Escuela', 'Otros mundos'],
  'Zona 15': ['Distopía', 'Silencio', 'Amistad', 'Sociedad'],
  'Los Rebeldes!!!': ['Distopía', 'Comunicación', 'Rebeldía', 'Futuro'],
  '¿Acaso la humanidad se perdió?': ['IA', 'Ciencia ficción', 'Suspenso', 'Futuro'],
  'El Manifiesto del Silencio': ['Distopía', 'Libertad', 'Silencio', 'Revolución'],
  'El Informe del Robot': ['Robots', 'Humanidad', 'Inteligencia artificial', 'Emociones'],
  Alien: ['Alienígenas', 'Tierra', 'Humor', 'Exploración'],
  'La nave espacial': ['Memoria', 'Tiempo', 'Espacio', 'Familia'],
  'La nave misteriosa': ['Espacio', 'Robots', 'Futuro', 'Aventura'],
  'Las voces que no podían hablar': ['Robots', 'Libertad', 'Música', 'Revolución'],
  'Las máquinas que salvaron la Tierra': ['Robots', 'Tierra', 'Música', 'Futuro'],
  'Las voces de la ciudad': ['Robots', 'Comunicación', 'Libertad', 'Futuro'],
}

const fail = []
const ok = (cond, msg) => {
  if (!cond) fail.push(msg)
}

// ── Colección ────────────────────────────────────────────────
ok(STORIES.length === 15, `Se esperaban 15 cuentos, hay ${STORIES.length}`)

const ids = new Set(STORIES.map((s) => s.id))
ok(ids.size === STORIES.length, 'Hay ids duplicados en la colección')

const titulos = new Set()
for (const s of STORIES) {
  ok(!titulos.has(s.title), `Título duplicado: "${s.title}"`)
  titulos.add(s.title)

  ok(s.title in CONSIGNADO, `Título no registrado en la consigna: "${s.title}"`)
  if (s.title in CONSIGNADO)
    ok(s.author === CONSIGNADO[s.title], `Autoría de "${s.title}": ${s.author} ≠ ${CONSIGNADO[s.title]}`)
  if (s.author !== null)
    ok(!/[¿]?autor|anonim|desconocid/i.test(s.author), `Autoría sospechosa en "${s.title}": "${s.author}"`)

  ok(
    JSON.stringify(s.tags) === JSON.stringify(ETIQUETAS[s.title]),
    `Etiquetas de "${s.title}" cambiaron: ${JSON.stringify(s.tags)}`,
  )
  ok(s.synopsis?.length > 60, `Falta o es demasiado corta la sinopsis de "${s.title}"`)
  ok(s.filters.length > 0, `"${s.title}" no está en ningún filtro`)
  ok(s.glyph, `Falta el glifo de "${s.title}"`)
}

// ── Textos ───────────────────────────────────────────────────
for (const id of ids) ok(Array.isArray(TEXTS[id]) && TEXTS[id].length > 0, `Sin texto: ${id}`)
for (const id of Object.keys(TEXTS)) ok(ids.has(id), `Texto huérfano: ${id}`)
for (const [id, ps] of Object.entries(TEXTS))
  for (const [i, p] of ps.entries()) ok(p.trim().length > 0, `Párrafo ${i} vacío en ${id}`)

// ── Filtros ──────────────────────────────────────────────────
ok(CATEGORIES.length === 8, `Se esperaban 8 categorías, hay ${CATEGORIES.length}`)
for (const c of CATEGORIES)
  ok(STORIES.some((s) => s.filters.includes(c.id)), `Categoría sin cuentos: ${c.label}`)
for (const s of STORIES)
  for (const f of s.filters) ok(CATEGORIES.some((c) => c.id === f), `Filtro desconocido "${f}" en ${s.title}`)

// ── Navegación del lector ────────────────────────────────────
for (const s of STORIES) {
  const { prev, next } = getAdjacent(s.id)
  ok(prev && next, `Navegación rota en "${s.title}"`)
}

// ── Temas ────────────────────────────────────────────────────
ok(WORLDS.length === 6, `Se esperaban 6 grandes temas, hay ${WORLDS.length}`)
const cubiertos = new Set()
for (const w of WORLDS) {
  ok(!!w.question, `Tema "${w.word}" sin pregunta`)
  ok(w.stories.length > 0, `Tema "${w.word}" sin cuentos`)
  for (const id of w.stories) {
    ok(ids.has(id), `Tema "${w.word}" apunta a un id inexistente: ${id}`)
    cubiertos.add(id)
  }
}
for (const id of ids) ok(cubiertos.has(id), `Cuento sin tema asociado: ${id}`)

// ── Resultado ────────────────────────────────────────────────
const totalParrafos = Object.values(TEXTS).reduce((n, p) => n + p.length, 0)
const palabras = Object.values(TEXTS)
  .flat()
  .reduce((n, p) => n + p.split(/\s+/).length, 0)

if (fail.length) {
  console.error(`\n✗ ${fail.length} problema(s):\n`)
  fail.forEach((f) => console.error('  · ' + f))
  process.exit(1)
}

console.log(`✓ colección íntegra`)
console.log(`  ${STORIES.length} cuentos · ${totalParrafos} párrafos · ~${palabras} palabras`)
console.log(`  ${CATEGORIES.length} categorías · ${WORLDS.length} grandes temas`)
console.log(`  ${STORIES.filter((s) => s.author).length} autorías informadas, ${STORIES.filter((s) => !s.author).length} sin consignar`)