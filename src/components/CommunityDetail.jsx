import Avatar from './Avatar.jsx'
import Icon from './Icon.jsx'
import { friendsMock, communities, currentUser } from '../data/mockData'

export default function CommunityDetail({ communityId, onBack }) {
  const community = communities.find((c) => c.id === communityId)
  const left = friendsMock.slice(0, 6)
  const right = friendsMock.slice(6, 12)

  return (
    <div className="page">
      <div className="page-header">
        <button className="btn-outline" onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="back" size={16} /> Voltar
        </button>
        <h1 className="page-title">{community ? community.name : 'Comunidade'}</h1>
      </div>

      <div className="community-detail-grid">
        <div className="friend-col">
          {left.map((f) => (
            <div className="friend-item" key={f.id}>
              <Avatar name={f.name} size="xs" />
              <span>{f.name}</span>
            </div>
          ))}
        </div>

        <div className="you-col">
          <Avatar name={currentUser.name} size="lg" />
          <p>Você</p>
        </div>

        <div className="friend-col">
          {right.map((f) => (
            <div className="friend-item" key={f.id}>
              <Avatar name={f.name} size="xs" />
              <span>{f.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
