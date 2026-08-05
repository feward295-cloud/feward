import Icon from './Icon.jsx'

export default function Notifications({ notifications }) {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Notificações</h1>
      </div>

      <div className="notif-list">
        {notifications.map((n) => (
          <div className="notif-item" key={n.id}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Icon name="bell" size={17} />
              <span>{n.text}</span>
            </div>
            <span className="time">{n.time}</span>
          </div>
        ))}
        {notifications.length === 0 && <p style={{ color: 'var(--ink-faint)' }}>Nenhuma notificação por aqui ainda.</p>}
      </div>
    </div>
  )
}
