import { ExternalLink, Send, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Order } from '@/types';

interface OrdersTableProps {
  orders: Order[];
  onStatusUpdate: (orderId: string, newStatus: string) => void;
  onProcessOrder?: (orderId: string) => void;
  onSyncStatus?: (orderId: string) => void;
}

export function OrdersTable({ orders, onStatusUpdate, onProcessOrder, onSyncStatus }: OrdersTableProps) {
  const [processingOrders, setProcessingOrders] = useState<Set<string>>(new Set());

  const handleProcessOrder = async (orderId: string) => {
    if (!onProcessOrder) return;
    setProcessingOrders(prev => new Set(prev).add(orderId));
    try {
      await onProcessOrder(orderId);
    } finally {
      setProcessingOrders(prev => {
        const next = new Set(prev);
        next.delete(orderId);
        return next;
      });
    }
  };

  const handleSyncStatus = async (orderId: string) => {
    if (!onSyncStatus) return;
    setProcessingOrders(prev => new Set(prev).add(orderId));
    try {
      await onSyncStatus(orderId);
    } finally {
      setProcessingOrders(prev => {
        const next = new Set(prev);
        next.delete(orderId);
        return next;
      });
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30';
      case 'processing':
        return 'bg-blue-500/20 text-blue-600 border-blue-500/30';
      case 'completed':
        return 'bg-green-500/20 text-green-600 border-green-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-600 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-600 border-gray-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'processing': return 'Processing';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border/50">
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
              දිනය
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
              Package
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
              Channel
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
              මුදල
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
              Status
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
              SMM Panel
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
              <td className="py-4 px-4 text-sm">
                {new Date(order.created_at).toLocaleDateString('si-LK')}
              </td>
              <td className="py-4 px-4">
                <div>
                  <p className="font-medium">{order.service?.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {order.service?.watch_time_hours}h | {order.service?.likes_count} likes
                  </p>
                </div>
              </td>
              <td className="py-4 px-4">
                {order.channel_url ? (
                  <a
                    href={order.channel_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary hover:underline text-sm"
                  >
                    <span className="max-w-[150px] truncate">බලන්න</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-muted-foreground text-sm">-</span>
                )}
              </td>
              <td className="py-4 px-4 font-semibold">
                {Number(order.amount).toLocaleString()} LKR
              </td>
              <td className="py-4 px-4">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
              </td>
              <td className="py-4 px-4">
                {order.smm_order_id ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-xs font-mono">#{order.smm_order_id}</span>
                    </div>
                    {order.smm_status && (
                      <p className="text-xs text-muted-foreground">{order.smm_status}</p>
                    )}
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">-</span>
                )}
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  {!order.smm_order_id && order.channel_url && onProcessOrder && (
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleProcessOrder(order.id)}
                      disabled={processingOrders.has(order.id)}
                      className="h-8 text-xs gap-1.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span className="font-semibold">Process</span>
                    </Button>
                  )}
                  {order.smm_order_id && onSyncStatus && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSyncStatus(order.id)}
                      disabled={processingOrders.has(order.id)}
                      className="h-8 text-xs gap-1.5 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300 hover:scale-105 shadow-sm"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span className="font-semibold">Sync</span>
                    </Button>
                  )}
                  <Select
                    value={order.status}
                    onValueChange={(value) => onStatusUpdate(order.id, value)}
                  >
                    <SelectTrigger className="w-[120px] h-7 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
