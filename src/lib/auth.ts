import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';
import type { AuthUser } from '@/types';

export async function mapSupabaseUser(user: User): Promise<AuthUser> {
  // Fetch user profile to get admin status
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  return {
    id: user.id,
    email: user.email!,
    username: user.user_metadata?.username || user.email!.split('@')[0],
    isAdmin: profile?.is_admin || false,
  };
}

export class AuthService {
  async sendOtp(email: string) {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });
    if (error) throw error;
  }

  async verifyOtpAndSetPassword(email: string, token: string, password: string, username: string) {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });
    if (error) throw error;

    const { error: updateError } = await supabase.auth.updateUser({
      password,
      data: { username },
    });
    if (updateError) throw updateError;

    return data.user;
  }

  async getUserWithProfile(userId: string) {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) throw error || new Error('User not found');
    return await mapSupabaseUser(user);
  }

  async signInWithPassword(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data.user;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  async mapUser(user: User): Promise<AuthUser> {
    return await mapSupabaseUser(user);
  }
}

export const authService = new AuthService();
