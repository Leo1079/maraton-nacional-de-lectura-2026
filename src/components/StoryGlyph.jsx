/**
 * Glifos lineales: un ícono conceptual por cuento, dibujado en SVG
 * (trazo fino, glow sutil) para que cada ficha tenga un elemento visual
 * propio sin depender de imágenes externas.
 */

const S = ({ children, ...rest }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.15"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    {children}
  </svg>
)

const GLYPHS = {
  // 01 El Ruido — ondas de sonido apagándose
  sound: (
    <S>
      <path d="M6 32h6l7-12v24l-7-12H6z" />
      <path d="M27 24a11 11 0 0 1 0 16" opacity=".75" />
      <path d="M35 18a19 19 0 0 1 0 28" opacity=".45" />
      <path d="M44 12a28 28 0 0 1 0 40" opacity=".2" />
      <path d="M24 46l34 8" className="stroke-[1.6]" opacity=".55" />
    </S>
  ),
  // 02 El recreo que duró 10 años — reloj roto
  clock: (
    <S>
      <circle cx="32" cy="34" r="20" />
      <path d="M32 22v12l8 6" />
      <path d="M32 34L20 16" opacity=".5" />
      <path d="M46 10l6-6M54 18l6-2M10 18l-6-2" opacity=".7" />
      <path d="M8 52c8 4 16 4 24 0s16-4 24 0" opacity=".35" />
    </S>
  ),
  // 03 Infiltrado Terrestre — observador extraterrestre en aula
  infiltrado: (
    <S>
      <ellipse cx="32" cy="20" rx="9" ry="13" />
      <path d="M25 14c3-5 11-5 14 0" opacity=".55" />
      <circle cx="28.5" cy="19" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="35.5" cy="19" r="1.5" fill="currentColor" stroke="none" />
      <path d="M24 30c-4 4-6 10-6 16M40 30c4 4 6 10 6 16" opacity=".7" />
      <path d="M12 56h40" opacity=".5" />
      <path d="M16 46c5 3 11 3 16 0s11-3 16 0" opacity=".35" />
    </S>
  ),
  // 04 Mi diario espacial — bitácora y planeta
  diary: (
    <S>
      <rect x="12" y="12" width="32" height="42" rx="2" />
      <path d="M18 12v42" opacity=".6" />
      <path d="M23 22h14M23 29h14M23 36h9" opacity=".5" />
      <circle cx="49" cy="45" r="9" />
      <path d="M40 45h18M49 36c3 3 3 12 0 18M49 36c-3 3-3 12 0 18" opacity=".55" />
    </S>
  ),
  // 05 Zona 15 — zona vigilada, boca sellada
  zone: (
    <S>
      <rect x="8" y="8" width="48" height="48" rx="3" opacity=".55" />
      <path d="M8 24h48M8 40h48M24 8v48M40 8v48" opacity=".28" />
      <path d="M22 34c0-6 4-10 10-10s10 4 10 10v4a10 10 0 0 1-20 0z" opacity=".8" />
      <path d="M22 36h20" className="stroke-[1.8]" />
      <path d="M14 20h6M44 44h6" opacity=".5" />
    </S>
  ),
  // 06 Los Rebeldes!!! — megáfono
  rebels: (
    <S>
      <path d="M14 26h12l16-10v32L26 38H14z" />
      <path d="M26 38v10a4 4 0 0 0 8 0v-6" opacity=".7" />
      <path d="M48 20c4 4 4 20 0 24M54 14c7 7 7 29 0 36" opacity=".5" />
      <path d="M10 20v18" opacity=".45" />
    </S>
  ),
  // 07 ¿Acaso la humanidad se perdió? — alerta / registro
  alert: (
    <S>
      <path d="M32 8l22 40H10z" />
      <path d="M32 24v12" className="stroke-[1.9]" />
      <circle cx="32" cy="43" r="1.8" fill="currentColor" stroke="none" />
      <path d="M4 54c5 3 9 3 14 0M30 54c5 3 9 3 14 0M50 54c3 2 6 2 10 0" opacity=".3" />
    </S>
  ),
  // 08 El Manifiesto del Silencio — pergamino
  manifest: (
    <S>
      <path d="M16 12h24l8 8v32H16z" />
      <path d="M40 12v8h8" opacity=".55" />
      <path d="M22 28h20M22 34h20M22 40h13" opacity=".55" />
      <path d="M22 22h6" opacity=".3" />
    </S>
  ),
  // 09 El Informe del Robot — robot emitiendo un informe
  report: (
    <S>
      <rect x="16" y="16" width="32" height="30" rx="5" />
      <path d="M32 10v6M26 26h2M36 26h2" opacity=".8" />
      <circle cx="27" cy="27" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="37" cy="27" r="1.6" fill="currentColor" stroke="none" />
      <path d="M26 37h12" opacity=".7" />
      <path d="M22 52h20" opacity=".4" />
      <path d="M8 26H4M60 26h-4M8 38H4M60 38h-4" opacity=".4" />
    </S>
  ),
  // 10 Alien — mirada sobre lo cotidiano
  alien: (
    <S>
      <path d="M6 32s10-12 26-12 26 12 26 12-10 12-26 12S6 32 6 32z" />
      <circle cx="32" cy="32" r="9" />
      <circle cx="32" cy="32" r="3.6" fill="currentColor" stroke="none" opacity=".8" />
      <path d="M18 50c6 4 22 4 28 0" opacity=".3" />
    </S>
  ),
  // 11 La nave espacial — nave de los recuerdos
  memoryship: (
    <S>
      <path d="M14 42l8-18h20l8 18-8 8H22z" />
      <circle cx="32" cy="30" r="5" opacity=".8" />
      <path d="M14 42h36" opacity=".4" />
      <path d="M32 12v6M20 16l3 5M44 16l-3 5" opacity=".6" />
      <path d="M46 52c-6 3-26 3-32 0" opacity=".3" />
    </S>
  ),
  // 12 La nave misteriosa — ciudad flotante
  city: (
    <S>
      <path d="M8 40h48" opacity=".5" />
      <path d="M14 40V24l10-6 10 6v16" opacity=".8" />
      <path d="M34 40V28h16v12" opacity=".65" />
      <path d="M20 34h2M28 34h2M40 34h2M46 34h2" opacity=".6" />
      <path d="M16 48c8 4 24 4 32 0" opacity=".3" />
      <path d="M10 14l2 4M54 12l-2 4" opacity=".4" />
    </S>
  ),
  // 13 Las voces que no podían hablar — robot y partitura
  voices: (
    <S>
      <circle cx="24" cy="30" r="13" />
      <path d="M18 34c3 3 9 3 12 0" opacity=".8" />
      <circle cx="19.5" cy="25.5" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="28.5" cy="25.5" r="1.6" fill="currentColor" stroke="none" />
      <path d="M44 40V22l10-4v18" opacity=".85" />
      <ellipse cx="41.5" cy="41" rx="3.5" ry="2.8" opacity=".7" />
      <ellipse cx="51.5" cy="39" rx="3.5" ry="2.8" opacity=".7" />
    </S>
  ),
  // 14 Las máquinas que salvaron la Tierra — máquina y brote
  machines: (
    <S>
      <circle cx="32" cy="38" r="17" opacity=".8" />
      <path d="M15 38h34M32 21v34" opacity=".35" />
      <path d="M32 6v8M32 62v-6M6 38h8M58 38h-6" opacity=".5" />
      <path d="M32 32c-4-4-9-3-9 1 0 3 5 5 9 3 4 2 9 0 9-3 0-4-5-5-9-1z" opacity=".8" />
    </S>
  ),
  // 15 Las voces de la ciudad — antena / ondas
  antenna: (
    <S>
      <path d="M32 34v22" opacity=".8" />
      <path d="M22 56h20" opacity=".6" />
      <circle cx="32" cy="14" r="4" />
      <path d="M24 22c-4 4-4 12 0 16M40 22c4 4 4 12 0 16" opacity=".7" />
      <path d="M17 15c-6 7-6 21 0 28M47 15c6 7 6 21 0 28" opacity=".4" />
    </S>
  ),
}

export default function StoryGlyph({ name, className = '' }) {
  const glyph = GLYPHS[name] ?? GLYPHS.sound
  return <span className={className}>{glyph}</span>
}