'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProxies, toggleProxy } from '../proxies';

export function useProxies(uid?: string | null) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['proxies', uid],
    queryFn: () => (uid ? getProxies(uid) : []),
    enabled: !!uid,
  });

  const mutation = useMutation({
    mutationFn: ({ id, value }: { id: string; value: boolean }) =>
      toggleProxy(id, value),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData<any[]>(['proxies', uid], (old) =>
        old?.map((p) =>
          p.id === variables.id ? { ...p, is_active: variables.value } : p,
        ) ?? [],
      );
    },
  });

  const handleToggle = (id: string, current: boolean) => {
    mutation.mutate({ id, value: !current });
  };

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    toggleProxy: handleToggle,
  };
}
