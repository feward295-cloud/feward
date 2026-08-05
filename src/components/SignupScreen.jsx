import { useState } from 'react'

export default function SignupScreen({ onCreateAccount, onGoToLogin, onGoToCredits }) {
  const [form, setForm] = useState({ email: '', password: '', confirm: '', username: '' })
  const [error, setError] = useState('')

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.email || !form.username) {
      setError('Preencha email e nome de usuário.')
      return
    }
    if (form.password !== form.confirm) {
      setError('As senhas não coincidem.')
      return
    }
    onCreateAccount({ email: form.email, username: form.username })
  }

  return (
    <div className="auth-shell">
      <button className="auth-credits-link" onClick={onGoToCredits}>Créditos</button>

      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="logo-badge seal"><span>FEW</span></div>
        <p className="auth-title">Criar conta Feward</p>

        <div className="field">
          <label>Email</label>
          <input type="email" placeholder="Digite seu email" value={form.email} onChange={(e) => update('email', e.target.value)} />
        </div>
        <div className="field">
          <label>Senha</label>
          <input type="password" placeholder="Digite sua senha" value={form.password} onChange={(e) => update('password', e.target.value)} />
        </div>
        <div className="field">
          <label>Repita a senha</label>
          <input type="password" placeholder="Repita a senha" value={form.confirm} onChange={(e) => update('confirm', e.target.value)} />
        </div>
        <div className="field">
          <label>Nome de usuário</label>
          <input type="text" placeholder="Escolha um nome de usuário" value={form.username} onChange={(e) => update('username', e.target.value)} />
        </div>

        {error && <p style={{ color: 'var(--red)', fontSize: 12.5, marginTop: -6, marginBottom: 14 }}>{error}</p>}

        <button type="submit" className="btn-glow secondary">Criar conta</button>

        <p className="auth-switch">
          Já tem conta? <button type="button" onClick={onGoToLogin}>Entrar</button>
        </p>
      </form>

      <span className="auth-version">VERSÃO 1.0.0</span>
    </div>
  )
}
