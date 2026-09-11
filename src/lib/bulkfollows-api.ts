import { supabase } from './supabase';
import { FunctionsHttpError } from '@supabase/supabase-js';

export interface BulkFollowsService {
  service: number;
  name: string;
  type: string;
  rate: string;
  min: string;
  max: string;
  category: string;
  refill?: boolean;
  cancel?: boolean;
}

export interface BulkFollowsOrderResponse {
  order: number;
}

export interface BulkFollowsStatusResponse {
  charge: string;
  start_count: string;
  status: string;
  remains: string;
  currency: string;
}

export interface BulkFollowsBalanceResponse {
  balance: string;
  currency: string;
}

async function invokeBulkFollowsFunction(action: string, params: any = {}) {
  const { data, error } = await supabase.functions.invoke('bulkfollows-panel', {
    body: { action, ...params },
  });

  if (error) {
    let errorMessage = error.message;
    if (error instanceof FunctionsHttpError) {
      try {
        const statusCode = error.context?.status ?? 500;
        const textContent = await error.context?.text();
        errorMessage = `[Code: ${statusCode}] ${textContent || error.message || 'Unknown error'}`;
      } catch {
        errorMessage = error.message || 'Failed to communicate with BulkFollows panel';
      }
    }
    throw new Error(errorMessage);
  }

  return data;
}

export const bulkfollowsAPI = {
  async getServices(): Promise<BulkFollowsService[]> {
    return await invokeBulkFollowsFunction('services');
  },

  async getBalance(): Promise<BulkFollowsBalanceResponse> {
    return await invokeBulkFollowsFunction('balance');
  },

  async createOrder(params: {
    service: number;
    link: string;
    quantity: number;
    extra?: any;
  }): Promise<BulkFollowsOrderResponse> {
    return await invokeBulkFollowsFunction('add', params);
  },

  async getOrderStatus(orderId: number): Promise<BulkFollowsStatusResponse> {
    return await invokeBulkFollowsFunction('status', { order: orderId });
  },

  async getMultipleOrderStatus(orderIds: number[]): Promise<Record<string, BulkFollowsStatusResponse>> {
    return await invokeBulkFollowsFunction('status', { orders: orderIds });
  },

  async refillOrder(orderId: number) {
    return await invokeBulkFollowsFunction('refill', { order: orderId });
  },

  async cancelOrders(orderIds: number[]) {
    return await invokeBulkFollowsFunction('cancel', { orders: orderIds });
  },
};
