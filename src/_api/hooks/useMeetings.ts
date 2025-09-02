import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api";
import type { CreateMeetingDto, UpdateMeetingDto } from "../types";

const keys = {
  all: ["meetings"] as const,
  byId: (id: string) => ["meetings", id] as const,
};

export type Meeting = {
  id: string;
  title: string;
  content?: string;
  type: "LESSON" | "EXAM" | "EVENT" | string;
  dateBegin: string; // ISO
  duration?: string; // server uses string
  curatorId?: string;
};

export const useMeetings = () => {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: keys.all,
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/api/meeting");
      if (error) throw error;
      return (data as unknown as Meeting[]) || [];
    },
  });

  const create = useMutation({
    mutationFn: async (dto: CreateMeetingDto) => {
      const { error } = await apiClient.POST("/api/meeting", { body: dto });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.all }),
  });

  const update = useMutation({
    mutationFn: async ({ id, dto }: { id: string; dto: UpdateMeetingDto }) => {
      const { error } = await apiClient.PATCH("/api/meeting/{id}", {
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
      const { error } = await apiClient.DELETE("/api/meeting/{id}", {
        params: { path: { id } },
      });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.all }),
  });

  return { list, create, update, remove };
};

