import Sidebar from '../components/layout/Sidebar';
import StoriesBar from '../components/feed/StoriesBar';
import CreatePostBox from '../components/feed/CreatePostBox';
import PostCard from '../components/feed/PostCard';
import SuggestionsPanel from '../components/feed/SuggestionsPanel';

const mockPosts = [
  {
    id: 1,
    author: 'Elena V.',
    avatar: '/images/avatar_elena.png',
    timeAgo: 'hace 2 horas',
    content:
      'Explorando la calma en el caos urbano. La arquitectura minimalista siempre me devuelve al centro.',
    image: '/images/post_architecture.png',
    likes: 1200,
    comments: 84,
  },
];

export default function Feed() {
  return (
    <div className="feed-layout">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Feed */}
      <main className="feed-main">
        <h2 className="feed-title">Inicio</h2>
        <StoriesBar />
        <CreatePostBox />

        <div className="feed-posts">
          {mockPosts.map((post) => (
            <PostCard
              key={post.id}
              author={post.author}
              avatar={post.avatar}
              timeAgo={post.timeAgo}
              content={post.content}
              image={post.image}
              likes={post.likes}
              comments={post.comments}
            />
          ))}
        </div>
      </main>

      {/* Right Sidebar */}
      <SuggestionsPanel />
    </div>
  );
}
