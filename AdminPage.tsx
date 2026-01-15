import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, TrendingUp, DollarSign, Clock, Zap, ListOrdered, Link2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useAllOrders, useUpdateOrderStatus } from '@/hooks/useOrders';
import { bulkfollowsAPI } from '@/lib/bulkfollows-api';
import { supabase } from '@/lib/supabase';
import { OrdersTable } from '@/components/features/OrdersTable';
import { BulkFollowsServicesManager } from '@/components/features/BulkFollowsServicesManager';
import { ServiceMappingManager } from '@/components/features/ServiceMappingManager';

export function AdminPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { data: orders, isLoading, refetch } = useAllOrders();
  const updateStatus = useUpdateOrderStatus();
  const [balance, setBalance] = useState<string | null>(null);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'services' | 'mapping'>('orders');

  // Load BulkFollows balance
  const loadBalance = useCallback(async () => {
    setLoadingBalance(true);
    try {
      const result = await bulkfollowsAPI.getBalance();
      setBalance(result.balance);
      toast.success('Balance loaded!');
    } catch (error: any) {
      console.error('Failed to load balance:', error);
      toast.error('Balance load කරගැනීම අසාර්ථකයි');
    } finally {
      setLoadingBalance(false);
    }
  }, []);

  // Process order with BulkFollows API
  const handleProcessOrder = useCallback(async (orderId: string) => {
    const order = orders?.find(o => o.id === orderId);
    if (!order || !order.channel_url || !order.service) {
      toast.error('Invalid order data');
      return;
    }

    try {
      toast.loading('BulkFollows එකට order එක යවමින්...');
      
      // Get service ID from bulkfollows_service_id
      const serviceId = order.service?.bulkfollows_service_id;
      
      if (!serviceId) {
        toast.error('BulkFollows service mapping නැත! Service Mapping tab එකෙන් configure කරන්න.');
        return;
      }
      
      const result = await bulkfollowsAPI.createOrder({
        service: serviceId,
        link: order.channel_url,
        quantity: order.service.watch_time_hours || order.service.likes_count || order.service.subscribers_count,
      });

      // Update database with SMM order ID
      const { error } = await supabase
        .from('orders')
        .update({
          smm_order_id: result.order.toString(),
          status: 'processing',
        })
        .eq('id', orderId);

      if (error) throw error;

      toast.success(`BulkFollows Order #${result.order} සාර්ථකව යවන ලදී!`);
      refetch();
    } catch (error: any) {
      console.error('Failed to process order:', error);
      toast.error(error.message || 'Order process කිරීම අසාර්ථකයි');
    }
  }, [orders, refetch]);

  // Sync order status from BulkFollows
  const handleSyncStatus = useCallback(async (orderId: string) => {
    const order = orders?.find(o => o.id === orderId);
    if (!order || !order.smm_order_id) {
      toast.error('SMM order ID නැත');
      return;
    }

    try {
      const result = await bulkfollowsAPI.getOrderStatus(parseInt(order.smm_order_id));
      
      // Update database with status
      const { error } = await supabase
        .from('orders')
        .update({
          smm_status: result.status,
          smm_start_count: parseInt(result.start_count),
          smm_remains: parseInt(result.remains),
          status: result.status === 'Completed' ? 'completed' : 'processing',
        })
        .eq('id', orderId);

      if (error) throw error;

      toast.success('Status sync කරන ලදී!');
      refetch();
    } catch (error: any) {
      console.error('Failed to sync status:', error);
      toast.error(error.message || 'Status sync කිරීම අසාර්ථකයි');
    }
  }, [orders, refetch]);

  // Calculate stats
  const stats = {
    totalOrders: orders?.length || 0,
    pending: orders?.filter(o => o.status === 'pending').length || 0,
    processing: orders?.filter(o => o.status === 'processing').length || 0,
    completed: orders?.filter(o => o.status === 'completed').length || 0,
    totalRevenue: orders?.reduce((sum, o) => sum + Number(o.amount), 0) || 0,
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    updateStatus.mutate({ orderId, status: newStatus });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 glass-effect">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="gap-2 hover:bg-primary/10 hover:text-primary transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              මුල් පිටුව
            </Button>
            <div className="h-6 w-px bg-border/50" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Admin Panel</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* BulkFollows Balance */}
            {balance !== null && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm">
                <Zap className="w-4 h-4 text-purple-500 animate-pulse" />
                <span className="text-sm font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">BulkFollows: ${balance}</span>
              </div>
            )}
            <Button 
              variant="outline" 
              size="sm"
              onClick={loadBalance}
              disabled={loadingBalance}
              className="hover:bg-primary hover:text-primary-foreground transition-all duration-300 border-primary/30"
            >
              <Zap className="w-3 h-3 mr-1" />
              {loadingBalance ? 'පූරණය වෙමින්...' : 'Balance'}
            </Button>
            <div className="h-6 w-px bg-border/50" />
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                <p className="text-sm font-medium">{user?.username}</p>
                <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold">ADMIN</span>
              </div>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <Button 
              variant="outline" 
              onClick={logout}
              className="hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300"
            >
              පිටවන්න
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">මුළු ඇණවුම්</p>
              <Package className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold">{stats.totalOrders}</p>
          </div>

          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Pending</p>
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold">{stats.pending}</p>
          </div>

          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Processing</p>
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold">{stats.processing}</p>
          </div>

          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">මුළු ආදායම</p>
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold">{stats.totalRevenue.toLocaleString()} LKR</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          <Button
            variant={activeTab === 'orders' ? 'default' : 'outline'}
            onClick={() => setActiveTab('orders')}
            className={`gap-2 px-6 py-5 transition-all duration-300 ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50 scale-105'
                : 'hover:bg-purple-500/10 hover:border-purple-500 hover:scale-105'
            }`}
          >
            <Package className="w-5 h-5" />
            <span className="font-semibold">ඇණවුම් කළමනාකරණය</span>
          </Button>
          <Button
            variant={activeTab === 'mapping' ? 'default' : 'outline'}
            onClick={() => setActiveTab('mapping')}
            className={`gap-2 px-6 py-5 transition-all duration-300 ${
              activeTab === 'mapping'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50 scale-105'
                : 'hover:bg-purple-500/10 hover:border-purple-500 hover:scale-105'
            }`}
          >
            <Link2 className="w-5 h-5" />
            <span className="font-semibold">Service Mapping</span>
          </Button>
          <Button
            variant={activeTab === 'services' ? 'default' : 'outline'}
            onClick={() => setActiveTab('services')}
            className={`gap-2 px-6 py-5 transition-all duration-300 ${
              activeTab === 'services'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50 scale-105'
                : 'hover:bg-purple-500/10 hover:border-purple-500 hover:scale-105'
            }`}
          >
            <ListOrdered className="w-5 h-5" />
            <span className="font-semibold">Services Browser</span>
          </Button>
        </div>

        {/* Orders Table */}
        {activeTab === 'orders' && (
        <div className="glass-effect rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">ඇණවුම් කළමනාකරණය</h2>
          
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">පූරණය වෙමින්...</p>
            </div>
          ) : orders && orders.length > 0 ? (
            <OrdersTable 
              orders={orders} 
              onStatusUpdate={handleStatusUpdate}
              onProcessOrder={handleProcessOrder}
              onSyncStatus={handleSyncStatus}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">ඇණවුම් කිසිවක් නැත</p>
            </div>
          )}
        </div>
        )}

        {/* Service Mapping Manager */}
        {activeTab === 'mapping' && (
        <div className="glass-effect rounded-xl p-6">
          <ServiceMappingManager />
        </div>
        )}

        {/* BulkFollows Services Browser */}
        {activeTab === 'services' && (
        <div className="glass-effect rounded-xl p-6">
          <BulkFollowsServicesManager />
        </div>
        )}

        {/* Instructions */}
        {activeTab === 'orders' && (
        <div className="glass-effect rounded-xl p-6 mt-6">
          <h3 className="text-lg font-bold mb-4">🚀 BulkFollows API Integration - ස්වයංක්‍රීය ක්‍රියාවලිය:</h3>
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="font-bold text-primary">1.</span>
              <span>නව order එකක් පැමිණෙන විට, "Process" button එක click කරන්න</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">2.</span>
              <span>Automatic ලෙස BulkFollows API එකට order එක යනවා</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">3.</span>
              <span>SMM order ID save වෙලා status automatic ලෙස "Processing" වෙනවා</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">4.</span>
              <span>"Sync" button එකෙන් real-time status update කරන්න පුළුවන්</span>
            </li>
          </ol>
          
          <div className="mt-6 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <p className="text-sm font-medium text-purple-600">✅ BulkFollows API Integration සාර්ථකයි!</p>
            <p className="text-sm text-muted-foreground mt-2">
              BulkFollows provider සම්බන්ධ කර ඇත. Services Browser එකෙන් services browse කරන්න සහ Service Mapping එකෙන් IDs map කරන්න!
            </p>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
