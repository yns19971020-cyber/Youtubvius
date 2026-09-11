import { useState } from 'react';
import { Clock, ThumbsUp, Users, Eye, TrendingUp, Zap, Youtube, Video, Instagram, Facebook, Twitter, Music, Hash } from 'lucide-react';
import { StatCard } from '@/components/features/StatCard';
import { ServiceCard } from '@/components/features/ServiceCard';
import { OrderDialog } from '@/components/features/OrderDialog';
import { Button } from '@/components/ui/button';
import { useServices } from '@/hooks/useServices';
import type { Service } from '@/types';

export function HomePage() {
  const { data: services, isLoading } = useServices();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'youtube' | 'tiktok'>('all');

  const filteredServices = services?.filter(service => 
    selectedPlatform === 'all' || service.platform === selectedPlatform
  );

  const stats = [
    { icon: Clock, title: 'Watch Time', value: '2.5M', change: '+24%', color: 'from-red-500 to-red-600' },
    { icon: ThumbsUp, title: 'Total Likes', value: '156K', change: '+18%', color: 'from-blue-500 to-blue-600' },
    { icon: Users, title: 'Subscribers', value: '89K', change: '+32%', color: 'from-green-500 to-green-600' },
    { icon: Eye, title: 'Views', value: '3.2M', change: '+15%', color: 'from-purple-500 to-purple-600' },
  ];



  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 gradient-bg opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">සැබෑ කාලීන සංඛ්‍යාන</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              YouTube & TikTok<br />
              <span className="text-gradient">වේගයෙන් වර්ධනය</span> කරන්න
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              YouTube Watch Time, TikTok Followers, Likes සහ වැඩිදුර සේවා. ඉක්මන්, ආරක්ෂිත සහ සත්‍ය සේවාව.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="gradient-bg hover:opacity-90 transition-opacity text-base"
                onClick={() => {
                  const servicesSection = document.querySelector('.py-20.bg-secondary\\/30');
                  servicesSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                දැන් ආරම්භ කරන්න
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base border-border hover:bg-secondary"
                onClick={() => {
                  const statsSection = document.querySelector('.py-16.bg-secondary\\/30');
                  statsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                වැඩි විස්තර
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">සජීවී සංඛ්‍යාන</h2>
            <p className="text-muted-foreground">සැබෑ කාලීන දත්ත පදනම් කරගත් ප්‍රතිඵල</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section - BulkFollows Style */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">සමාජ ජාල වේදිකා</h2>
            <p className="text-muted-foreground">
              විවිධ platforms සඳහා සේවා - දැන් YouTube සහ TikTok!
            </p>
          </div>

          {/* Platform Icons Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {[
              { icon: Video, name: 'YouTube', active: true, color: 'from-red-500 to-pink-600', value: 'youtube' },
              { icon: Hash, name: 'TikTok', active: true, color: 'from-gray-800 via-pink-500 to-cyan-400', value: 'tiktok' },
              { icon: Instagram, name: 'Instagram', active: false, color: 'from-purple-500 to-pink-500', value: 'instagram' },
              { icon: Facebook, name: 'Facebook', active: false, color: 'from-blue-600 to-blue-400', value: 'facebook' },
              { icon: Twitter, name: 'Twitter', active: false, color: 'from-blue-400 to-cyan-400', value: 'twitter' },
              { icon: Music, name: 'Spotify', active: false, color: 'from-green-500 to-emerald-400', value: 'spotify' },
            ].map((platform) => (
              <div
                key={platform.name}
                onClick={() => platform.active && setSelectedPlatform(selectedPlatform === platform.value ? 'all' : platform.value as 'youtube' | 'tiktok')}
                className={`glass-effect rounded-xl p-6 text-center transition-all duration-300 ${
                  platform.active
                    ? `border-primary/50 hover:border-primary cursor-pointer hover:scale-105 shadow-lg ${
                      selectedPlatform === platform.value ? 'ring-2 ring-primary scale-105' : ''
                    }`
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center ${
                  platform.active && selectedPlatform === platform.value ? 'animate-pulse' : ''
                }`}>
                  <platform.icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-medium text-sm">{platform.name}</p>
                {platform.active && (
                  <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-green-600 font-medium">Active</span>
                  </div>
                )}
                {!platform.active && (
                  <p className="text-xs text-muted-foreground mt-2">හැදීම</p>
                )}
              </div>
            ))}
          </div>

          {/* Services Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {selectedPlatform === 'youtube' ? 'YouTube සේවා' : 
                 selectedPlatform === 'tiktok' ? 'TikTok සේවා' : 
                 'සියලුම සේවා'}
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-4">ඔබට සුදුසු Package එක තෝරන්න</h3>
            <p className="text-muted-foreground">
              {selectedPlatform === 'youtube' ? 'YouTube channel එක වර්ධනය කරන්න' :
               selectedPlatform === 'tiktok' ? 'TikTok profile එක වර්ධනය කරන්න' :
               'YouTube සහ TikTok සඳහා ප්‍රමිතියෙන් යුත් සේවා'}
            </p>
          </div>
          
          {/* Services Grid */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">පූරණය වෙමින්...</p>
            </div>
          ) : filteredServices && filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onOrder={setSelectedService}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {selectedPlatform === 'all' ? 'සේවා කිසිවක් නැත' : `${selectedPlatform.toUpperCase()} සේවා කිසිවක් නැත`}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center glass-effect rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ඔබේ Channel එක වර්ධනය කරන්න
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              දැන් ආරම්භ කරන්න සහ ඔබේ YouTube සාර්ථකත්වය වේගවත් කරන්න
            </p>
            <Button 
              size="lg" 
              className="gradient-bg hover:opacity-90 transition-opacity text-base"
              onClick={() => {
                const servicesSection = document.querySelector('.py-20.bg-secondary\\/30');
                servicesSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              නොමිලේ උත්සාහ කරන්න
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Youtube className="w-5 h-5 text-primary" />
              <span className="font-semibold">YT Boost</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={() => window.location.href = '/terms'}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Terms & Conditions
              </button>
              <span className="text-muted-foreground">•</span>
              <button
                onClick={() => window.location.href = '/privacy'}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 YT Boost. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {selectedService && (
        <OrderDialog
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}
