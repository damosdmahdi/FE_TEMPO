import { useQuery } from '@tanstack/react-query';
import api from '../../../services/api';

const CACHE_PREFIX = 'hmik_cached_proker_';
const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds

export const fetchProgramKerja = async (paramsStr = '') => {
  const cacheKey = `${CACHE_PREFIX}${paramsStr}`;
  const cacheTimeKey = `${cacheKey}_time`;
  const cachedData = localStorage.getItem(cacheKey);
  const cachedTime = localStorage.getItem(cacheTimeKey);
  const now = Date.now();

  // Return fresh cache (< 1 hour) if available
  if (cachedData && cachedTime && (now - Number(cachedTime)) < ONE_HOUR) {
    try {
      return JSON.parse(cachedData);
    } catch (e) {
      // Fallback if cache parse fails
    }
  }

  // Fetch from Azure live REST API
  const endpoint = `/program-kerja${paramsStr}`;
  const data = await api.get(endpoint);

  // Save to localStorage cache
  if (data) {
    try {
      localStorage.setItem(cacheKey, JSON.stringify(data));
      localStorage.setItem(cacheTimeKey, now.toString());
    } catch (e) {
      console.warn('Failed to save program kerja data to localStorage cache', e);
    }
  }

  return data;
};

export const useProgramKerja = (paramsStr = '') => {
  return useQuery({
    queryKey: ['program-kerja', paramsStr],
    queryFn: () => fetchProgramKerja(paramsStr),
    staleTime: ONE_HOUR,
    gcTime: ONE_HOUR * 24,
  });
};
