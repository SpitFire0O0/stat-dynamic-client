import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api";
import type { CreateDisciplineDto, UpdateDisciplineDto } from "../types";

const keys = {
  all: ["disciplines"] as const,
  byId: (id: string) => ["disciplines", id] as const,
};

export const useDisciplines = () => {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: keys.all,
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/api/disciplines");
      if (error) throw error;
      return (data as unknown as any[]) || [];
    },
  });

  const create = useMutation({
    mutationFn: async (dto: CreateDisciplineDto) => {
      const { error } = await apiClient.POST("/api/disciplines", { body: dto });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.all }),
  });

  const update = useMutation({
    mutationFn: async ({ id, dto }: { id: string; dto: UpdateDisciplineDto }) => {
      const { error } = await apiClient.PATCH("/api/disciplines/{id}", {
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
      const { error } = await apiClient.DELETE("/api/disciplines/{id}", {
        params: { path: { id } },
      });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.all }),
  });

  return { list, create, update, remove };
};

