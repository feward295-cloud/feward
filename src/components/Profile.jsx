import { useState } from 'react'
import Avatar from './Avatar.jsx'
import Artwork from './Artwork.jsx'
import { currentUser, profileGallery } from '../data/mockData'

export default function Profile({ onLogout, onDeleteAccount }) {
  const [editing, setEditing] = useState(false)
  const [bio, setBio] = useState(currentUser.bio)
  const [confirmDelete, setConfirmDelete] = useState(false)

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Perfil</h1>
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <Avatar name={currentUser.name} size="xl" />
          <h2>{currentUser.name}</h2>
          <p className="handle">{currentUser.username}</p>

          {editing ? (
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          ) : (
            <p className="bio-text">{bio}</p>
          )}

          <div className="profile-stats">
            <div><strong>{currentUser.friendsCount}</strong><span>Amigos</span></div>
            <div><strong>{currentUser.createdAt}</strong><span>Desde</span></div>
          </div>

          <div className="profile-actions">
            {editing ? (
              <button className="btn-outline" onClick={() => setEditing(false)}>Salvar bio</button>
            ) : (
              <button className="btn-outline" onClick={() => setEditing(true)}>Editar bio</button>
            )}
            <button className="btn-outline">Recado</button>
            <button className="btn-outline" onClick={onLogout}>Sair</button>
            {confirmDelete ? (
              <>
                <button className="btn-danger" onClick={onDeleteAccount}>Confirmar exclusão</button>
                <button className="btn-outline" onClick={() => setConfirmDelete(false)}>Cancelar</button>
              </>
            ) : (
              <button className="btn-danger" onClick={() => setConfirmDelete(true)}>Deletar conta</button>
            )}
          </div>
        </div>

        <div>
          <h3 className="profile-gallery-title">Imagens</h3>
          <div className="profile-gallery">
            {profileGallery.map((artId, i) => (
              <div className="tile" key={i}>
                <Artwork id={artId} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
