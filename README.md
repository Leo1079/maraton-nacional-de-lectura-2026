# Del futuro al más allá

> *Cuando la literatura imagina otros mundos posibles*

Landing page de la colección de cuentos escrita por estudiantes de **1.º año C**
en el marco de la **Maratón Nacional de Lectura 2026**.

Quince cuentos sobre futuros posibles, tecnología, inteligencia artificial,
viajes espaciales, viajes en el tiempo, pérdida de la comunicación, memoria,
robots y el futuro de la humanidad.

**Prof. María de los Ángeles Rearte**

---

## Puesta en marcha

```bash
npm install
npm run dev      # desarrollo en http://localhost:5173
npm run build    # build de producción en dist/
npm run preview  # previsualiza el build
```

## Estructura

```
src/
├─ data/
│  ├─ site.js       Datos del evento y de la introducción
│  ├─ stories.js    Catálogo: los 15 cuentos, sus etiquetas y filtros
│  ├─ texts.js      Textos completos, un array de párrafos por cuento
│  └─ worlds.js     Los seis grandes temas
├─ components/
│  ├─ Starfield.jsx       Campo estelar en canvas con paralaje y modo warp
│  ├─ PortalBackdrop.jsx  Ciudad futurista y portal de la portada
│  ├─ Nav.jsx             Navegación (desplegable en móvil)
│  ├─ Hero.jsx            Portada
│  ├─ Intro.jsx           Sección editorial
│  ├─ StoryExplorer.jsx   Explorador con filtros por categoría
│  ├─ StoryCard.jsx       Ficha de archivo
│  ├─ StoryReader.jsx     Lector fullscreen
│  ├─ StoryGlyph.jsx      Íconos lineales, uno por cuento
│  ├─ Worlds.jsx          Otros mundos
│  ├─ CenterQuote.jsx     Frase central
│  ├─ Credits.jsx         Créditos
│  └─ ui/Reveal.jsx       Aparición progresiva, encabezados y contador
└─ index.css       Tokens de diseño, tipografías y utilidades
```

## Cómo editar el contenido

Todo el contenido vive en `src/data/`. No hace falta tocar los componentes.

**Para cambiar o corregir un cuento**, editá `src/data/texts.js`. Cada entrada
es un array y **cada elemento es un párrafo**:

```js
export const TEXTS = {
  'el-ruido': [
    'Primer párrafo del cuento.',
    'Segundo párrafo del cuento.',
  ],
}
```

**Para cambiar título, autoría, etiquetas o glifo**, editá `src/data/stories.js`.
El campo `filters` decide en qué categorías del explorador aparece cada cuento
(valores posibles en `CATEGORIES`); `glyph` elige el ícono (en `StoryGlyph.jsx`);
`hue` es el tono de color de la ficha.

## Verificar los datos

```bash
node scripts/check-data.mjs
```

Comprueba que los 15 cuentos tengan texto, que los ids no estén duplicados ni
rotos, que las etiquetas originales se conserven, que los 8 filtros tengan
historias y que los 6 grandes temas cubran toda la colección.

## Decisiones de diseño

- **Mobile-first.** La base del CSS es el móvil y las variantes `sm:` / `lg:`
  agregan densidad. El nav pasa a la versión de escritorio recién en 1024 px.
- **Sobre el `hover`.** Tailwind v4 ya envuelve `hover:` en
  `@media (hover: hover)`. Las pocas reglas escritas a mano están dentro de esa
  misma consulta, para que en táctil el estado no quede pegado al tocar.
- **Tipografías** autoalojadas vía `@fontsource-variable` (sin peticiones a
  terceros): Cormorant Garamond para títulos, Source Serif 4 para leer los
  cuentos, Inter para la interfaz y JetBrains Mono para el lenguaje de archivo.
- **Accesibilidad.** `prefers-reduced-motion` respetado en toda la animación,
  foco atrapado dentro del lector, navegación por teclado (`Esc`, `←`, `→`),
  áreas táctiles de 44 px y respeto de las muescas del dispositivo.
- **Fondo cósmico en canvas** en lugar de una librería de 3D: el campo estelar
  tiene paralaje por scroll y un modo *warp* que se activa al llegar a los
  créditos, como si el visitante viajara hacia otro mundo.

## Stack

React · Vite · Tailwind CSS v4 · Motion · Lucide