import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, RefreshCw, Link2 } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  bulkfollows_service_id: number | null;
  watch_time_hours?: number;
  likes_count?: number;
  subscribers_count?: number;
  price?: number;
  features?: string[];
}

export function ServiceMappingManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [mappings, setMappings] = useState<Record<string, string>>({});

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('title');

      if (error) throw error;

      setServices(data || []);

      // Initialize mappings from existing data
      const initialMappings: Record<string, string> = {};
      data?.forEach(service => {
        if (service.bulkfollows_service_id) {
          initialMappings[service.id] = service.bulkfollows_service_id.toString();
        }
      });

      setMappings(initialMappings);
    } catch (error: any) {
      console.error('Failed to load services:', error);
      toast.error('Services load කරගැනීම අසාර්ථකයි');
    } finally {
      setLoading(false);
    }
  };

  const handleMappingChange = (serviceId: string, value: string) => {
    setMappings(prev => ({
      ...prev,
      [serviceId]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Update each service with BulkFollows mapping
      const updates = services.map(async (service) => {
        const serviceId = mappings[service.id] ? parseInt(mappings[service.id]) : null;

        return supabase
          .from('services')
          .update({ 
            bulkfollows_service_id: serviceId,
          })
          .eq('id', service.id);
      });

      await Promise.all(updates);

      toast.success('BulkFollows service mappings සාර්ථකව save කරන ලදී!');
      loadServices();
    } catch (error: any) {
      console.error('Failed to save mappings:', error);
      toast.error('Mappings save කිරීම අසාර්ථකයි');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Link2 className="w-6 h-6 text-primary" />
            BulkFollows Service Mapping
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            BulkFollows service IDs map කරන්න
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={loadServices}
            disabled={loading}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reload
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Mappings
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4">Service Title</th>
              <th className="text-left py-3 px-4">Quantity</th>
              <th className="text-left py-3 px-4">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-bold">
                  BulkFollows Service ID
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="py-3 px-4">
                  <p className="font-medium">{service.title}</p>
                </td>
                <td className="py-3 px-4">
                  <p className="text-sm text-muted-foreground">
                    {service.watch_time_hours ? `${service.watch_time_hours} hours` :
                     service.likes_count ? `${service.likes_count} likes` :
                     service.subscribers_count ? `${service.subscribers_count} subscribers` : '-'}
                  </p>
                </td>
                <td className="py-3 px-4">
                  <Input
                    type="number"
                    placeholder="BulkFollows Service ID"
                    value={mappings[service.id] || ''}
                    onChange={(e) => handleMappingChange(service.id, e.target.value)}
                    className="w-48"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
        <h3 className="font-semibold mb-2">💡 BulkFollows Service Mapping:</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Services Browser එකෙන් BulkFollows service IDs සොයාගන්න</li>
          <li>• ඔබගේ local services වලට BulkFollows service IDs map කරන්න</li>
          <li>• Save button එක click කරන්න ඔබගේ mappings සුරැකීමට</li>
          <li>• Mapping සම්පූර්ණ වුණු පසු Admin Panel එකෙන් orders process කරන්න පුළුවන්</li>
        </ul>
      </div>
    </div>
  );
}
