import type { CreateUserDto, UpdateUserDto, CreateGroupDto, UpdateGroupDto, CreateDisciplineDto, UpdateDisciplineDto, CreateCourseDto, UpdateCourseDto } from '../../_api/dto';

export type IdKey = 'id' | 'userId' | 'slug';

export type FieldKind = 'text' | 'textarea' | 'select' | 'number';

export interface FieldSpec<TCreate, TUpdate> {
  key: keyof (TCreate & TUpdate) | string; // ключ поля
  label: string; // подпись
  kind: FieldKind;
  options?: Array<{ label: string; value: string | number }>; // для select
}

export interface ColumnSpec<TRow> {
  key: keyof TRow | string;
  title: string;
  accessor?: (row: TRow) => React.ReactNode;
}

export interface EntityConfig<TRow, TCreate, TUpdate> {
  id: string;
  title: string;
  basePath: string; // REST базовый путь
  idKey: keyof TRow & string; // поле идентификатора
  columns: ColumnSpec<TRow>[];
  createFields: FieldSpec<TCreate, TUpdate>[];
  updateFields: FieldSpec<TCreate, TUpdate>[];
}

// Замечание: типы строк (TRow) пока оставляем как any из-за отсутствия схем на ответы в текущей OpenAPI

export const entities = {
  users: {
    id: 'users',
    title: 'Пользователи',
    basePath: '/api/users',
    idKey: 'id',
    columns: [
      { key: 'id', title: 'ID' },
      { key: 'login', title: 'Логин' },
      { key: 'firstName', title: 'Имя' },
      { key: 'lastName', title: 'Фамилия' },
      { key: 'permissions', title: 'Роль' },
    ],
    createFields: [
      { key: 'login', label: 'Логин', kind: 'text' },
      { key: 'password', label: 'Пароль', kind: 'text' },
      { key: 'firstName', label: 'Имя', kind: 'text' },
      { key: 'lastName', label: 'Фамилия', kind: 'text' },
      { key: 'phone', label: 'Телефон', kind: 'text' },
      { key: 'address', label: 'Адрес', kind: 'textarea' },
      { key: 'gender', label: 'Пол', kind: 'select', options: [
        { label: 'Мужской', value: 'MALE' },
        { label: 'Женский', value: 'FEMALE' },
      ] },
      { key: 'permissions', label: 'Права', kind: 'select', options: [
        { label: 'Админ', value: 'ADMIN' },
        { label: 'Учитель', value: 'TEACHER' },
        { label: 'Родитель', value: 'PARENT' },
        { label: 'Ученик', value: 'STUDENT' },
      ] },
    ] satisfies FieldSpec<CreateUserDto, UpdateUserDto>[],
    updateFields: [
      { key: 'firstName', label: 'Имя', kind: 'text' },
      { key: 'lastName', label: 'Фамилия', kind: 'text' },
      { key: 'phone', label: 'Телефон', kind: 'text' },
      { key: 'address', label: 'Адрес', kind: 'textarea' },
      { key: 'gender', label: 'Пол', kind: 'select', options: [
        { label: 'Мужской', value: 'MALE' },
        { label: 'Женский', value: 'FEMALE' },
      ] },
      { key: 'permissions', label: 'Права', kind: 'select', options: [
        { label: 'Админ', value: 'ADMIN' },
        { label: 'Учитель', value: 'TEACHER' },
        { label: 'Родитель', value: 'PARENT' },
        { label: 'Ученик', value: 'STUDENT' },
      ] },
    ] satisfies FieldSpec<CreateUserDto, UpdateUserDto>[],
  } satisfies EntityConfig<any, CreateUserDto, UpdateUserDto>,

  groups: {
    id: 'groups',
    title: 'Группы',
    basePath: '/api/groups',
    idKey: 'id',
    columns: [
      { key: 'id', title: 'ID' },
      { key: 'name', title: 'Название' },
      { key: 'slug', title: 'Слаг' },
      { key: 'curatorId', title: 'Куратор ID' },
    ],
    createFields: [
      { key: 'name', label: 'Название', kind: 'text' },
      { key: 'slug', label: 'Слаг', kind: 'text' },
      { key: 'description', label: 'Описание', kind: 'textarea' },
      { key: 'curatorId', label: 'Куратор ID', kind: 'text' },
    ] satisfies FieldSpec<CreateGroupDto, UpdateGroupDto>[],
    updateFields: [
      { key: 'name', label: 'Название', kind: 'text' },
      { key: 'description', label: 'Описание', kind: 'textarea' },
      { key: 'curatorId', label: 'Куратор ID', kind: 'text' },
    ] satisfies FieldSpec<CreateGroupDto, UpdateGroupDto>[],
  } satisfies EntityConfig<any, CreateGroupDto, UpdateGroupDto>,

  disciplines: {
    id: 'disciplines',
    title: 'Дисциплины',
    basePath: '/api/discipline',
    idKey: 'id',
    columns: [
      { key: 'id', title: 'ID' },
      { key: 'title', title: 'Название' },
    ],
    createFields: [
      { key: 'title', label: 'Название', kind: 'text' },
    ] satisfies FieldSpec<CreateDisciplineDto, UpdateDisciplineDto>[],
    updateFields: [
      { key: 'title', label: 'Название', kind: 'text' },
    ] satisfies FieldSpec<CreateDisciplineDto, UpdateDisciplineDto>[],
  } satisfies EntityConfig<any, CreateDisciplineDto, UpdateDisciplineDto>,

  courses: {
    id: 'courses',
    title: 'Курсы',
    basePath: '/api/course',
    idKey: 'id',
    columns: [
      { key: 'id', title: 'ID' },
      { key: 'title', title: 'Название' },
      { key: 'description', title: 'Описание' },
      { key: 'academicYear', title: 'Год' },
      { key: 'disciplineId', title: 'ID дисциплины' },
    ],
    createFields: [
      { key: 'title', label: 'Название', kind: 'text' },
      { key: 'description', label: 'Описание', kind: 'textarea' },
      { key: 'academicYear', label: 'Учебный год', kind: 'number' },
      { key: 'disciplineId', label: 'ID дисциплины', kind: 'text' },
    ] satisfies FieldSpec<CreateCourseDto, UpdateCourseDto>[],
    updateFields: [
      { key: 'title', label: 'Название', kind: 'text' },
      { key: 'description', label: 'Описание', kind: 'textarea' },
      { key: 'academicYear', label: 'Учебный год', kind: 'number' },
      { key: 'disciplineId', label: 'ID дисциплины', kind: 'text' },
    ] satisfies FieldSpec<CreateCourseDto, UpdateCourseDto>[],
  } satisfies EntityConfig<any, CreateCourseDto, UpdateCourseDto>,
  themes: {
    id: 'themes',
    title: 'Темы',
    basePath: '/api/theme',
    idKey: 'id',
    columns: [
      { key: 'id', title: 'ID' },
      { key: 'courseId', title: 'ID курса' },
      { key: 'title', title: 'Название' },
      { key: 'dateBegin', title: 'Начало' },
      { key: 'dateEnd', title: 'Конец' },
    ],
    createFields: [
      { key: 'courseId', label: 'ID курса', kind: 'text' },
      { key: 'title', label: 'Название', kind: 'text' },
      { key: 'dateBegin', label: 'Начало (ISO)', kind: 'text' },
      { key: 'dateEnd', label: 'Конец (ISO)', kind: 'text' },
    ],
    updateFields: [
      { key: 'title', label: 'Название', kind: 'text' },
      { key: 'dateBegin', label: 'Начало (ISO)', kind: 'text' },
      { key: 'dateEnd', label: 'Конец (ISO)', kind: 'text' },
    ],
  } satisfies EntityConfig<any, any, any>,
  grades: {
    id: 'grades',
    title: 'Оценки',
    basePath: '/api/grades',
    idKey: 'id',
    columns: [
      { key: 'id', title: 'ID' },
      { key: 'grade', title: 'Оценка' },
      { key: 'type', title: 'Тип' },
      { key: 'studentId', title: 'Студент ID' },
      { key: 'teacherId', title: 'Учитель ID' },
      { key: 'courseId', title: 'Курс ID' },
      { key: 'themeId', title: 'Тема ID' },
    ],
    createFields: [
      { key: 'grade', label: 'Оценка (A/B/C)', kind: 'text' },
      { key: 'type', label: 'Тип (HOMEWORK/TEST/EXAM)', kind: 'text' },
      { key: 'studentId', label: 'Студент ID', kind: 'text' },
      { key: 'teacherId', label: 'Учитель ID', kind: 'text' },
      { key: 'courseId', label: 'Курс ID', kind: 'text' },
      { key: 'themeId', label: 'Тема ID', kind: 'text' },
    ],
    updateFields: [
      { key: 'grade', label: 'Оценка (A/B/C)', kind: 'text' },
      { key: 'type', label: 'Тип (HOMEWORK/TEST/EXAM)', kind: 'text' },
    ],
  } satisfies EntityConfig<any, any, any>,
  homework: {
    id: 'homework',
    title: 'Домашние задания',
    basePath: '/api/homework',
    idKey: 'id',
    columns: [
      { key: 'id', title: 'ID' },
      { key: 'title', title: 'Заголовок' },
      { key: 'themeId', title: 'Тема ID' },
      { key: 'curatorId', title: 'Куратор ID' },
      { key: 'dateBegin', title: 'Начало' },
      { key: 'dateEnd', title: 'Конец' },
    ],
    createFields: [
      { key: 'title', label: 'Заголовок', kind: 'text' },
      { key: 'content', label: 'Описание', kind: 'textarea' },
      { key: 'dateBegin', label: 'Начало (ISO)', kind: 'text' },
      { key: 'dateEnd', label: 'Конец (ISO)', kind: 'text' },
      { key: 'curatorId', label: 'Куратор ID', kind: 'text' },
      { key: 'themeId', label: 'Тема ID', kind: 'text' },
    ],
    updateFields: [
      { key: 'title', label: 'Заголовок', kind: 'text' },
      { key: 'content', label: 'Описание', kind: 'textarea' },
    ],
  } satisfies EntityConfig<any, any, any>,
  userPriority: {
    id: 'userPriority',
    title: 'Приоритеты студентов',
    basePath: '/api/user-priority',
    idKey: 'id',
    columns: [
      { key: 'userId', title: 'Пользователь ID' },
      { key: 'courseId', title: 'Курс ID' },
      { key: 'studentGrade', title: 'Оценка ученика' },
      { key: 'actualityGrade', title: 'Оценка активности' },
    ],
    createFields: [
      { key: 'userId', label: 'Пользователь ID', kind: 'text' },
      { key: 'courseId', label: 'Курс ID', kind: 'text' },
      { key: 'studentGrade', label: 'Оценка ученика (A/B/C)', kind: 'text' },
      { key: 'actualityGrade', label: 'Оценка активности (A/B/C)', kind: 'text' },
    ],
    updateFields: [
      { key: 'studentGrade', label: 'Оценка ученика (A/B/C)', kind: 'text' },
      { key: 'actualityGrade', label: 'Оценка активности (A/B/C)', kind: 'text' },
    ],
  } satisfies EntityConfig<any, any, any>,
  meetings: {
    id: 'meetings',
    title: 'Встречи',
    basePath: '/api/meeting',
    idKey: 'id',
    columns: [
      { key: 'id', title: 'ID' },
      { key: 'title', title: 'Заголовок' },
      { key: 'type', title: 'Тип' },
      { key: 'dateBegin', title: 'Начало' },
      { key: 'duration', title: 'Длительность' },
      { key: 'curatorId', title: 'Куратор ID' },
    ],
    createFields: [
      { key: 'title', label: 'Заголовок', kind: 'text' },
      { key: 'content', label: 'Описание', kind: 'textarea' },
      { key: 'type', label: 'Тип (LESSON/EXAM/EVENT)', kind: 'text' },
      { key: 'dateBegin', label: 'Начало (ISO)', kind: 'text' },
      { key: 'duration', label: 'Длительность (ISO)', kind: 'text' },
      { key: 'curatorId', label: 'Куратор ID', kind: 'text' },
    ],
    updateFields: [
      { key: 'title', label: 'Заголовок', kind: 'text' },
      { key: 'content', label: 'Описание', kind: 'textarea' },
      { key: 'type', label: 'Тип (LESSON/EXAM/EVENT)', kind: 'text' },
    ],
  } satisfies EntityConfig<any, any, any>,
  contacts: {
    id: 'contacts',
    title: 'Контакты',
    basePath: '/api/contacts',
    idKey: 'id',
    columns: [
      { key: 'id', title: 'ID' },
      { key: 'type', title: 'Тип' },
      { key: 'content', title: 'Контент' },
      { key: 'userId', title: 'Пользователь ID' },
    ],
    createFields: [
      { key: 'type', label: 'Тип (TELEGRAM/DISCORD/VKONTAKTE/WHATSAPP)', kind: 'text' },
      { key: 'content', label: 'Контент', kind: 'text' },
      { key: 'userId', label: 'Пользователь ID', kind: 'text' },
    ],
    updateFields: [
      { key: 'content', label: 'Контент', kind: 'text' },
    ],
  } satisfies EntityConfig<any, any, any>,
  achievements: {
    id: 'achievements',
    title: 'Достижения',
    basePath: '/api/achievements',
    idKey: 'id',
    columns: [
      { key: 'id', title: 'ID' },
      { key: 'title', title: 'Заголовок' },
      { key: 'grade', title: 'Баллы' },
      { key: 'userId', title: 'Пользователь ID' },
    ],
    createFields: [
      { key: 'title', label: 'Заголовок', kind: 'text' },
      { key: 'content', label: 'Описание', kind: 'textarea' },
      { key: 'grade', label: 'Баллы', kind: 'number' },
      { key: 'userId', label: 'Пользователь ID', kind: 'text' },
    ],
    updateFields: [
      { key: 'title', label: 'Заголовок', kind: 'text' },
      { key: 'content', label: 'Описание', kind: 'textarea' },
      { key: 'grade', label: 'Баллы', kind: 'number' },
    ],
  } satisfies EntityConfig<any, any, any>,
  feedbacks: {
    id: 'feedbacks',
    title: 'Отзывы',
    basePath: '/api/feedbacks',
    idKey: 'id',
    columns: [
      { key: 'id', title: 'ID' },
      { key: 'title', title: 'Заголовок' },
      { key: 'grade', title: 'Оценка' },
      { key: 'userId', title: 'Пользователь ID' },
    ],
    createFields: [
      { key: 'title', label: 'Заголовок', kind: 'text' },
      { key: 'content', label: 'Описание', kind: 'textarea' },
      { key: 'grade', label: 'Оценка (A/B/C)', kind: 'text' },
      { key: 'userId', label: 'Пользователь ID', kind: 'text' },
    ],
    updateFields: [
      { key: 'title', label: 'Заголовок', kind: 'text' },
      { key: 'content', label: 'Описание', kind: 'textarea' },
      { key: 'grade', label: 'Оценка (A/B/C)', kind: 'text' },
    ],
  } satisfies EntityConfig<any, any, any>,
};

export type EntitiesMap = typeof entities;
export type EntityId = keyof EntitiesMap;
