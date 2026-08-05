import { useState } from 'react'
import Icon from './Icon.jsx'
import Artwork from './Artwork.jsx'
import { communities } from '../data/mockData'

export default function Explore({ onOpenCommunity }) {
  const [query, setQuery] = useState('')

  const filtered = communities.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Explorar</h1>
        <div className="search-pill">
          <Icon name="search" size={16} />
          <input placeholder="Pesquisar comunidades, pessoas..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </div>

      <div className="community-grid">
        {filtered.map((c) => (
          <button key={c.id} className="community-card" onClick={() => onOpenCommunity(c.id)}>
            <Artwork id={c.art} />
            <small>{c.members} membros</small>
            <span>{c.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
