import { useState } from 'react'
import Icon from './Icon.jsx'
import Artwork from './Artwork.jsx'
import { communities as initialCommunities } from '../data/mockData'

export default function Communities({ onOpenCommunity }) {
  const [communities, setCommunities] = useState(initialCommunities)
  const [creating, setCreating] = useState(false)
  const [name, setName] = useState('')

  function createCommunity() {
    if (!name.trim()) return
    setCommunities((prev) => [
      ...prev,
      {
        id: `c${Date.now()}`,
        name: name.trim(),
        art: 'feward',
        members: '1 membro',
      },
    ])
    setName('')
    setCreating(false)
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Comunidades</h1>
      </div>

      <div className="community-grid">
        {communities.map((c) => (
          <button key={c.id} className="community-card" onClick={() => onOpenCommunity(c.id)}>
            <Artwork id={c.art} />
            <small>{c.members} membros</small>
            <span>{c.name}</span>
          </button>
        ))}

        {creating ? (
          <div className="create-community-btn" style={{ borderStyle: 'solid' }}>
            <input
              autoFocus
              placeholder="Nome da comunidade"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--line)', borderRadius: 8, padding: 8, color: 'var(--ink)', width: '85%', textAlign: 'center' }}
              onKeyDown={(e) => e.key === 'Enter' && createCommunity()}
            />
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <button className="btn-outline" onClick={createCommunity}>Criar</button>
              <button className="btn-outline" onClick={() => setCreating(false)}>Cancelar</button>
            </div>
          </div>
        ) : (
          <button className="create-community-btn" onClick={() => setCreating(true)}>
            <Icon name="plus" size={22} />
            Criar comunidade
          </button>
        )}
      </div>
    </div>
  )
}
