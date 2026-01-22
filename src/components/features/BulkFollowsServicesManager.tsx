import { useState } from 'react';
import { toast } from 'sonner';
import { bulkfollowsAPI, BulkFollowsService } from '@/lib/bulkfollows-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, RefreshCw, Copy } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function BulkFollowsServicesManager() {
  const [services, setServices] = useState<BulkFollowsService[]>([]);
  const [filteredServices, setFilteredServices] = useState<BulkFollowsService[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const loadServices = async () => {
    setLoading(true);
    try {
      const data = await bulkfollowsAPI.getServices();
      setServices(data);
      setFilteredServices(data);
      toast.success(`${data.length} BulkFollows services load කරන ලදී!`);
    } catch (error: any) {
      console.error('Failed to load BulkFollows services:', error);
      toast.error('BulkFollows services load කරගැනීම අසාර්ථකයි');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(term, selectedCategory, selectedType);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    applyFilters(searchTerm, category, selectedType);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    applyFilters(searchTerm, selectedCategory, type);
  };

  const applyFilters = (term: string, category: string, type: string) => {
    let filtered = services;

    if (term) {
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(term.toLowerCase()) ||
          service.category.toLowerCase().includes(term.toLowerCase()) ||
          service.service.toString().includes(term) // Search by Service ID
      );
    }

    if (category !== 'all') {
      filtered = filtered.filter((service) => service.category === category);
    }

    if (type !== 'all') {
      filtered = filtered.filter((service) => service.type === type);
    }

    setFilteredServices(filtered);
  };

  const copyServiceId = (serviceId: number) => {
    navigator.clipboard.writeText(serviceId.toString());
    toast.success('Service ID copied!');
  };

  const categories = Array.from(new Set(services.map((s) => s.category)));
  const types = Array.from(new Set(services.map((s) => s.type)));
  const youtubeServices = filteredServices.filter((s) =>
    s.category.toLowerCase().includes('youtube')
  );
  const tiktokServices = filteredServices.filter((s) =>
    s.category.toLowerCase().includes('tiktok')
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            BulkFollows Services Browser
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredServices.length} ලැබී ඇත | {youtubeServices.length} YouTube | {tiktokServices.length} TikTok
          </p>
        </div>
        <Button
          onClick={loadServices}
          disabled={loading}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'පූරණය වෙමින්...' : 'Load Services'}
        </Button>
      </div>

      {/* Filters */}
      {services.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="සෙවීම... (service ID, name, category)"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="සියලු Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">සියලු Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={handleTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="සියලු Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">සියලු Types</SelectItem>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Platform Filters */}
      {services.length > 0 && (
        <div className="flex gap-2 mb-6">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => handleCategoryChange('all')}
            className="gap-2"
          >
            සියල්ල ({services.length})
          </Button>
          <Button
            variant={
              selectedCategory.toLowerCase().includes('youtube')
                ? 'default'
                : 'outline'
            }
            onClick={() => {
              const youtubeCategory = categories.find((c) =>
                c.toLowerCase().includes('youtube')
              );
              if (youtubeCategory) handleCategoryChange(youtubeCategory);
            }}
            className="gap-2 bg-gradient-to-r from-red-500 to-pink-500"
          >
            YouTube ({youtubeServices.length})
          </Button>
          <Button
            variant={
              selectedCategory.toLowerCase().includes('tiktok')
                ? 'default'
                : 'outline'
            }
            onClick={() => {
              const tiktokCategory = categories.find((c) =>
                c.toLowerCase().includes('tiktok')
              );
              if (tiktokCategory) handleCategoryChange(tiktokCategory);
            }}
            className="gap-2 bg-gradient-to-r from-gray-800 via-pink-500 to-cyan-400"
          >
            TikTok ({tiktokServices.length})
          </Button>
        </div>
      )}

      {/* Services List */}
      {filteredServices.length > 0 ? (
        <div className="space-y-4">
          {filteredServices.map((service) => (
            <div
              key={service.service}
              className="glass-effect rounded-lg p-4 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-500 text-xs font-bold">
                      #{service.service}
                    </span>
                    <h3 className="font-semibold">{service.name}</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Category:</p>
                      <p className="font-medium">{service.category}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Type:</p>
                      <p className="font-medium">{service.type}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Price:</p>
                      <p className="font-medium text-green-500">
                        $ {service.rate} per 1000
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Min/Max:</p>
                      <p className="font-medium">
                        {service.min} - {service.max}
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyServiceId(service.service)}
                  className="ml-4"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy Service ID
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : services.length > 0 ? (
        <div className="text-center py-12 glass-effect rounded-lg">
          <p className="text-muted-foreground">සේවාවන් හමුනොවිණි...</p>
          <p className="text-sm text-muted-foreground mt-2">
            වෙනත් filters භාවිතා කරන්න
          </p>
        </div>
      ) : (
        <div className="text-center py-12 glass-effect rounded-lg">
          <p className="text-muted-foreground">
            "Load Services" button එක click කරන්න BulkFollows services load කරගන්න
          </p>
        </div>
      )}

      {/* YouTube Watch Time Section */}
      {youtubeServices.length > 0 && (
        <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            💡 YouTube Watch Time Services:
          </h3>
          <div className="space-y-3">
            {youtubeServices
              .filter((s) => s.name.toLowerCase().includes('watch') || s.name.toLowerCase().includes('view'))
              .slice(0, 5)
              .map((service) => {
                const watchHours =
                  service.name.match(/(\d+)K/)?.[1] ||
                  service.name.match(/(\d+) Hours/)?.[1];
                const priceFor4000Hours = watchHours
                  ? ((4000 / parseInt(watchHours)) * parseFloat(service.rate)).toFixed(2)
                  : 'N/A';

                return (
                  <div
                    key={service.service}
                    className="flex items-center justify-between p-3 rounded-lg bg-background/50"
                  >
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-muted-foreground">
                        #{service.service} | Min: {service.min} - Max: {service.max}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-500">
                        ${service.rate}
                        <span className="text-xs text-muted-foreground"> per 1000</span>
                      </p>
                      {watchHours && (
                        <p className="text-xs text-muted-foreground">
                          4000 hours අඩුයි: ${priceFor4000Hours}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* TikTok Services Section */}
      {tiktokServices.length > 0 && (
        <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-pink-500/10 to-cyan-500/10 border border-pink-500/20">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            🎵 TikTok Services:
          </h3>
          <div className="space-y-3">
            {tiktokServices
              .slice(0, 10)
              .map((service) => (
                <div
                  key={service.service}
                  className="flex items-center justify-between p-3 rounded-lg bg-background/50"
                >
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground">
                      #{service.service} | Min: {service.min} - Max: {service.max}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-500">
                      ${service.rate}
                      <span className="text-xs text-muted-foreground"> per 1000</span>
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
