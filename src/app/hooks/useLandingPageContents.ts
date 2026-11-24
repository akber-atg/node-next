import { useQuery } from '@tanstack/react-query';

import { getLandingPageContents, getGoogleReviews } from '../services/landingPageService';

export function useLandingPageContents() {
  return useQuery({
    queryKey: ['landingPageContents'],
    queryFn: getLandingPageContents,
  });
}

export function useGoogleReviews() {
  return useQuery({
    queryKey: ['googleReviews'],
    queryFn: getGoogleReviews,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    gcTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    refetchOnWindowFocus: false,
  });
}