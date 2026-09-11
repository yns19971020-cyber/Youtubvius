import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Package, Clock, CheckCircle, XCircle, ShoppingCart, DollarSign, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/hooks/useOrders';
import { authService } from '@/lib/auth';
import { toast } from 'sonner';

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { data: orders, isLoading } = useOrders();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await authService.signOut();
      logout();
      navigate('/');
      toast.success('ඉවත් වුණා!');
    } catch (error: any) {
      toast.error('දෝෂයක්!', { description: error.message });
      setLoggingOut(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'සම්පූර්ණයි';
      case 'processing':
        return 'ක්‍රියාත්මකයි';
      case 'cancelled':
        return 'අවලංගුයි';
      default:
        return 'පොරොත්තුවේ';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 glass-effect sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gradient">Dashboard</h1>
            <p className="text-xs text-muted-foreground">Welcome, {user?.username}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/admin')}
              className="gap-2"
            >
              Admin Panel
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              සේවා මිලදී ගන්න
            </Button>
            <Button
              variant="ghost"
              onClick={handleLogout}
              disabled={loggingOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              ඉවත් වන්න
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats - BulkFollows Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Orders */}
          <div className="glass-effect rounded-xl p-6 hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <Package className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">මුළු ඇණවුම්</p>
            <p className="text-3xl font-bold">{orders?.length || 0}</p>
            <p className="text-xs text-muted-foreground mt-2">සියළු කාලය</p>
          </div>

          {/* Total Spent */}
          <div className="glass-effect rounded-xl p-6 hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">මුළු වියදම</p>
            <p className="text-3xl font-bold">
              {orders?.reduce((sum, o) => sum + Number(o.amount), 0).toLocaleString() || 0}
              <span className="text-lg text-muted-foreground ml-1">LKR</span>
            </p>
            <p className="text-xs text-muted-foreground mt-2">සියළු කාලය</p>
          </div>

          {/* Completed */}
          <div className="glass-effect rounded-xl p-6 hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <Zap className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">සම්පූර්ණ කළ</p>
            <p className="text-3xl font-bold">
              {orders?.filter(o => o.status === 'completed').length || 0}
            </p>
            <p className="text-xs text-green-600 mt-2 font-medium">✓ අවසන්</p>
          </div>

          {/* Processing */}
          <div className="glass-effect rounded-xl p-6 hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-400 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">ක්‍රියාත්මක</p>
            <p className="text-3xl font-bold">
              {orders?.filter(o => o.status === 'processing').length || 0}
            </p>
            <p className="text-xs text-yellow-600 mt-2 font-medium">⏳ පවතී</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">මගේ ඇණවුම්</h2>
          <p className="text-muted-foreground">ඔබගේ සියලුම ඇණවුම් පහතින් බලන්න</p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">පූරණය වෙමින්...</p>
          </div>
        ) : orders && orders.length > 0 ? (
          <div className="grid gap-4">
            {orders.map((order) => (
              <div key={order.id} className="glass-effect rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{order.service?.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString('si-LK')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="text-sm font-medium">{getStatusText(order.status)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Watch Time</p>
                    <p className="font-semibold">{order.service?.watch_time_hours}h</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Likes</p>
                    <p className="font-semibold">{order.service?.likes_count}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Subscribers</p>
                    <p className="font-semibold">{order.service?.subscribers_count}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">මුදල</p>
                    <p className="font-semibold text-primary">{order.amount} LKR</p>
                  </div>
                </div>

                {order.channel_url && (
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">Channel URL</p>
                    <a
                      href={order.channel_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {order.channel_url}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 glass-effect rounded-xl">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">ඇණවුම් කිසිවක් නැත</p>
            <Button onClick={() => navigate('/')} className="gradient-bg">
              දැන් මිලදී ගන්න
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
