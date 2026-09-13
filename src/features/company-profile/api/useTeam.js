import { useQuery } from '@tanstack/react-query';
import api from '../../../services/api';

const CACHE_KEY = 'hmik_cached_team_data';
const CACHE_TIME_KEY = 'hmik_cached_team_timestamp';
const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds

export const fetchTeam = async () => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
  const now = Date.now();

  // If local cache exists and is fresh (< 1 hour), return cached data without hitting Azure API
  if (cachedData && cachedTime && (now - Number(cachedTime)) < ONE_HOUR) {
    try {
      return JSON.parse(cachedData);
    } catch (e) {
      // Fallback to API if JSON parse fails
    }
  }

  // Fetch live data from Azure API
  const data = await api.get('/company-profile/team');

  // Save to localStorage cache
  if (data) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(CACHE_TIME_KEY, now.toString());
    } catch (e) {
      console.warn('Failed to save team data to localStorage cache', e);
    }
  }

  return data;
};

export const useTeam = () => {
  return useQuery({
    queryKey: ['company-profile-team'],
    queryFn: fetchTeam,
    staleTime: ONE_HOUR, // Keep fresh for 1 hour in React Query
    gcTime: ONE_HOUR * 24, // Keep in memory for 24 hours
  });
};
