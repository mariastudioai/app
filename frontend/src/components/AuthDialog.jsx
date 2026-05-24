import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { useAuth } from '../context/AuthContext';
import { useAuthDialog } from '../context/AuthDialogContext';
import { Loader2, Check, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const Field = ({ icon: Icon, ...props }) => (
  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#F6F3EF] border border-[#3E2F2B]/10 focus-within:border-[#C6A77D] transition-colors">
    {Icon && <Icon size={16} className="text-[#3E2F2B]/50 shrink-0" />}
    <input
      {...props}
      className="flex-1 bg-transparent outline-none text-[14px] text-[#1A1A1A] placeholder:text-[#1A1A1A]/35"
    />
  </div>
);

const SignupForm = ({ onSuccess, plan }) => {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    if (password.length < 6) {
      setErr('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      const u = await signup(name, email, password);
      onSuccess(u);
    } catch (e) {
      const msg = e?.response?.data?.detail || 'Sign up failed. Please try again.';
      setErr(typeof msg === 'string' ? msg : 'Sign up failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      {plan && (
        <div className="px-4 py-2.5 rounded-xl bg-[#C6A77D]/10 border border-[#C6A77D]/30 text-[12px] text-[#3E2F2B]">
          You're starting on the <span className="font-semibold uppercase tracking-[0.12em] text-[#C6A77D]">{plan}</span> plan.
        </div>
      )}
      <Field
        icon={User}
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        maxLength={80}
        autoComplete="name"
      />
      <Field
        icon={Mail}
        type="email"
        placeholder="you@studio.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <Field
        icon={Lock}
        type="password"
        placeholder="At least 6 characters"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
        autoComplete="new-password"
      />
      {err && <div className="text-[12.5px] text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{err}</div>}
      <button
        type="submit"
        disabled={loading}
        className="btn-pill w-full justify-center py-3.5 text-[12px] tracking-[0.18em] uppercase bg-[#3E2F2B] text-white hover:bg-[#2A1F1B] disabled:opacity-60"
      >
        {loading ? <Loader2 size={14} className="spinner" /> : <>Create account <ArrowRight size={14} /></>}
      </button>
      <p className="text-[11.5px] text-[#1A1A1A]/55 text-center pt-1 font-light">
        By signing up you agree to our Terms & Privacy.
      </p>
    </form>
  );
};

const LoginForm = ({ onSuccess }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const u = await login(email, password);
      onSuccess(u);
    } catch (e) {
      const msg = e?.response?.data?.detail || 'Login failed.';
      setErr(typeof msg === 'string' ? msg : 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <Field
        icon={Mail}
        type="email"
        placeholder="you@studio.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <Field
        icon={Lock}
        type="password"
        placeholder="Your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />
      {err && <div className="text-[12.5px] text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{err}</div>}
      <button
        type="submit"
        disabled={loading}
        className="btn-pill w-full justify-center py-3.5 text-[12px] tracking-[0.18em] uppercase bg-[#3E2F2B] text-white hover:bg-[#2A1F1B] disabled:opacity-60"
      >
        {loading ? <Loader2 size={14} className="spinner" /> : <>Sign in <ArrowRight size={14} /></>}
      </button>
    </form>
  );
};

const WelcomeView = ({ user, onClose }) => (
  <div className="text-center py-6">
    <div className="mx-auto w-16 h-16 rounded-full bg-[#C6A77D]/15 border border-[#C6A77D]/40 flex items-center justify-center mb-5">
      <Check className="text-[#C6A77D]" size={28} strokeWidth={2.4} />
    </div>
    <p className="text-[11px] tracking-[0.32em] uppercase font-semibold text-[#C6A77D] mb-3">
      You're in
    </p>
    <h3 className="h-display text-[36px] text-[#3E2F2B] leading-none">
      Welcome, <em>{user.name.split(' ')[0]}</em>.
    </h3>
    <p className="mt-4 text-[14.5px] text-[#1A1A1A]/65 font-light max-w-xs mx-auto leading-relaxed">
      Your MARI.A Launch account is ready. Drop a ZIP or push to GitHub when you're ready to deploy your first site.
    </p>
    <button
      onClick={onClose}
      className="btn-pill mt-7 px-7 py-3 text-[12px] tracking-[0.18em] uppercase bg-[#3E2F2B] text-white hover:bg-[#2A1F1B]"
    >
      Start deploying
    </button>
  </div>
);

const AuthDialog = () => {
  const { open, tab, plan, setTab, close, setOpen } = useAuthDialog();
  const [welcomeUser, setWelcomeUser] = useState(null);

  // Reset welcome view whenever dialog is freshly opened
  useEffect(() => {
    if (open) setWelcomeUser(null);
  }, [open]);

  const handleSuccess = (u) => {
    if (tab === 'signup') {
      setWelcomeUser(u);
    } else {
      toast.success(`Welcome back, ${u.name.split(' ')[0]}`);
      close();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden bg-white border-[#C6A77D]/30 rounded-2xl">
        <DialogTitle className="sr-only">{tab === 'signup' ? 'Create your account' : 'Sign in'}</DialogTitle>
        <div className="p-7">
          {welcomeUser ? (
            <WelcomeView user={welcomeUser} onClose={close} />
          ) : (
            <>
              <div className="text-center mb-6">
                <p className="text-[11px] tracking-[0.32em] uppercase font-semibold text-[#C6A77D] mb-3">
                  MARI.A Launch
                </p>
                <h2 className="h-display text-[34px] text-[#3E2F2B] leading-none">
                  {tab === 'signup' ? <>Create your <em>account</em>.</> : <>Welcome <em>back</em>.</>}
                </h2>
                <p className="mt-3 text-[13px] text-[#1A1A1A]/60 font-light">
                  {tab === 'signup' ? 'Free to start. No credit card required.' : 'Sign in to your MARI.A Launch account.'}
                </p>
              </div>

              <div className="flex justify-center gap-1 mb-5 p-1 rounded-full bg-[#F6F3EF] border border-[#3E2F2B]/8">
                <button
                  onClick={() => setTab('signup')}
                  className={`btn-pill flex-1 justify-center py-2 text-[11px] tracking-[0.16em] uppercase ${
                    tab === 'signup' ? 'bg-white text-[#3E2F2B] shadow-sm' : 'text-[#3E2F2B]/55 hover:text-[#3E2F2B]'
                  }`}
                >
                  Sign up
                </button>
                <button
                  onClick={() => setTab('login')}
                  className={`btn-pill flex-1 justify-center py-2 text-[11px] tracking-[0.16em] uppercase ${
                    tab === 'login' ? 'bg-white text-[#3E2F2B] shadow-sm' : 'text-[#3E2F2B]/55 hover:text-[#3E2F2B]'
                  }`}
                >
                  Sign in
                </button>
              </div>

              {tab === 'signup' ? (
                <SignupForm onSuccess={handleSuccess} plan={plan} />
              ) : (
                <LoginForm onSuccess={handleSuccess} />
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
