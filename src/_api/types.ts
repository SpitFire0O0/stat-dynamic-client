import type { components, operations, paths } from "./schema";

// Aliases for commonly used DTOs
export type CreateUserDto = components["schemas"]["CreateUserDto"];
export type UpdateUserDto = components["schemas"]["UpdateUserDto"];

export type CreateContactDto = components["schemas"]["CreateContactDto"];
export type UpdateContactDto = components["schemas"]["UpdateContactDto"];

export type CreateFeedbackDto = components["schemas"]["CreateFeedbackDto"];
export type UpdateFeedbackDto = components["schemas"]["UpdateFeedbackDto"];

export type CreateAchievementDto = components["schemas"]["CreateAchievementDto"];
export type UpdateAchievementDto = components["schemas"]["UpdateAchievementDto"];

export type Group = components["schemas"]["GroupResponse"];
export type CreateGroupDto = components["schemas"]["CreateGroupDto"];
export type UpdateGroupDto = components["schemas"]["UpdateGroupDto"];

export type CreateCourseDto = components["schemas"]["CreateCourseDto"];
export type UpdateCourseDto = components["schemas"]["UpdateCourseDto"];

export type CreateDisciplineDto = components["schemas"]["CreateDisciplineDto"];
export type UpdateDisciplineDto = components["schemas"]["UpdateDisciplineDto"];

export type CreateThemeDto = components["schemas"]["CreateThemeDto"];
export type UpdateThemeDto = components["schemas"]["UpdateThemeDto"];

export type CreateUserPriorityDto = components["schemas"]["CreateUserPriorityDto"];
export type UpdateUserPriorityDto = components["schemas"]["UpdateUserPriorityDto"];

export type CreateGradeDto = components["schemas"]["CreateGradeDto"];
export type UpdateGradeDto = components["schemas"]["UpdateGradeDto"];

export type CreateMeetingDto = components["schemas"]["CreateMeetingDto"];
export type UpdateMeetingDto = components["schemas"]["UpdateMeetingDto"];

export type CreateHomeworkDto = components["schemas"]["CreateHomeworkDto"];
export type UpdateHomeworkDto = components["schemas"]["UpdateHomeworkDto"];

// Example endpoint-specific response aliases (if needed)
export type UsersFindAll = paths["/api/users"]["get"]; // note: schema has no typed content for 200
export type UsersCreate = paths["/api/users"]["post"]; // uses CreateUserDto body

// Auth convenience types based on current code expectations
export type LoginCredentials = { login: string; password: string };
export type RefreshResponse = { accessToken: string };
export type AuthResponse = {
  user: unknown; // backend returns a User structure; schema currently leaves it as object
  accessToken: string;
  refreshToken: string;
};

