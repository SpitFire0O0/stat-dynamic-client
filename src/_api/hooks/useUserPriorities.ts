import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api";
import type { CreateUserPriorityDto, UpdateUserPriorityDto } from "../types";

const keys = {
  all: ["user-priorities"] as const,
  byId: (id: string) => ["user-priorities", id] as const,
};

export type UserPriority = {
  id: string;
  userId: string;
  courseId: string;
  studentGrade: "A" | "B" | "C";
  actualityGrade: "A" | "B" | "C";
};

export const useUserPriorities = () => {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: keys.all,
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/api/user-priority");
      if (error) throw error;
      return (data as unknown as UserPriority[]) || [];
    },
  });

  const create = useMutation({
    mutationFn: async (dto: CreateUserPriorityDto) => {
      const { error } = await apiClient.POST("/api/user-priority", { body: dto });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.all }),
  });

  const update = useMutation({
    mutationFn: async ({ id, dto }: { id: string; dto: UpdateUserPriorityDto }) => {
      const { error } = await apiClient.PATCH("/api/user-priority/{id}", {
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
      const { error } = await apiClient.DELETE("/api/user-priority/{id}", {
        params: { path: { id } },
      });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.all }),
  });

  return { list, create, update, remove };
};

