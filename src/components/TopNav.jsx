import Icon from './Icon.jsx'

const TABS = [
  { id: 'home', label: 'Inicio', icon: 'home' },
  { id: 'explorar', label: 'Explorar', icon: 'search' },
  { id: 'comunidade', label: 'Comunidade', icon: 'users' },
  { id: 'mensagem', label: 'Mensagem', icon: 'send' },
  { id: 'notificacao', label: 'Notificação', icon: 'bell' },
]

export default function TopNav({ active, onNavigate }) {
  return (
    <header className="topnav">
      <nav className="topnav-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`topnav-btn ${active === tab.id ? 'active' : ''}`}
            onClick={() => onNavigate(tab.id)}
          >
            <Icon name={tab.icon} size={16} />
            {tab.label}
          </button>
        ))}
      </nav>
      <div className="topnav-icons">
        <button className="topnav-icon" onClick={() => onNavigate('perfil')}>
          <Icon name="user" size={18} />
        </button>
        <button className="topnav-icon" onClick={() => onNavigate('configuracao')}>
          <Icon name="settings" size={18} />
        </button>
      </div>
    </header>
  )
}
