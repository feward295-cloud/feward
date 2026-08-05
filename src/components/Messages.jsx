import { useState } from 'react'
import Avatar from './Avatar.jsx'
import Icon from './Icon.jsx'

export default function Messages({ conversations, setConversations }) {
  const [activeId, setActiveId] = useState(conversations[0]?.id ?? null)
  const [draft, setDraft] = useState('')

  const active = conversations.find((c) => c.id === activeId)

  function send() {
    if (!draft.trim() || !active) return
    setConversations((prev) => prev.map((c) => c.id === active.id
      ? {
          ...c,
          lastMessage: draft.trim(),
          messages: [...c.messages, { id: `m${Date.now()}`, from: 'me', text: draft.trim() }],
        }
      : c))
    setDraft('')
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Mensagens</h1>
      </div>

      <div className="messages-shell">
        <div className="conv-list">
          {conversations.map((c) => (
            <div key={c.id} className={`conv-item ${c.id === activeId ? 'active' : ''}`} onClick={() => setActiveId(c.id)}>
              <Avatar name={c.name} size="sm" />
              <div className="names">
                <strong>{c.name}</strong>
                <span>{c.lastMessage}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-panel">
          {active ? (
            <>
              <div className="chat-header">
                <Avatar name={active.name} size="sm" />
                {active.name}
              </div>
              <div className="chat-body">
                {active.messages.map((m) => (
                  <div key={m.id} className={`bubble ${m.from === 'me' ? 'me' : 'them'}`}>{m.text}</div>
                ))}
              </div>
              <div className="chat-input-row">
                <input
                  placeholder="Escreva uma mensagem..."
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                />
                <button className="icon-btn send" onClick={send}><Icon name="send" size={16} /></button>
              </div>
            </>
          ) : (
            <div className="empty-chat">Selecione uma conversa</div>
          )}
        </div>
      </div>
    </div>
  )
}
