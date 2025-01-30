import { useQuery as useReactQuery } from '@tanstack/react-query';

export interface QueryOptions<T> {
  queryKey: string[];
  queryFn: () => Promise<T>;
  enabled?: boolean;
  staleTime?: number;
  retry?: boolean | number;
}

export function useQuery<T>({
  queryKey,
  queryFn,
  enabled = true,
  staleTime = 5 * 60 * 1000, // 5 minutes
  retry = 3,
}: QueryOptions<T>) {
  return useReactQuery<T, Error>({
    queryKey,
    queryFn,
    enabled,
    staleTime,
    retry,
  });
}

// Example usage:
/*
const { data, isLoading, error } = useQuery({
  queryKey: ['users', userId],
  queryFn: () => fetch(`/api/users/${userId}`).then(res => res.json()),
});
*/
