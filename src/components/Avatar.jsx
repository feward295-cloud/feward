const palette = ['#3b63ff', '#d5283a', '#7c3aed', '#0ea5a5', '#c2872b']

function colorFor(name = '') {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return palette[Math.abs(hash) % palette.length]
}

export default function Avatar({ name = 'Usuário', size = 'md' }) {
  const initial = name.trim().charAt(0).toUpperCase() || '?'
  const bg = colorFor(name)
  return (
    <div
      className={`avatar-seal seal ${size}`}
      style={{ background: `linear-gradient(135deg, ${bg}, #0b0c16)` }}
    >
      {initial}
    </div>
  )
}
