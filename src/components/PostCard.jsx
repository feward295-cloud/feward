import { useState } from 'react'
import Avatar from './Avatar.jsx'
import Icon from './Icon.jsx'

export default function PostCard({ post, onToggleLike, onToggleSave, onAddComment }) {
  const [commentText, setCommentText] = useState('')
  const [showComments, setShowComments] = useState(false)

  function submitComment(e) {
    e.preventDefault()
    if (!commentText.trim()) return
    onAddComment(post.id, commentText.trim())
    setCommentText('')
  }

  return (
    <article className="post-card">
      <div className="post-head">
        <Avatar name={post.user.name} size="sm" />
        <div className="names">
          <strong>{post.user.name}</strong>
          <span>{post.user.handle}</span>
        </div>
      </div>

      <div className="post-media">
        <div className="mini-badge-lg seal">FEW</div>
      </div>

      <p className="post-caption">{post.caption}</p>

      <div className="post-actions">
        <button className={post.liked ? 'liked' : ''} onClick={() => onToggleLike(post.id)}>
          <Icon name="heart" size={17} /> {post.likes}
        </button>
        <button onClick={() => setShowComments((v) => !v)}>
          <Icon name="comment" size={17} /> {post.comments.length}
        </button>
        <button className={post.saved ? 'saved-active' : ''} onClick={() => onToggleSave(post.id)}>
          <Icon name="bookmark" size={17} />
        </button>
        <button>
          <Icon name="share" size={17} />
        </button>
      </div>

      {showComments && (
        <div className="post-comments">
          {post.comments.map((c) => (
            <div className="comment-row" key={c.id}>
              <strong>{c.user}</strong>{c.text}
            </div>
          ))}
          <form className="comment-input-row" onSubmit={submitComment}>
            <input
              placeholder="Escreva um comentário..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </form>
        </div>
      )}
    </article>
  )
}
