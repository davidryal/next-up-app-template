import { useQuery as useReactQuery } from '@tanstack/react-query';

interface QueryOptions<T> {
  queryKey: string[];
  queryFn: () => Promise<T>;
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  retry?: boolean | number;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export function useQuery<T>({
  queryKey,
  queryFn,
  enabled = true,
  staleTime = 5 * 60 * 1000, // 5 minutes
  cacheTime = 30 * 60 * 1000, // 30 minutes
  retry = 3,
  onSuccess,
  onError,
}: QueryOptions<T>) {
  return useReactQuery({
    queryKey,
    queryFn,
    enabled,
    staleTime,
    cacheTime,
    retry,
    onSuccess,
    onError,
  });
}

// Example usage:
/*
const { data, isLoading, error } = useQuery({
  queryKey: ['users', userId],
  queryFn: () => fetch(`/api/users/${userId}`).then(res => res.json()),
  onSuccess: (data) => {
    console.log('Data fetched successfully:', data);
  },
  onError: (error) => {
    console.error('Error fetching data:', error);
  },
});
*/
