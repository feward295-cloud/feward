import { credits, thanks } from '../data/mockData'

export default function CreditsScreen({ onBack }) {
  return (
    <div className="auth-shell">
      <button className="auth-credits-link" onClick={onBack}>Voltar</button>

      <div className="auth-card credits-shell">
        <h1 className="credits-title">Créditos e agradecimentos Feward</h1>
        <div className="credits-grid">
          <div className="credits-box">
            <h4>Agradecimento a</h4>
            {thanks.map((n) => (
              <p key={n}>{n}</p>
            ))}
            <p className="role" style={{ marginTop: 12 }}>por sempre apoiar o projeto</p>
          </div>
          <div className="credits-box">
            <h4>Equipe</h4>
            {credits.map((c) => (
              <div className="credit-entry" key={c.name}>
                <p>{c.name}</p>
                <p className="role">{c.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <span className="auth-version">VERSÃO 1.0.0</span>
    </div>
  )
}
