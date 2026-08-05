import { useState } from 'react'

const initialSettings = [
  { id: 'notif', title: 'Notificações push', desc: 'Receber avisos de curtidas, comentários e mensagens', on: true },
  { id: 'private', title: 'Conta privada', desc: 'Só amigos veem suas publicações', on: false },
  { id: 'sound', title: 'Sons', desc: 'Tocar som ao receber mensagem', on: true },
]

export default function Settings() {
  const [settings, setSettings] = useState(initialSettings)

  function toggle(id) {
    setSettings((prev) => prev.map((s) => s.id === id ? { ...s, on: !s.on } : s))
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Configuração</h1>
      </div>

      <div className="settings-list">
        {settings.map((s) => (
          <div className="settings-row" key={s.id}>
            <div>
              <strong>{s.title}</strong>
              <span>{s.desc}</span>
            </div>
            <button className={`toggle ${s.on ? 'on' : ''}`} onClick={() => toggle(s.id)}>
              <span className="dot" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
