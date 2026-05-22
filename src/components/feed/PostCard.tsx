import { useState } from 'react';
import { Heart, MessageCircle, Bookmark, MoreHorizontal } from 'lucide-react';

interface PostCardProps {
  author: string;
  avatar: string;
  timeAgo: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
}

function formatCount(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
}

export default function PostCard({
  author,
  avatar,
  timeAgo,
  content,
  image,
  likes,
  comments,
}: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [commentText, setCommentText] = useState('');

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <article className="post-card">
      {/* Post Header */}
      <div className="post-header">
        <div className="post-author-info">
          <img src={avatar} alt={author} className="post-author-avatar" />
          <div>
            <h3 className="post-author-name">{author}</h3>
            <span className="post-time">{timeAgo}</span>
          </div>
        </div>
        <button className="post-more-btn">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Content */}
      <p className="post-content">{content}</p>

      {/* Post Image */}
      {image && (
        <div className="post-image-wrapper">
          <img src={image} alt="Post" className="post-image" />
        </div>
      )}

      {/* Post Actions */}
      <div className="post-actions">
        <div className="post-actions-left">
          <button
            className={`post-action-btn ${liked ? 'liked' : ''}`}
            onClick={handleLike}
          >
            <Heart
              size={20}
              fill={liked ? '#ef4444' : 'none'}
              strokeWidth={liked ? 0 : 1.8}
            />
            <span>{formatCount(likeCount)}</span>
          </button>
          <button className="post-action-btn">
            <MessageCircle size={20} strokeWidth={1.8} />
            <span>{formatCount(comments)}</span>
          </button>
        </div>
        <button
          className={`post-action-btn bookmark-btn ${saved ? 'saved' : ''}`}
          onClick={() => setSaved(!saved)}
        >
          <Bookmark
            size={20}
            fill={saved ? '#3b82f6' : 'none'}
            strokeWidth={saved ? 0 : 1.8}
          />
        </button>
      </div>

      {/* Comment Input */}
      <div className="post-comment-input-wrapper">
        <input
          type="text"
          placeholder="Escribe un comentario..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="post-comment-input"
        />
        <button
          className={`post-comment-publish ${commentText.trim() ? 'active' : ''}`}
          disabled={!commentText.trim()}
        >
          PUBLICAR
        </button>
      </div>
    </article>
  );
}
