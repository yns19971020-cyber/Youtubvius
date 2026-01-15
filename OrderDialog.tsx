import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Link as LinkIcon, Package, ShoppingCart, ExternalLink, CreditCard, Building2, Copy, CheckCircle2, Video, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useCreateOrder } from '@/hooks/useOrders';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import type { Service } from '@/types';

interface OrderDialogProps {
  service: Service;
  onClose: () => void;
}

export function OrderDialog({ service, onClose }: OrderDialogProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const createOrder = useCreateOrder();
  const [channelUrl, setChannelUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'wise'>('wise');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [wiseDetails, setWiseDetails] = useState<any>(null);
  
  const PlatformIcon = service.platform === 'youtube' ? Video : Hash;
  const platformName = service.platform === 'youtube' ? 'YouTube' : 'TikTok';
  const platformPlaceholder = service.platform === 'youtube' 
    ? 'https://youtube.com/@yourchannel'
    : 'https://tiktok.com/@yourusername';

  // Load Bank payment details from database
  useEffect(() => {
    async function loadBankDetails() {
      const { data } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', 'wise_payment_details')
        .single();
      
      if (data?.value) {
        setWiseDetails(data.value);
      }
    }
    loadBankDetails();
  }, []);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast.success(`${fieldName} copied!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      navigate('/auth');
      return;
    }

    if (paymentMethod === 'stripe') {
      toast.info('Stripe payment එකතු වෙමින් පවතී...');
      return;
    }

    // For Bank payments, create order directly in pending status
    createOrder.mutate(
      {
        service_id: service.id,
        amount: service.price,
        channel_url: channelUrl,
        notes: `[BANK TRANSFER] ${notes}`,
      },
      {
        onSuccess: () => {
          toast.success('ඇණවුම සාර්ථකයි! Bank transfer එක සම්පූර්ණ කර screenshot එක admin වෙත එවන්න.');
          onClose();
          navigate('/dashboard');
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg glass-effect rounded-2xl p-6 relative animate-in fade-in zoom-in duration-200 border-2 border-primary/20 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">නව ඇණවුමක්</h2>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <PlatformIcon className="w-3 h-3" />
              {platformName} Service
            </p>
          </div>
        </div>

        {/* Service Info */}
        <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-purple-600/10 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Service</span>
          </div>
          <p className="text-sm font-medium">{service.title}</p>
        </div>

        <div className="glass-effect rounded-lg p-4 mb-6">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Watch Time</p>
              <p className="font-semibold">{service.watch_time_hours}h</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Likes</p>
              <p className="font-semibold">{service.likes_count}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Subscribers</p>
              <p className="font-semibold">{service.subscribers_count}</p>
            </div>
          </div>
          <div className="pt-4 border-t border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">මුළු මුදල</span>
              <span className="text-2xl font-bold text-gradient">{service.price} LKR</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Payment Method Selection */}
          <div>
            <label className="text-sm font-medium mb-3 block">Payment Method තෝරන්න</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('wise')}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  paymentMethod === 'wise'
                    ? 'border-primary bg-primary/10 shadow-lg scale-105'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <Building2 className={`w-8 h-8 mx-auto mb-2 ${
                  paymentMethod === 'wise' ? 'text-primary' : 'text-muted-foreground'
                }`} />
                <p className="text-sm font-semibold">Bank Transfer</p>
                <p className="text-xs text-muted-foreground mt-1">Local Banks</p>
              </button>
              
              <button
                type="button"
                onClick={() => setPaymentMethod('stripe')}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  paymentMethod === 'stripe'
                    ? 'border-primary bg-primary/10 shadow-lg scale-105'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <CreditCard className={`w-8 h-8 mx-auto mb-2 ${
                  paymentMethod === 'stripe' ? 'text-primary' : 'text-muted-foreground'
                }`} />
                <p className="text-sm font-semibold">Stripe</p>
                <p className="text-xs text-muted-foreground mt-1">Card Payment</p>
              </button>
            </div>
          </div>

          {/* Bank Payment Details */}
          {paymentMethod === 'wise' && (
            <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-green-600" />
                <h3 className="font-bold text-green-600">Bank Transfer Details</h3>
              </div>
              
              <div className="space-y-2 text-sm">
                {wiseDetails?.banks ? (
                  <>
                    {wiseDetails.banks.map((bank: any, index: number) => (
                      <div key={index} className="p-3 rounded-lg bg-background/50 border border-green-500/20 space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-green-600">{bank.name}</p>
                          <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-600">#{index + 1}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">Account Number</p>
                            <p className="font-medium text-foreground">{bank.account_number}</p>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(bank.account_number, `${bank.name} Account`)}
                          >
                            {copiedField === `${bank.name} Account` ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">Account Name</p>
                            <p className="font-medium text-foreground">{bank.account_name}</p>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(bank.account_name, 'Account Name')}
                          >
                            {copiedField === 'Account Name' ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}

                    <div className="flex items-center justify-between p-2 rounded bg-background/50 mt-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Amount</p>
                        <p className="font-bold text-green-600">{service.price} LKR</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(service.price.toString(), 'Amount')}
                      >
                        {copiedField === 'Amount' ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4 text-muted-foreground text-sm">
                    Payment details පූරණය වෙමින්...
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-green-500/20">
                <p className="text-xs text-green-600 font-medium mb-1">📝 Instructions:</p>
                <ol className="text-xs text-muted-foreground space-y-1 ml-4 list-decimal">
                  <li>ඉහත bank accounts වලින් එකක් තෝරා transfer කරන්න</li>
                  <li>Payment screenshot එක save කරන්න</li>
                  <li>Order submit කරලා admin වෙත screenshot එක එවන්න</li>
                  <li>Verification පසු order processing ආරම්භ වෙනවා</li>
                </ol>
                {wiseDetails?.note && (
                  <p className="text-xs text-green-600 mt-2 font-medium">💡 {wiseDetails.note}</p>
                )}
              </div>
            </div>
          )}

          <div>
            <label className="text-sm font-medium mb-2 flex items-center gap-2">
              <PlatformIcon className="w-4 h-4" />
              {platformName} {service.platform === 'youtube' ? 'Channel' : 'Profile'} Link <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="url"
                placeholder={platformPlaceholder}
                className="pl-10 border-primary/30 focus:border-primary"
                value={channelUrl}
                onChange={(e) => setChannelUrl(e.target.value)}
                required
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              ඔබේ {platformName} {service.platform === 'youtube' ? 'channel' : 'profile'} එකේ URL එක paste කරන්න
            </p>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">විශේෂ අවශ්‍යතා (Optional)</label>
            <Textarea
              placeholder="ඔබට විශේෂ අවශ්‍යතා තිබේ නම් මෙහි ලියන්න..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={createOrder.isPending}
            className="w-full h-12 text-base font-bold bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            {createOrder.isPending ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ඇණවුම කරමින්...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                {paymentMethod === 'wise' ? (
                  <Building2 className="w-5 h-5" />
                ) : (
                  <CreditCard className="w-5 h-5" />
                )}
                Submit Order - {service.price.toLocaleString()} LKR
              </span>
            )}
          </Button>

          {/* Info Footer */}
          <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <p className="text-xs text-green-600 font-medium">
              {paymentMethod === 'wise' ? '✓ Bank Transfer (Sampath/Commercial)' : '✓ Stripe Secure Payment'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {paymentMethod === 'wise'
                ? 'Payment verify කිරීමෙන් පසු order processing ආරම්භ වේ'
                : 'ඔබගේ payment ආරක්ෂිතව සකසන ලදී'}
            </p>
          </div>
        </form>

        {!user && (
          <p className="text-xs text-center text-muted-foreground mt-4">
            ඇණවුමක් තැබීමට පළමුව ඇතුල් වන්න අවශ්‍යයි
          </p>
        )}
      </div>
    </div>
  );
}
