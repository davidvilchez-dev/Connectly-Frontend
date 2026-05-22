const stories = [
  { id: 1, username: 'Tú', avatar: '/images/avatar_user.png', isOwn: true },
  { id: 2, username: 'Elena', avatar: '/images/avatar_elena.png', isOwn: false },
  { id: 3, username: 'Marco', avatar: '/images/avatar_marco.png', isOwn: false },
];

export default function StoriesBar() {
  return (
    <div className="stories-bar">
      {stories.map((story) => (
        <button key={story.id} className="story-item">
          <div className="story-ring">
            <img
              src={story.avatar}
              alt={story.username}
              className="story-avatar"
            />
          </div>
          <span className="story-username">{story.username}</span>
        </button>
      ))}
    </div>
  );
}
