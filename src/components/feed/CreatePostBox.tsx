import { useState } from 'react';
import { Image, Film, Smile } from 'lucide-react';

export default function CreatePostBox() {
  const [postText, setPostText] = useState('');

  return (
    <div className="create-post-box">
      <div className="create-post-top">
        <img
          src="/images/avatar_user.png"
          alt="Tu avatar"
          className="create-post-avatar"
        />
        <input
          type="text"
          placeholder="¿Qué está pasando?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          className="create-post-input"
        />
      </div>
      <div className="create-post-actions">
        <div className="create-post-media-buttons">
          <button className="create-post-media-btn" title="Imagen">
            <Image size={20} />
          </button>
          <button className="create-post-media-btn" title="GIF">
            <Film size={20} />
          </button>
          <button className="create-post-media-btn" title="Emoji">
            <Smile size={20} />
          </button>
        </div>
        <button className="create-post-publish-btn">
          Publicar
        </button>
      </div>
    </div>
  );
}
