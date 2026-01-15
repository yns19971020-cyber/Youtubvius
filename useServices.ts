import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { bulkfollowsAPI } from '@/lib/bulkfollows-api';
import type { Service } from '@/types';

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      // Fetch currency rate from app_settings
      const { data: currencyData } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', 'currency_rate_usd_to_lkr')
        .single();

      const currencyRate = currencyData?.value?.rate || 300; // Default to 300 if not found

      // Fetch database services
      const { data: dbServices, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('price', { ascending: true });

      if (error) throw error;

      // Try to fetch BulkFollows real-time prices
      try {
        const bulkfollowsServices = await bulkfollowsAPI.getServices();
        
        // Create a map of BulkFollows services by ID for quick lookup
        const bulkfollowsMap = new Map(
          bulkfollowsServices.map(s => [s.service, s])
        );

        // Merge real-time prices with database services
        const servicesWithRealPrices = dbServices.map(service => {
          if (service.bulkfollows_service_id) {
            const bulkfollowsService = bulkfollowsMap.get(service.bulkfollows_service_id);
            if (bulkfollowsService) {
              // Convert BulkFollows price (per 1000) to LKR using dynamic rate
              const pricePerThousand = parseFloat(bulkfollowsService.rate);
              const priceInLKR = Math.round(pricePerThousand * currencyRate);
              
              return {
                ...service,
                price: priceInLKR,
                bulkfollows_rate: bulkfollowsService.rate,
                bulkfollows_min: bulkfollowsService.min,
                bulkfollows_max: bulkfollowsService.max,
                bulkfollows_name: bulkfollowsService.name,
              };
            }
          }
          return service;
        });

        return servicesWithRealPrices as Service[];
      } catch (bulkfollowsError) {
        // If BulkFollows API fails, return database prices as fallback
        console.warn('Failed to fetch BulkFollows prices, using database prices:', bulkfollowsError);
        return dbServices as Service[];
      }
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchInterval: 1000 * 60 * 10, // Auto-refresh every 10 minutes
  });
}
