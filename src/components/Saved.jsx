import Icon from './Icon.jsx'
import Artwork from './Artwork.jsx'
import { savedItems } from '../data/mockData'

export default function Saved() {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Vídeos & fotos salvos</h1>
      </div>

      <div className="saved-grid">
        {savedItems.map((item) => (
          <div className="saved-card" key={item.id}>
            <Artwork id={item.art} />
            <span className="type-badge">
              <Icon name={item.type === 'video' ? 'camera' : 'image'} size={16} />
            </span>
            <span className="saved-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
