import { useState } from 'react';
import { Home, Compass, PlusSquare, User, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const navItems = [
  { icon: Home, label: 'Inicio', path: '/feed' },
  { icon: Compass, label: 'Explorar', path: '/explore' },
  { icon: PlusSquare, label: 'Crear', path: '/create' },
  { icon: User, label: 'Perfil', path: '/profile' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [showLogout, setShowLogout] = useState(false);

  const displayName = user?.username || user?.email?.split('@')[0] || 'Usuario';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <h1>Connectly</h1>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon className="sidebar-nav-icon" strokeWidth={isActive ? 2.5 : 1.8} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile (bottom) */}
      <div
        className="sidebar-profile-wrapper"
        onMouseEnter={() => setShowLogout(true)}
        onMouseLeave={() => setShowLogout(false)}
      >
        {/* Logout Popup */}
        <div className={`sidebar-logout-popup ${showLogout ? 'visible' : ''}`}>
          <div className="sidebar-logout-popup-inner">
            <button className="sidebar-logout-btn" onClick={handleLogout}>
              <LogOut size={18} />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>

        <div className="sidebar-profile" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
          <img
            src={user?.avatarUrl || "/images/avatar_user.png"}
            alt="Tu perfil"
            className="sidebar-profile-avatar"
          />
          <div className="sidebar-profile-info">
            <span className="sidebar-profile-name">Tu Perfil</span>
            <span className="sidebar-profile-username">@{displayName}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
