import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api";
import type { CreateHomeworkDto, UpdateHomeworkDto } from "../types";

const keys = {
  all: ["homework"] as const,
  byId: (id: string) => ["homework", id] as const,
};

export type Homework = {
  id: string;
  title: string;
  content?: string;
  dateBegin: string;
  dateEnd: string;
  curatorId?: string;
  themeId?: string;
};

export const useHomework = () => {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: keys.all,
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/api/homework");
      if (error) throw error;
      return (data as unknown as Homework[]) || [];
    },
  });

  const create = useMutation({
    mutationFn: async (dto: CreateHomeworkDto) => {
      const { error } = await apiClient.POST("/api/homework", { body: dto });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.all }),
  });

  const update = useMutation({
    mutationFn: async ({ id, dto }: { id: string; dto: UpdateHomeworkDto }) => {
      const { error } = await apiClient.PATCH("/api/homework/{id}", {
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
      const { error } = await apiClient.DELETE("/api/homework/{id}", {
        params: { path: { id } },
      });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.all }),
  });

  return { list, create, update, remove };
};

