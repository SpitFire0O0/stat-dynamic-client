import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { requestList, requestCreate, requestUpdate, requestDelete } from '../../_api/crud';

export interface CrudOptions<TCreate, TUpdate> {
  basePath: string;
  idKey: string;
}

export const useCrudResource = <TRow = any, TCreate = any, TUpdate = any>({ basePath, idKey }: CrudOptions<TCreate, TUpdate>) => {
  const qc = useQueryClient();

  const listQuery = useQuery({
    queryKey: ['crud', basePath, 'list'],
    queryFn: async (): Promise<TRow[]> => await requestList<TRow>(basePath),
  });

  const createMutation = useMutation({
    mutationFn: async (payload: TCreate) => await requestCreate(basePath, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['crud', basePath, 'list'] }),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: TUpdate }) => await requestUpdate(basePath, id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['crud', basePath, 'list'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => await requestDelete(basePath, id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['crud', basePath, 'list'] }),
  });

  return {
    listQuery,
    create: (payload: TCreate) => createMutation.mutate(payload),
    update: (id: string, payload: TUpdate) => updateMutation.mutate({ id, payload }),
    remove: (id: string) => deleteMutation.mutate(id),
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isRemoving: deleteMutation.isPending,
  };
};
