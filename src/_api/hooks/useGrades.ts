import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api";
import type { CreateGradeDto, UpdateGradeDto } from "../types";

const keys = {
  all: ["grades"] as const,
  byId: (id: string) => ["grades", id] as const,
};

export type Grade = {
  id: string;
  grade: string;
  type: "HOMEWORK" | "TEST" | "EXAM" | string;
  studentId: string;
  teacherId: string;
  courseId: string;
  themeId: string;
  createdAt?: string;
};

export const useGrades = () => {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: keys.all,
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/api/grades");
      if (error) throw error;
      return (data as unknown as Grade[]) || [];
    },
  });

  const create = useMutation({
    mutationFn: async (dto: CreateGradeDto) => {
      const { error } = await apiClient.POST("/api/grades", { body: dto });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.all }),
  });

  const update = useMutation({
    mutationFn: async ({ id, dto }: { id: string; dto: UpdateGradeDto }) => {
      const { error } = await apiClient.PATCH("/api/grades/{id}", {
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
      const { error } = await apiClient.DELETE("/api/grades/{id}", {
        params: { path: { id } },
      });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.all }),
  });

  return { list, create, update, remove };
};

