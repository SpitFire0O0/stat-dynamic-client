import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api";
import type { CreateUserDto, UpdateUserDto } from "../types";
import type { User } from "../../store/auth.store";

const keys = {
  all: ["users"] as const,
  byId: (id: string) => ["users", id] as const,
};

export const useUsers = () => {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: keys.all,
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/api/users");
      if (error) throw error;
      return (data as unknown as User[]) || [];
    },
  });

  const create = useMutation({
    mutationFn: async (dto: CreateUserDto) => {
      const { error } = await apiClient.POST("/api/users", { body: dto });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.all }),
  });

  const update = useMutation({
    mutationFn: async ({ id, dto }: { id: string; dto: UpdateUserDto }) => {
      const { error } = await apiClient.PATCH("/api/users/{id}", {
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
      const { error } = await apiClient.DELETE("/api/users/{id}", {
        params: { path: { id } },
      });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.all }),
  });

  return { list, create, update, remove };
};

