import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api";
import type { CreateThemeDto, UpdateThemeDto } from "../types";

const keys = {
  all: ["themes"] as const,
  byId: (id: string) => ["themes", id] as const,
};

export type Theme = {
  id: string;
  courseId: string;
  title: string;
  dateBegin: string;
  dateEnd: string;
};

export const useThemes = () => {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: keys.all,
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/api/theme");
      if (error) throw error;
      return (data as unknown as Theme[]) || [];
    },
  });

  const create = useMutation({
    mutationFn: async (dto: CreateThemeDto) => {
      const { error } = await apiClient.POST("/api/theme", { body: dto });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.all }),
  });

  const update = useMutation({
    mutationFn: async ({ id, dto }: { id: string; dto: UpdateThemeDto }) => {
      const { error } = await apiClient.PATCH("/api/theme/{id}", {
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
      const { error } = await apiClient.DELETE("/api/theme/{id}", {
        params: { path: { id } },
      });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.all }),
  });

  return { list, create, update, remove };
};

