import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import api from '../lib/axios';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // El backend espera un objeto LoginRequest { email, password }
      const response = await api.post('/auth/login', { email, password });
      // Asumiendo que la respuesta AuthResponse contiene { token, user: { ... } }
      const { token, user } = response.data;
      
      setAuth(user || { email }, token);
      navigate('/dashboard'); // Redirigir a una ruta protegida (aún por crear)
    } catch (err: any) {
      console.error('Error en login:', err);
      setError(err.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Connectly</h1>
      </div>

      {/* Card */}
      <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold">Iniciar sesión</h2>
          <p className="mt-2 text-sm text-text-muted">Bienvenido de nuevo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-md bg-red-500/20 p-3 text-sm text-red-500">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-white" htmlFor="email">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@ejemplo.com"
                className="w-full rounded-lg border border-border bg-input py-3 pl-11 pr-4 text-white placeholder-text-muted outline-none transition-colors focus:border-white focus:ring-1 focus:ring-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-white" htmlFor="password">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-border bg-input py-3 pl-11 pr-11 text-white placeholder-text-muted outline-none transition-colors focus:border-white focus:ring-1 focus:ring-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-white py-3 text-center font-semibold text-black transition-opacity hover:bg-gray-200 disabled:opacity-50"
          >
            {loading ? 'Iniciando sesión...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-text-muted">
          <span>¿No tienes una cuenta? </span>
          <Link to="/register" className="font-bold text-white hover:underline">
            Regístrate
          </Link>
        </div>
      </div>

      <footer className="absolute bottom-8 text-xs text-text-muted">
        CONNECTLY © 2026 • PRIVACIDAD • TÉRMINOS
      </footer>
    </div>
  );
}
