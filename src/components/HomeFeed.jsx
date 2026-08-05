import { useState } from 'react'
import Avatar from './Avatar.jsx'
import Icon from './Icon.jsx'
import PostCard from './PostCard.jsx'
import { trendingCommunities, currentUser } from '../data/mockData'

export default function HomeFeed({ posts, setPosts }) {
  const [draft, setDraft] = useState('')

  function publish() {
    if (!draft.trim()) return
    setPosts((prev) => [
      {
        id: `p${Date.now()}`,
        user: { name: currentUser.name, handle: currentUser.username },
        caption: draft.trim(),
        liked: false,
        likes: 0,
        saved: false,
        comments: [],
      },
      ...prev,
    ])
    setDraft('')
  }

  function toggleLike(id) {
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p))
  }

  function toggleSave(id) {
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, saved: !p.saved } : p))
  }

  function addComment(id, text) {
    setPosts((prev) => prev.map((p) => p.id === id
      ? { ...p, comments: [...p.comments, { id: `c${Date.now()}`, user: currentUser.name, text }] }
      : p))
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Início</h1>
      </div>

      <div className="layout-2col">
        <div>
          <div className="compose-box">
            <Avatar name={currentUser.name} size="sm" />
            <input
              placeholder="Fazer um post..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && publish()}
            />
            <div className="compose-actions">
              <button className="icon-btn"><Icon name="image" size={17} /></button>
              <button className="icon-btn"><Icon name="camera" size={17} /></button>
              <button className="icon-btn"><Icon name="layers" size={17} /></button>
              <button className="icon-btn"><Icon name="code" size={17} /></button>
              <button className="icon-btn send" onClick={publish}><Icon name="send" size={16} /></button>
            </div>
          </div>

          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onToggleLike={toggleLike}
              onToggleSave={toggleSave}
              onAddComment={addComment}
            />
          ))}
        </div>

        <div className="side-card">
          <h3>Comunidades em alta</h3>
          <ul>
            {trendingCommunities.map((name) => <li key={name}>{name}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}
