// Алиасы DTO на базе актуальной OpenAPI-схемы (минимум самописных типов)
import type { components } from './schema';

export type CreateUserDto = components['schemas']['CreateUserDto'];
export type UpdateUserDto = components['schemas']['UpdateUserDto'];

export type CreateContactDto = components['schemas']['CreateContactDto'];
export type UpdateContactDto = components['schemas']['UpdateContactDto'];

export type CreateFeedbackDto = components['schemas']['CreateFeedbackDto'];
export type UpdateFeedbackDto = components['schemas']['UpdateFeedbackDto'];

export type CreateAchievementDto = components['schemas']['CreateAchievementDto'];
export type UpdateAchievementDto = components['schemas']['UpdateAchievementDto'];

export type CreateGroupDto = components['schemas']['CreateGroupDto'];
export type UpdateGroupDto = components['schemas']['UpdateGroupDto'];

export type CreateCourseDto = components['schemas']['CreateCourseDto'];
export type UpdateCourseDto = components['schemas']['UpdateCourseDto'];

export type CreateDisciplineDto = components['schemas']['CreateDisciplineDto'];
export type UpdateDisciplineDto = components['schemas']['UpdateDisciplineDto'];

export type CreateThemeDto = components['schemas']['CreateThemeDto'];
export type UpdateThemeDto = components['schemas']['UpdateThemeDto'];

export type CreateUserPriorityDto = components['schemas']['CreateUserPriorityDto'];
export type UpdateUserPriorityDto = components['schemas']['UpdateUserPriorityDto'];

export type CreateGradeDto = components['schemas']['CreateGradeDto'];
export type UpdateGradeDto = components['schemas']['UpdateGradeDto'];

export type CreateMeetingDto = components['schemas']['CreateMeetingDto'];
export type UpdateMeetingDto = components['schemas']['UpdateMeetingDto'];

export type CreateHomeworkDto = components['schemas']['CreateHomeworkDto'];
export type UpdateHomeworkDto = components['schemas']['UpdateHomeworkDto'];
