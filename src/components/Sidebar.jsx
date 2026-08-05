import Icon from './Icon.jsx'

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'comunidade', label: 'Comunidade', icon: 'users' },
  { id: 'explorar', label: 'Explorar', icon: 'search' },
  { id: 'mensagem', label: 'Mensagem', icon: 'send' },
  { id: 'notificacao', label: 'Notificação', icon: 'bell' },
  { id: 'salvos', label: 'Salvos', icon: 'bookmark' },
  { id: 'perfil', label: 'Perfil', icon: 'user' },
  { id: 'configuracao', label: 'Configuração', icon: 'settings' },
]

export default function Sidebar({ active, onNavigate, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="logo-mark">
        <div className="mini-badge seal"><span>FEW</span></div>
        <span className="wordmark">FEWARD</span>
      </div>

      <nav className="nav-group">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-btn ${active === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <Icon name={item.icon} size={18} />
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <button className="nav-btn logout" onClick={onLogout}>
        <Icon name="logout" size={18} />
        <span className="nav-label">Sair</span>
      </button>
    </aside>
  )
}
