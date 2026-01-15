export interface AuthUser {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
}

export interface Service {
  id: string;
  title: string;
  price: number;
  features: string[];
  watch_time_hours: number;
  likes_count: number;
  subscribers_count: number;
  is_popular: boolean;
  is_active: boolean;
  platform: 'youtube' | 'tiktok';
  jap_service_id?: number;
  bulkfollows_service_id?: number;
  created_at: string;
  // BulkFollows real-time data
  bulkfollows_rate?: string;
  bulkfollows_min?: string;
  bulkfollows_max?: string;
  bulkfollows_name?: string;
}

export interface Order {
  id: string;
  user_id: string;
  service_id: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  channel_url?: string;
  notes?: string;
  smm_order_id?: string;
  smm_status?: string;
  smm_start_count?: number;
  smm_remains?: number;
  created_at: string;
  updated_at: string;
  service?: Service;
}
