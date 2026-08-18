import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Hash, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logoImage from '../../assets/favicon.png';

export default function DelegateLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { delegateLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/delegate/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      delegateLogin(data);
      navigate('/delegate');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Back to home */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 text-sm text-slate hover:text-navy transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl border border-border shadow-[var(--shadow-elevated)] p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img src={logoImage} alt="VVS 2.0" className="h-16 w-auto" />
            </div>
            <h1 
              className="text-2xl font-bold text-navy"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Delegate Portal
            </h1>
            <p className="text-sm text-slate mt-2">
              Log in with your registered email and password to view your dashboard.
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 bg-error-light text-error rounded-lg mb-6 text-sm"
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-light" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  autoComplete="off"
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl 
                    focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none
                    text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">
                Password
              </label>
              <div className="relative">
                <Hash size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-light" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="new-password"
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl 
                    focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none
                    text-sm transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4
                bg-navy text-white font-semibold rounded-xl
                hover:bg-navy-light transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Access Dashboard
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-xs text-slate">
              Don't have an account?{' '}
              <Link to="/register" className="text-gold font-semibold hover:text-gold-dark transition-colors">
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
