'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  defaultView?: 'login' | 'register' | 'forgot';
}

export const AuthModal = ({ open, onClose, defaultView = 'login' }: AuthModalProps) => {
  const [view, setView] = useState<'login' | 'register' | 'forgot'>(defaultView);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const DEMO_EMAIL = 'admin@sweeete.com';
  const DEMO_PASSWORD = 'password123';

  useEffect(() => {
    if (open) {
      setView(defaultView);
      setEmail('');
      setPassword('');
      setName('');
      setError('');
    }
  }, [open, defaultView]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (view === 'forgot') {
      if (!email) { setError('Please enter your email'); return; }
      toast.success('Password reset link sent to your email');
      setView('login');
      return;
    }

    if (view === 'register') {
      if (!name || !email || !password) { setError('Please fill all fields'); return; }
      localStorage.setItem('user_email', email);
      localStorage.setItem('user_name', name);
      toast.success('Account created successfully!');
      onClose();
      return;
    }

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      localStorage.setItem('user_email', email);
      localStorage.setItem('user_name', 'Admin');
      toast.success('Welcome back, Admin!');
      onClose();
    } else {
      setError('Invalid email or password. Try admin@sweeete.com / password123');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            <div className="relative p-6 md:p-8 pb-0">
              <button onClick={onClose} className="absolute right-6 top-6 text-foreground/40 hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>

              {view === 'forgot' && (
                <button onClick={() => setView('login')} className="flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground transition-colors mb-4">
                  <ArrowLeft className="w-4 h-4" /> Back to login
                </button>
              )}

              <h2 className="text-xl md:text-2xl font-bold">
                {view === 'login' ? 'Welcome back' : view === 'register' ? 'Create account' : 'Reset password'}
              </h2>
              <p className="text-foreground/50 text-sm mt-1.5 mb-8">
                {view === 'login' ? 'Sign in to order your favourite sweets' : view === 'register' ? 'Join sweeTe to discover amazing sweets' : 'Enter your email to receive a reset link'}
              </p>
            </div>

            <div className="p-6 md:p-8 pt-0">
              <form className="space-y-4" onSubmit={handleSubmit}>
                {view === 'register' && (
                  <div>
                    <label className="text-xs font-medium text-foreground/60 uppercase tracking-wide mb-1.5 block">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                      <input type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-medium text-foreground/60 uppercase tracking-wide mb-1.5 block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                    <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                  </div>
                </div>

                {view !== 'forgot' && (
                  <div>
                    <label className="text-xs font-medium text-foreground/60 uppercase tracking-wide mb-1.5 block">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                      <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-10 pr-11 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground/60 transition-colors">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {view === 'login' && (
                  <div className="text-right">
                    <button type="button" onClick={() => setView('forgot')} className="text-xs text-primary hover:underline">Forgot password?</button>
                  </div>
                )}

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <button type="submit" className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 mt-2">
                  {view === 'login' ? 'Sign In' : view === 'register' ? 'Create Account' : 'Send Reset Link'}
                </button>
              </form>

              {view === 'login' && (
                <p className="text-center text-sm text-foreground/50 mt-6">
                  New to sweeTe? <button type="button" onClick={() => setView('register')} className="text-primary font-semibold hover:underline">Sign up</button>
                </p>
              )}
              {view === 'register' && (
                <p className="text-center text-sm text-foreground/50 mt-6">
                  Already have an account?{' '}
                  <button type="button" onClick={() => setView('login')} className="text-primary font-semibold hover:underline">Sign in</button>
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
