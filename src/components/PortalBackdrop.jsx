import { motion } from 'motion/react'

/**
 * Fondo del hero: cielo profundo, horizonte con niebla, ciudad futurista
 * lejana en tres capas de silueta y un portal de luz en el centro.
 * Todo SVG/CSS puro para que pese poco.
 */
export default function PortalBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Degradado espacial base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 85% at 50% 108%, #1b2560 0%, #0d1330 32%, #070a16 62%, #04050c 100%)',
        }}
      />

      {/* Nebulosas violeta / azul */}
      <motion.div
        className="absolute left-1/2 top-[38%] h-[70vmin] w-[110vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
        style={{
          background:
            'radial-gradient(circle, rgba(109,63,212,.28) 0%, rgba(30,43,115,.16) 40%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute -left-[20%] top-[8%] h-[45vmin] w-[60vmin] rounded-full blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(94,231,255,.09) 0%, transparent 68%)' }}
      />
      <div
        className="absolute -right-[15%] bottom-[12%] h-[50vmin] w-[60vmin] rounded-full blur-[110px]"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,.12) 0%, transparent 70%)' }}
      />

      {/* ── Portal: aro de luz en el horizonte ── */}
      <motion.div
        className="absolute left-1/2 top-[54%] h-[34vmin] w-[62vmin] -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.86 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Halo */}
        <div
          className="absolute inset-[-28%] rounded-[50%] blur-[46px]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(94,231,255,.34) 0%, rgba(139,92,246,.24) 38%, transparent 70%)',
          }}
        />
        {/* Aro */}
        <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full" fill="none">
          <defs>
            <linearGradient id="ringStroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5ee7ff" stopOpacity=".05" />
              <stop offset="30%" stopColor="#5ee7ff" stopOpacity=".85" />
              <stop offset="62%" stopColor="#8b5cf6" stopOpacity=".8" />
              <stop offset="100%" stopColor="#5ee7ff" stopOpacity=".05" />
            </linearGradient>
            <radialGradient id="ringFill" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#cfe9ff" stopOpacity=".30" />
              <stop offset="45%" stopColor="#6d3fd4" stopOpacity=".18" />
              <stop offset="100%" stopColor="#04050c" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="200" cy="110" rx="198" ry="108" fill="url(#ringFill)" />
          <ellipse cx="200" cy="110" rx="198" ry="108" stroke="url(#ringStroke)" strokeWidth="1.4" />
        </svg>
        {/* Pulso del portal */}
        <motion.div
          className="absolute inset-0 rounded-[50%] border border-cyan/25"
          animate={{ scale: [1, 1.05, 1], opacity: [0.35, 0, 0.35] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* ── Ciudad lejana: tres capas de silueta ── */}
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-[42vh] min-h-[220px] w-full"
        fill="none"
      >
        <defs>
          <linearGradient id="skyFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#131b45" stopOpacity=".55" />
            <stop offset="100%" stopColor="#0a0f28" stopOpacity=".95" />
          </linearGradient>
          <linearGradient id="skyMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0c1233" stopOpacity=".85" />
            <stop offset="100%" stopColor="#060911" />
          </linearGradient>
          <linearGradient id="skyNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#05070f" stopOpacity=".98" />
            <stop offset="100%" stopColor="#04050c" />
          </linearGradient>
        </defs>

        {/* Capa lejana */}
        <path fill="url(#skyFar)" d="M0 190h52v-38h34v38h44v-66h26v66h58v-26h40v26h64v-84h30v84h72v-44h28v44h46v-20h58v20h60v-58h24v58h56v-34h36v34h70v-72h22v72h64v-30h48v30h58v-50h26v50h66v-24h40v24h74v130H0z" />
        {/* Capa media */}
        <path fill="url(#skyMid)" d="M0 236h74v-52h40v52h72v-30h34v30h78v-74h28v74h64v-40h44v40h88v-62h26v62h70v-28h48v28h76v-80h30v80h82v-34h36v34h62v-52h28v52h80v-24h50v24h88v84H0z" />
        {/* Capa cercana */}
        <path fill="url(#skyNear)" d="M0 276h96v-64h46v64h96v-38h38v38h112v-92h32v92h104v-44h48v44h96v-60h30v60h108v-36h52v36h92v-70h34v70h112v-46h44v46h104v44H0z" />
      </svg>

      {/* Ventanas encendidas de la ciudad */}
      <div
        className="absolute inset-x-0 bottom-0 h-[26vh] min-h-[150px]"
        style={{
          backgroundImage:
            'radial-gradient(1.4px 1.4px at 12% 62%, rgba(94,231,255,.5), transparent 100%), radial-gradient(1.2px 1.2px at 22% 78%, rgba(253,246,232,.42), transparent 100%), radial-gradient(1.5px 1.5px at 31% 55%, rgba(94,231,255,.38), transparent 100%), radial-gradient(1.2px 1.2px at 43% 74%, rgba(139,92,246,.5), transparent 100%), radial-gradient(1.4px 1.4px at 55% 66%, rgba(253,246,232,.35), transparent 100%), radial-gradient(1.2px 1.2px at 66% 82%, rgba(94,231,255,.42), transparent 100%), radial-gradient(1.5px 1.5px at 77% 60%, rgba(139,92,246,.42), transparent 100%), radial-gradient(1.2px 1.2px at 88% 76%, rgba(253,246,232,.38), transparent 100%), radial-gradient(1.3px 1.3px at 95% 68%, rgba(94,231,255,.4), transparent 100%)',
          maskImage: 'linear-gradient(to top, #000 0%, transparent 92%)',
          WebkitMaskImage: 'linear-gradient(to top, #000 0%, transparent 92%)',
        }}
      />

      {/* Niebla del horizonte */}
      <div
        className="absolute inset-x-0 bottom-0 h-[30vh]"
        style={{
          background:
            'linear-gradient(to top, rgba(4,5,12,.98) 8%, rgba(9,13,34,.6) 46%, transparent 100%)',
        }}
      />

      {/* Viñeta superior para que el nav se lea */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-void/90 to-transparent" />
    </div>
  )
}