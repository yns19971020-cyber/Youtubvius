import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authService } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export function AuthPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState<'email' | 'otp' | 'password'>('email');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    password: '',
    username: '',
  });
  const [otpExpiresAt, setOtpExpiresAt] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  // Timer countdown effect
  useEffect(() => {
    if (!otpExpiresAt) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((otpExpiresAt - Date.now()) / 1000));
      setTimeRemaining(remaining);

      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [otpExpiresAt]);

  const handleSendOtp = async (e?: React.FormEvent, isResend = false) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      await authService.sendOtp(formData.email);
      // Set OTP expiration time (1 hour from now)
      const expiresAt = Date.now() + (60 * 60 * 1000);
      setOtpExpiresAt(expiresAt);
      setStep('otp');
      toast.success(isResend ? 'OTP නැවත එවා ඇත' : 'OTP එවා ඇත', {
        description: 'ඔබේ email එක පරික්ෂා කරන්න. OTP 1 පැයකින් expire වේ.',
      });
    } catch (error: any) {
      toast.error('දෝෂයක්!', { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = () => {
    handleSendOtp(undefined, true);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await authService.verifyOtpAndSetPassword(
        formData.email,
        formData.otp,
        formData.password,
        formData.username
      );
      const authUser = await authService.mapUser(user!);
      login(authUser);
      navigate('/dashboard');
    } catch (error: any) {
      // Check if token expired
      if (error.message.toLowerCase().includes('expired') || 
          error.message.toLowerCase().includes('invalid')) {
        toast.error('OTP Token Expired!', {
          description: '"Resend OTP" button එක click කරලා නව OTP එකක් request කරන්න',
          duration: 5000,
        });
      } else {
        toast.error('දෝෂයක්!', { description: error.message });
      }
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await authService.signInWithPassword(formData.email, formData.password);
      const authUser = await authService.mapUser(user);
      login(authUser);
      navigate('/dashboard');
    } catch (error: any) {
      toast.error('දෝෂයක්!', { description: error.message });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-bg">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4 text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          ආපසු යන්න
        </Button>

        <div className="glass-effect rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {isLogin ? 'ඇතුල් වන්න' : 'ලියාපදිංචි වන්න'}
            </h1>
            <p className="text-muted-foreground">
              {isLogin ? 'ඔබේ ගිණුමට ඇතුල් වන්න' : 'නව ගිණුමක් සාදන්න'}
            </p>
          </div>

          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full gradient-bg" disabled={loading}>
                {loading ? 'පූරණය වෙමින්...' : 'ඇතුල් වන්න'}
              </Button>
            </form>
          ) : (
            <>
              {step === 'email' && (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full gradient-bg" disabled={loading}>
                    {loading ? 'එවමින්...' : 'OTP එවන්න'}
                  </Button>
                </form>
              )}

              {step === 'otp' && (
                <>
                  {/* OTP Timer */}
                  {timeRemaining > 0 && (
                    <div className="mb-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-blue-600">
                        OTP valid වෙන්නේ තව <span className="font-bold">{Math.floor(timeRemaining / 60)} මිනිත්තු {timeRemaining % 60} තත්පර</span>
                      </span>
                    </div>
                  )}
                  {timeRemaining === 0 && otpExpiresAt && (
                    <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-600 font-medium">
                        OTP Token Expired! "Resend OTP" button එක click කරන්න.
                      </span>
                    </div>
                  )}

                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">OTP Code</label>
                    <Input
                      type="text"
                      placeholder="1234"
                      value={formData.otp}
                      onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                      required
                      maxLength={4}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Username</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="username"
                        className="pl-10"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full gradient-bg" disabled={loading}>
                    {loading ? 'ලියාපදිංචි වෙමින්...' : 'ලියාපදිංචි වන්න'}
                  </Button>

                  <Button 
                    type="button"
                    variant="outline" 
                    className="w-full mt-3" 
                    onClick={handleResendOtp}
                    disabled={loading}
                  >
                    නව OTP එකක් එවන්න
                  </Button>

                  <Button 
                    type="button"
                    variant="ghost" 
                    className="w-full mt-2 text-sm" 
                    onClick={() => {
                      setStep('email');
                      setOtpExpiresAt(null);
                      setFormData({ ...formData, otp: '', password: '', username: '' });
                    }}
                  >
                    ආපසු email එකට
                  </Button>
                </form>
                </>
              )}
            </>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setStep('email');
                setOtpExpiresAt(null);
                setFormData({ email: '', otp: '', password: '', username: '' });
              }}
              className="text-sm text-primary hover:underline"
            >
              {isLogin ? 'ගිණුමක් නැද්ද? ලියාපදිංචි වන්න' : 'දැනටමත් ගිණුමක් තිබේද? ඇතුල් වන්න'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
