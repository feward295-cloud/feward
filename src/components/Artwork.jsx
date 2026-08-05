// Ilustrações originais em SVG — sem depender de imagens externas e sem usar
// nenhum personagem ou logo de terceiros. Cada uma representa o tema da
// comunidade/categoria de forma genérica.

function Base({ children, from, to }) {
  return (
    <svg className="art-svg" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`g-${from}-${to}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="300" height="200" fill={`url(#g-${from}-${to})`} />
      {children}
    </svg>
  )
}

function Jogos() {
  return (
    <Base from="#1b1030" to="#c23b6e">
      <g opacity="0.18">
        {[20, 60, 100, 140, 180, 220, 260].map((x) => (
          <rect key={x} x={x} y="10" width="10" height="10" fill="#fff" />
        ))}
      </g>
      <rect x="80" y="85" width="140" height="55" rx="22" fill="#0f0b1c" opacity="0.85" />
      <circle cx="118" cy="112" r="9" fill="#3b63ff" />
      <rect x="112" y="106" width="12" height="4" fill="#f3f1ea" />
      <rect x="116" y="102" width="4" height="12" fill="#f3f1ea" />
      <circle cx="188" cy="105" r="7" fill="#ff3040" />
      <circle cx="206" cy="118" r="7" fill="#ffb703" />
    </Base>
  )
}

function FanArte() {
  return (
    <Base from="#0b1957" to="#1a3fbf">
      <ellipse cx="150" cy="110" rx="70" ry="46" fill="#0d1230" opacity="0.55" />
      <circle cx="120" cy="95" r="10" fill="#ff3040" />
      <circle cx="150" cy="85" r="10" fill="#ffb703" />
      <circle cx="180" cy="95" r="10" fill="#3ee6a0" />
      <circle cx="165" cy="120" r="10" fill="#3b63ff" />
      <path d="M110 130 Q160 175 205 120" stroke="#f3f1ea" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.8" />
    </Base>
  )
}

function Circo() {
  return (
    <Base from="#ffb703" to="#4361ee">
      <polygon points="150,35 210,140 90,140" fill="#ff3040" opacity="0.9" />
      <polygon points="150,35 175,140 125,140" fill="#f3f1ea" opacity="0.85" />
      <circle cx="150" cy="30" r="7" fill="#f3f1ea" />
      <rect x="70" y="140" width="160" height="14" rx="4" fill="#0d1230" opacity="0.7" />
    </Base>
  )
}

function Animes() {
  return (
    <Base from="#232526" to="#414345">
      <path d="M90 70 h120 a14 14 0 0 1 14 14 v40 a14 14 0 0 1 -14 14 h-70 l-24 22 v-22 h-26 a14 14 0 0 1 -14 -14 v-40 a14 14 0 0 1 14 -14 z" fill="#f3f1ea" opacity="0.92" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={126 + i * 24} cy="104" r="4" fill="#232526" />
      ))}
      <g opacity="0.8" fill="#ffd23f">
        <polygon points="235,40 240,52 252,52 242,60 246,72 235,64 224,72 228,60 218,52 230,52" />
        <polygon points="60,120 63,128 71,128 65,133 67,141 60,136 53,141 55,133 49,128 57,128" />
      </g>
    </Base>
  )
}

function Filmes() {
  return (
    <Base from="#020024" to="#00d4ff">
      <rect x="75" y="65" width="150" height="95" rx="8" fill="#0a0d1f" opacity="0.85" />
      {[85, 115, 145, 175, 205].map((x) => (
        <g key={x}>
          <rect x={x} y="65" width="10" height="10" fill="#f3f1ea" opacity="0.7" />
          <rect x={x} y="150" width="10" height="10" fill="#f3f1ea" opacity="0.7" />
        </g>
      ))}
      <circle cx="150" cy="112" r="26" fill="none" stroke="#f3f1ea" strokeWidth="4" opacity="0.85" />
      <polygon points="142,100 142,124 164,112" fill="#f3f1ea" opacity="0.9" />
    </Base>
  )
}

function Memes() {
  return (
    <Base from="#3a3a3a" to="#0a0a0a">
      <circle cx="150" cy="105" r="55" fill="#ffd23f" />
      <circle cx="130" cy="90" r="7" fill="#232526" />
      <circle cx="172" cy="90" r="7" fill="#232526" />
      <path d="M120 120 Q150 150 182 120" stroke="#232526" strokeWidth="7" fill="none" strokeLinecap="round" />
      <text x="230" y="50" fontSize="22" fill="#f3f1ea" opacity="0.8" fontFamily="sans-serif">lol</text>
      <text x="40" y="170" fontSize="18" fill="#f3f1ea" opacity="0.6" fontFamily="sans-serif">kkkk</text>
    </Base>
  )
}

function Paisagem() {
  return (
    <Base from="#4f9de0" to="#12325c">
      <circle cx="230" cy="55" r="24" fill="#ffe8a3" opacity="0.9" />
      <polygon points="0,170 70,90 120,140 170,70 300,170" fill="#1c4f6b" opacity="0.85" />
      <polygon points="0,190 100,120 190,190" fill="#0e3247" opacity="0.9" />
      <rect x="0" y="185" width="300" height="15" fill="#0a2434" />
    </Base>
  )
}

function Retro() {
  return (
    <Base from="#1b1030" to="#301b52">
      {Array.from({ length: 24 }).map((_, i) => {
        const colors = ['#ff3040', '#3b63ff', '#ffd23f', '#3ee6a0']
        const x = 15 + (i % 6) * 46
        const y = 15 + Math.floor(i / 6) * 46
        return <rect key={i} x={x} y={y} width="30" height="30" rx="5" fill={colors[i % colors.length]} opacity="0.75" />
      })}
    </Base>
  )
}

function Pinguim() {
  return (
    <Base from="#3b63ff" to="#0b1957">
      <ellipse cx="150" cy="120" rx="46" ry="58" fill="#1c1c22" />
      <ellipse cx="150" cy="128" rx="28" ry="42" fill="#f3f1ea" />
      <circle cx="138" cy="92" r="5" fill="#1c1c22" />
      <circle cx="162" cy="92" r="5" fill="#1c1c22" />
      <polygon points="145,102 155,102 150,112" fill="#ffb703" />
      <ellipse cx="150" cy="185" rx="30" ry="8" fill="#ffb703" opacity="0.8" />
    </Base>
  )
}

function Feward() {
  return (
    <Base from="#ff3040" to="#7a0f1a">
      <rect x="70" y="65" width="160" height="70" rx="12" fill="#f3f1ea" opacity="0.06" />
      <text x="150" y="115" fontSize="42" fontFamily="var(--font-display)" fill="#12060a" textAnchor="middle">FEW</text>
    </Base>
  )
}

const REGISTRY = {
  jogos: Jogos,
  fanarte: FanArte,
  circo: Circo,
  animes: Animes,
  filmes: Filmes,
  memes: Memes,
  paisagem: Paisagem,
  retro: Retro,
  pinguim: Pinguim,
  feward: Feward,
}

export default function Artwork({ id, className = '' }) {
  const Cmp = REGISTRY[id] || Feward
  return (
    <div className={`art-wrap ${className}`}>
      <Cmp />
    </div>
  )
}
