import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Order } from '@/types';
import { toast } from 'sonner';

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, service:services(*)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Order[];
    },
  });
}

export function useAllOrders() {
  return useQuery({
    queryKey: ['all-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, service:services(*)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Order[];
    },
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData: {
      service_id: string;
      amount: number;
      channel_url?: string;
      notes?: string;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          ...orderData,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('ඇණවුම සාර්ථකයි!', {
        description: 'ඔබගේ ඇණවුම සාර්ථකව ස්ථාපිත කර ඇත',
      });
    },
    onError: (error: Error) => {
      toast.error('දෝෂයක්!', {
        description: error.message,
      });
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-orders'] });
      toast.success('Status යාවත්කාලීන කර ඇත!');
    },
    onError: (error: Error) => {
      toast.error('දෝෂයක්!', {
        description: error.message,
      });
    },
  });
}
