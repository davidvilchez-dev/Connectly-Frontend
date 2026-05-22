const suggestions = [
  { id: 1, username: 'Studio.X', avatar: '/images/avatar_studiox.png' },
  { id: 2, username: 'Luz_Editor', avatar: '/images/avatar_luz.png' },
];

export default function SuggestionsPanel() {
  return (
    <aside className="suggestions-panel">
      <h3 className="suggestions-title">Sugerencias</h3>
      <div className="suggestions-list">
        {suggestions.map((user) => (
          <div key={user.id} className="suggestion-item">
            <div className="suggestion-user-info">
              <img
                src={user.avatar}
                alt={user.username}
                className="suggestion-avatar"
              />
              <span className="suggestion-username">{user.username}</span>
            </div>
            <button className="suggestion-follow-btn">Seguir</button>
          </div>
        ))}
      </div>
    </aside>
  );
}
