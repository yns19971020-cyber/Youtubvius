import { Check, Video, Hash, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
  onOrder: (service: Service) => void;
}

export function ServiceCard({ service, onOrder }: ServiceCardProps) {
  const { title, price, features, is_popular, platform, bulkfollows_rate } = service;
  const PlatformIcon = platform === 'youtube' ? Video : Hash;
  const platformColor = platform === 'youtube' ? 'from-red-500 to-pink-600' : 'from-gray-800 via-pink-500 to-cyan-400';
  const hasRealTimePrice = !!bulkfollows_rate;
  
  return (
    <div className={`glass-effect rounded-2xl p-8 relative ${is_popular ? 'border-primary ring-2 ring-primary/20' : ''}`}>
      {/* Platform Badge */}
      <div className="absolute -top-3 -right-3">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${platformColor} flex items-center justify-center shadow-lg border-2 border-background`}>
          <PlatformIcon className="w-6 h-6 text-white" />
        </div>
      </div>
      
      {is_popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="gradient-bg text-white text-xs font-bold px-4 py-1.5 rounded-full">
            වඩාත් ජනප්‍රිය
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-gradient">{price.toLocaleString()}</span>
          <span className="text-muted-foreground">LKR</span>
        </div>
        {hasRealTimePrice && (
          <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
            <TrendingUp className="w-3 h-3 text-green-600 animate-pulse" />
            <span className="text-xs text-green-600 font-medium">Real-time Price</span>
          </div>
        )}
        {bulkfollows_rate && (
          <p className="text-xs text-muted-foreground mt-1">
            BulkFollows: ${bulkfollows_rate} per 1000
          </p>
        )}
      </div>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-primary" />
            </div>
            <span className="text-sm text-foreground/80">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        onClick={() => onOrder(service)}
        className={`w-full ${is_popular ? 'gradient-bg hover:opacity-90' : 'bg-secondary hover:bg-secondary/80'} transition-all`}
      >
        මිලදී ගන්න
      </Button>
    </div>
  );
}
