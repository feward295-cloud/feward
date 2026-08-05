import { useState } from 'react'

export default function LoginScreen({ onLogin, onGoToSignup, onGoToCredits }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onLogin({ email: email || 'convidado@feward.com' })
  }

  return (
    <div className="auth-shell">
      <button className="auth-credits-link" onClick={onGoToCredits}>Créditos</button>

      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="logo-badge seal"><span>FEW</span></div>
        <p className="auth-tagline">Tecnologia e o futuro</p>

        <div className="field">
          <label>Email</label>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" className="auth-forgot">Esqueceu a senha?</button>

        <button type="submit" className="btn-glow">Entrar</button>
        <button type="button" className="btn-glow secondary" onClick={onGoToSignup}>
          Criar conta
        </button>

        <div className="social-row">
          <button type="button" className="btn-social google" onClick={() => onLogin({ email: 'google@feward.com' })}>
            <span className="social-badge">G</span> Continuar com Google
          </button>
          <button type="button" className="btn-social facebook" onClick={() => onLogin({ email: 'facebook@feward.com' })}>
            <span className="social-badge">f</span> Continuar com Facebook
          </button>
        </div>
      </form>

      <span className="auth-version">VERSÃO 1.0.0</span>
    </div>
  )
}
