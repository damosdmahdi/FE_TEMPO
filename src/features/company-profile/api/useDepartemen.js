import { useQuery } from '@tanstack/react-query';
import api from '../../../services/api';

const CACHE_KEY = 'hmik_cached_departemen_data';
const CACHE_TIME_KEY = 'hmik_cached_departemen_timestamp';
const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds

export const fetchDepartemen = async () => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
  const now = Date.now();

  // Return fresh cache (< 1 hour) if available
  if (cachedData && cachedTime && (now - Number(cachedTime)) < ONE_HOUR) {
    try {
      return JSON.parse(cachedData);
    } catch (e) {
      // Fallback if cache parse fails
    }
  }

  // Fetch live data from Azure REST API
  const data = await api.get('/departemen');

  // Save to localStorage cache
  if (data) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(CACHE_TIME_KEY, now.toString());
    } catch (e) {
      console.warn('Failed to save departemen data to localStorage cache', e);
    }
  }

  return data;
};

export const useDepartemen = () => {
  return useQuery({
    queryKey: ['departemen-list'],
    queryFn: fetchDepartemen,
    staleTime: ONE_HOUR,
    gcTime: ONE_HOUR * 24,
  });
};
