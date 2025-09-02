import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api";
import type { CreateGroupDto, UpdateGroupDto } from "../types";

const keys = {
  all: ["groups"] as const,
  byId: (id: string) => ["groups", id] as const,
};

export const useGroups = () => {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: keys.all,
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/api/groups");
      if (error) throw error;
      return (data as unknown as any[]) || [];
    },
  });

  const create = useMutation({
    mutationFn: async (dto: CreateGroupDto) => {
      const { error } = await apiClient.POST("/api/groups", { body: dto });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.all }),
  });

  const update = useMutation({
    mutationFn: async ({ id, dto }: { id: string; dto: UpdateGroupDto }) => {
      const { error } = await apiClient.PATCH("/api/groups/{id}", {
        params: { path: { id } },
        body: dto,
      });
      if (error) throw error;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: keys.all });
      queryClient.invalidateQueries({ queryKey: keys.byId(id) });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await apiClient.DELETE("/api/groups/{id}", {
        params: { path: { id } },
      });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.all }),
  });

  return { list, create, update, remove };
};

