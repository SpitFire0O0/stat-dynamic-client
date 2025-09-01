/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateUserDto {
  /**
   * User Login
   * @example "example@email.com"
   */
  login: string;
  /**
   * User Password
   * @example "!Qwert123"
   */
  password: string;
  /**
   * User First name
   * @example "Дмитрий"
   */
  firstName: string;
  /**
   * User Last name
   * @example "Иванов"
   */
  lastName: string;
  /**
   * User Birthday
   * @format date-time
   * @example "2010-01-01T03:00:00.002Z"
   */
  birthday: string;
  /**
   * User Phone number
   * @example "81230000000"
   */
  phone: string;
  /**
   * User Address
   * @example "Россия, г. Москва, ул. Ленина, д. 10, кв. 10"
   */
  address: string;
  /**
   * User Gender
   * @example "MALE"
   */
  gender: "MALE" | "FEMALE";
  /**
   * User Permission
   * @example "USER"
   */
  permissions: "ADMIN" | "TEACHER" | "PARENT" | "STUDENT";
}

export type UserDto = object;

export type UpdateUserDto = object;

export type AuthDTO = object;

export interface CreateContactDto {
  /**
   * Contact User ID
   * @example "f7c5208d-911c-43db-84aa-19eda9ae50a5"
   */
  userId: string;
  /**
   * Contact Type
   * @example "TELEGRAM"
   */
  type: "TELEGRAM" | "DISCORD" | "VKONTAKTE" | "WHATSAPP";
  /**
   * Contact Content
   * @example "@example"
   */
  content: string;
}

export type ContactDto = object;

export type UpdateContactDto = object;

export interface CreateFeedbackDto {
  /**
   * Feedback User ID
   * @example "f7c5208d-911c-43db-84aa-19eda9ae50a5"
   */
  userId: string;
  /**
   * Feedback Title
   * @example "Алгебра 01.01.2025"
   */
  title: string;
  /**
   * Feedback Content
   * @example "Занятие в целом прошло отлично, но я бы уделил больше внимания на решение уравнений у доски для более точного усвоения и понимания пройденного материала"
   */
  content: string;
  /**
   * Feedback Grade
   * @example "A"
   */
  grade: "A" | "B" | "C";
}

export type FeedbackDto = object;

export type UpdateFeedbackDto = object;

export interface CreateAchievementDto {
  /**
   * Achievement User ID
   * @example "f7c5208d-911c-43db-84aa-19eda9ae50a5"
   */
  userId: string;
  /**
   * Achievement Title
   * @example "Олимпиада по программированию 2025"
   */
  title: string;
  /**
   * Achievement Content
   * @example "Описание олимпиады, даты проведения, условия и т.п."
   */
  content: string;
  /**
   * Achievement Grade
   * @example 90
   */
  grade: number;
}

export type AchievementDto = object;

export type UpdateAchievementDto = object;

export interface CreateGroupDto {
  /**
   * Group Name
   * @example "11-2024"
   */
  name: string;
  /**
   * Group Slug
   * @example "11-2024"
   */
  slug: string;
  /**
   * Description
   * @example "Group for 11 class 2024 year"
   */
  description?: string;
  /**
   * Curator ID of Group
   * @example "f7c5208d-911c-43db-84aa-19eda9ae50a5"
   */
  curatorId: string;
}

export type GroupDto = object;

export type UpdateGroupDto = object;

export interface CreateCourseDto {
  /**
   * Course Title
   * @example "АЛГ-25"
   */
  title: string;
  /**
   * Course Title
   * @example "Курс Алгебры для потока студентов 2025 г."
   */
  description: string;
  /**
   * Course Academic year
   * @example 2025
   */
  academicYear: number;
  /**
   * Course Discipline ID
   * @example "f7c5208d-911c-43db-84aa-19eda9ae50a5"
   */
  disciplineId: string;
}

export type CourseDto = object;

export interface UpdateCourseDto {
  /**
   * Course Title
   * @example "АЛГ-25"
   */
  title?: string;
  /**
   * Course Title
   * @example "Курс Алгебры для потока студентов 2025 г."
   */
  description?: string;
  /**
   * Course Academic year
   * @example 2025
   */
  academicYear?: number;
  /**
   * Course Discipline ID
   * @example "f7c5208d-911c-43db-84aa-19eda9ae50a5"
   */
  disciplineId?: string;
}

export interface CreateDisciplineDto {
  /**
   * Feedback Title
   * @example "Алгебра"
   */
  title: string;
}

export type DisciplineDto = object;

export interface UpdateDisciplineDto {
  /**
   * Feedback Title
   * @example "Алгебра"
   */
  title?: string;
}

export interface CreateThemeDto {
  /**
   * Theme Course ID
   * @example "f7c5208d-911c-43db-84aa-19eda9ae50a5"
   */
  courseId: string;
  /**
   * Theme Title
   * @example "Логорифмы"
   */
  title: string;
  /**
   * Theme Date of begin
   * @format date-time
   * @example "2025-01-01T03:00:00.002Z"
   */
  dateBegin: string;
  /**
   * Theme Date of end
   * @format date-time
   * @example "2025-02-01T03:00:00.002Z"
   */
  dateEnd: string;
}

export type ThemeDto = object;

export interface UpdateThemeDto {
  /**
   * Theme Course ID
   * @example "f7c5208d-911c-43db-84aa-19eda9ae50a5"
   */
  courseId?: string;
  /**
   * Theme Title
   * @example "Логорифмы"
   */
  title?: string;
  /**
   * Theme Date of begin
   * @format date-time
   * @example "2025-01-01T03:00:00.002Z"
   */
  dateBegin?: string;
  /**
   * Theme Date of end
   * @format date-time
   * @example "2025-02-01T03:00:00.002Z"
   */
  dateEnd?: string;
}

export interface CreateUserPriorityDto {
  /**
   * Priority Student grade
   * @example "A"
   */
  studentGrade: "A" | "B" | "C";
  /**
   * Priority Activity grade
   * @example "B"
   */
  actualityGrade: "A" | "B" | "C";
  /**
   * Priority User ID
   * @example "f7c5208d-911c-43db-84aa-19eda9ae50a5"
   */
  userId: string;
  /**
   * Priority Course ID
   * @example "f7c5208d-911c-43db-84aa-19eda9ae50a5"
   */
  courseId: string;
}

export type UserPriorityDto = object;

export interface UpdateUserPriorityDto {
  /**
   * Priority Student grade
   * @example "A"
   */
  studentGrade?: "A" | "B" | "C";
  /**
   * Priority Activity grade
   * @example "B"
   */
  actualityGrade?: "A" | "B" | "C";
  /**
   * Priority User ID
   * @example "f7c5208d-911c-43db-84aa-19eda9ae50a5"
   */
  userId?: string;
  /**
   * Priority Course ID
   * @example "f7c5208d-911c-43db-84aa-19eda9ae50a5"
   */
  courseId?: string;
}

export interface CreateGradeDto {
  /**
   * Grade Value
   * @example "A"
   */
  grade: string;
  /**
   * Grade Type
   * @example "HOMEWORK"
   */
  type: "HOMEWORK" | "TEST" | "EXAM";
  /**
   * Grade Student ID
   * @example "f7c5208d-911c-43db-84aa-19eda9ae50a5"
   */
  studentId: string;
  /**
   * Grade Teacher ID
   * @example "f7c5208d-911c-43db-84aa-19eda9ae50a5"
   */
  teacherId: string;
  /**
   * Grade Course ID
   * @example "f7c5208d-911c-43db-84aa-19eda9ae50a5"
   */
  courseId: string;
  /**
   * Grade Theme ID
   * @example "f7c5208d-911c-43db-84aa-19eda9ae50a5"
   */
  themeId: string;
}

export type GradeDto = object;

export interface UpdateGradeDto {
  /**
   * Grade Value
   * @example "A"
   */
  grade?: string;
  /**
   * Grade Type
   * @example "HOMEWORK"
   */
  type?: "HOMEWORK" | "TEST" | "EXAM";
  /**
   * Grade Student ID
   * @example "f7c5208d-911c-43db-84aa-19eda9ae50a5"
   */
  studentId?: string;
  /**
   * Grade Teacher ID
   * @example "f7c5208d-911c-43db-84aa-19eda9ae50a5"
   */
  teacherId?: string;
  /**
   * Grade Course ID
   * @example "f7c5208d-911c-43db-84aa-19eda9ae50a5"
   */
  courseId?: string;
  /**
   * Grade Theme ID
   * @example "f7c5208d-911c-43db-84aa-19eda9ae50a5"
   */
  themeId?: string;
}

export interface CreateMeetingDto {
  /**
   * Meeting Title
   * @example "Математика"
   */
  title: string;
  /**
   * Meeting Description
   * @example "каб. 204, Иванов Д.С."
   */
  content: string;
  /**
   * Meeting Type
   * @example "LESSON"
   */
  type: "LESSON" | "EXAM" | "EVENT";
  /**
   * Meeting Date begin
   * @format date-time
   * @example "2025-01-01T03:00:00.002Z"
   */
  dateBegin: string;
  /**
   * Meeting Date duration
   * @format date-time
   * @example "100000"
   */
  duration: string;
  /**
   * Meeting Curator ID
   * @example "f7c5208d-911c-43db-84aa-19eda9ae50a5"
   */
  curatorId: string;
}

export type MeetingDto = object;

export interface UpdateMeetingDto {
  /**
   * Meeting Title
   * @example "Математика"
   */
  title?: string;
  /**
   * Meeting Description
   * @example "каб. 204, Иванов Д.С."
   */
  content?: string;
  /**
   * Meeting Type
   * @example "LESSON"
   */
  type?: "LESSON" | "EXAM" | "EVENT";
  /**
   * Meeting Date begin
   * @format date-time
   * @example "2025-01-01T03:00:00.002Z"
   */
  dateBegin?: string;
  /**
   * Meeting Date duration
   * @format date-time
   * @example "100000"
   */
  duration?: string;
  /**
   * Meeting Curator ID
   * @example "f7c5208d-911c-43db-84aa-19eda9ae50a5"
   */
  curatorId?: string;
}

export type MeetingUsersDto = object;

export interface CreateHomeworkDto {
  /**
   * Homework Title
   * @example "Логорифмы #10"
   */
  title: string;
  /**
   * Homework Description
   * @example "Логорифмы #10 (Иванов Д.П.)"
   */
  content: string;
  /**
   * Homework Date begin
   * @format date-time
   * @example "2025-01-01T03:00:00.002Z"
   */
  dateBegin: string;
  /**
   * Homework Date end
   * @format date-time
   * @example "2025-02-01T03:00:00.002Z"
   */
  dateEnd: string;
  /**
   * Homework Curator ID
   * @example "f7c5208d-911c-43db-84aa-19eda9ae50a5"
   */
  curatorId: string;
  /**
   * Meeting Theme ID
   * @example "f7c5208d-911c-43db-84aa-19eda9ae50a5"
   */
  themeId: string;
}

export type HomeworkDto = object;

export interface UpdateHomeworkDto {
  /**
   * Homework Title
   * @example "Логорифмы #10"
   */
  title?: string;
  /**
   * Homework Description
   * @example "Логорифмы #10 (Иванов Д.П.)"
   */
  content?: string;
  /**
   * Homework Date begin
   * @format date-time
   * @example "2025-01-01T03:00:00.002Z"
   */
  dateBegin?: string;
  /**
   * Homework Date end
   * @format date-time
   * @example "2025-02-01T03:00:00.002Z"
   */
  dateEnd?: string;
  /**
   * Homework Curator ID
   * @example "f7c5208d-911c-43db-84aa-19eda9ae50a5"
   */
  curatorId?: string;
  /**
   * Meeting Theme ID
   * @example "f7c5208d-911c-43db-84aa-19eda9ae50a5"
   */
  themeId?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Stat Dynamic API
 * @version 1.0.0
 * @contact SpitFire <spit-fire.ooo@mail.ru> (https://github.com/spitfireooo?tab=repositories)
 *
 * API documentation for Stat Dynamic Application
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags User
     * @name UserControllerCreate
     * @request POST:/api/users
     */
    userControllerCreate: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<UserDto, any>({
        path: `/api/users`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerFindAll
     * @request GET:/api/users
     */
    userControllerFindAll: (params: RequestParams = {}) =>
      this.request<UserDto[], any>({
        path: `/api/users`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerFindOne
     * @request GET:/api/users/{id}
     */
    userControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<UserDto, any>({
        path: `/api/users/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerUpdate
     * @request PATCH:/api/users/{id}
     */
    userControllerUpdate: (
      id: string,
      data: UpdateUserDto,
      params: RequestParams = {},
    ) =>
      this.request<UserDto, any>({
        path: `/api/users/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerRemove
     * @request DELETE:/api/users/{id}
     */
    userControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<UserDto, any>({
        path: `/api/users/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogin
     * @request POST:/api/auth/login
     */
    authControllerLogin: (params: RequestParams = {}) =>
      this.request<AuthDTO, any>({
        path: `/api/auth/login`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerRefresh
     * @request POST:/api/auth/refresh
     */
    authControllerRefresh: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/auth/refresh`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerCurrent
     * @request GET:/api/auth/current
     */
    authControllerCurrent: (params: RequestParams = {}) =>
      this.request<UserDto, any>({
        path: `/api/auth/current`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogout
     * @request DELETE:/api/auth/logout
     */
    authControllerLogout: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/auth/logout`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contact
     * @name ContactControllerCreate
     * @request POST:/api/contacts
     */
    contactControllerCreate: (
      data: CreateContactDto,
      params: RequestParams = {},
    ) =>
      this.request<ContactDto, any>({
        path: `/api/contacts`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contact
     * @name ContactControllerFindAll
     * @request GET:/api/contacts
     */
    contactControllerFindAll: (params: RequestParams = {}) =>
      this.request<ContactDto[], any>({
        path: `/api/contacts`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contact
     * @name ContactControllerFindOne
     * @request GET:/api/contacts/{id}
     */
    contactControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<ContactDto, any>({
        path: `/api/contacts/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contact
     * @name ContactControllerUpdate
     * @request PATCH:/api/contacts/{id}
     */
    contactControllerUpdate: (
      id: string,
      data: UpdateContactDto,
      params: RequestParams = {},
    ) =>
      this.request<ContactDto, any>({
        path: `/api/contacts/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contact
     * @name ContactControllerDelete
     * @request DELETE:/api/contacts/{id}
     */
    contactControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<ContactDto, any>({
        path: `/api/contacts/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contact
     * @name ContactControllerFindByUserId
     * @request GET:/api/contacts/user/{userId}
     */
    contactControllerFindByUserId: (
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<ContactDto[], any>({
        path: `/api/contacts/user/${userId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Feedback
     * @name FeedbackControllerCreate
     * @request POST:/api/feedbacks
     */
    feedbackControllerCreate: (
      data: CreateFeedbackDto,
      params: RequestParams = {},
    ) =>
      this.request<FeedbackDto, any>({
        path: `/api/feedbacks`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Feedback
     * @name FeedbackControllerFindAll
     * @request GET:/api/feedbacks
     */
    feedbackControllerFindAll: (params: RequestParams = {}) =>
      this.request<FeedbackDto[], any>({
        path: `/api/feedbacks`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Feedback
     * @name FeedbackControllerFindOne
     * @request GET:/api/feedbacks/{id}
     */
    feedbackControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<FeedbackDto, any>({
        path: `/api/feedbacks/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Feedback
     * @name FeedbackControllerUpdate
     * @request PATCH:/api/feedbacks/{id}
     */
    feedbackControllerUpdate: (
      id: string,
      data: UpdateFeedbackDto,
      params: RequestParams = {},
    ) =>
      this.request<FeedbackDto, any>({
        path: `/api/feedbacks/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Feedback
     * @name FeedbackControllerRemove
     * @request DELETE:/api/feedbacks/{id}
     */
    feedbackControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<FeedbackDto, any>({
        path: `/api/feedbacks/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Achievement
     * @name AchievementControllerCreate
     * @request POST:/api/achievements
     */
    achievementControllerCreate: (
      data: CreateAchievementDto,
      params: RequestParams = {},
    ) =>
      this.request<AchievementDto, any>({
        path: `/api/achievements`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Achievement
     * @name AchievementControllerFindAll
     * @request GET:/api/achievements
     */
    achievementControllerFindAll: (params: RequestParams = {}) =>
      this.request<AchievementDto[], any>({
        path: `/api/achievements`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Achievement
     * @name AchievementControllerFindOne
     * @request GET:/api/achievements/{id}
     */
    achievementControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<AchievementDto, any>({
        path: `/api/achievements/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Achievement
     * @name AchievementControllerUpdate
     * @request PATCH:/api/achievements/{id}
     */
    achievementControllerUpdate: (
      id: string,
      data: UpdateAchievementDto,
      params: RequestParams = {},
    ) =>
      this.request<AchievementDto, any>({
        path: `/api/achievements/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Achievement
     * @name AchievementControllerRemove
     * @request DELETE:/api/achievements/{id}
     */
    achievementControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<AchievementDto, any>({
        path: `/api/achievements/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Achievement
     * @name AchievementControllerFindByUserId
     * @request GET:/api/achievements/user/{userId}
     */
    achievementControllerFindByUserId: (
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<AchievementDto[], any>({
        path: `/api/achievements/user/${userId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Create Group
     *
     * @tags Group
     * @name GroupControllerCreate
     * @summary Create Group
     * @request POST:/api/groups
     */
    groupControllerCreate: (data: CreateGroupDto, params: RequestParams = {}) =>
      this.request<GroupDto, any>({
        path: `/api/groups`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Find All Groups
     *
     * @tags Group
     * @name GroupControllerFindAll
     * @summary Find All Groups
     * @request GET:/api/groups
     */
    groupControllerFindAll: (params: RequestParams = {}) =>
      this.request<GroupDto[], void>({
        path: `/api/groups`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Find Group by ID
     *
     * @tags Group
     * @name GroupControllerFindOne
     * @summary Find One Group
     * @request GET:/api/groups/{id}
     */
    groupControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<GroupDto, void>({
        path: `/api/groups/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Update Group by ID
     *
     * @tags Group
     * @name GroupControllerUpdate
     * @summary Update Group
     * @request PATCH:/api/groups/{id}
     */
    groupControllerUpdate: (
      id: string,
      data: UpdateGroupDto,
      params: RequestParams = {},
    ) =>
      this.request<GroupDto, any>({
        path: `/api/groups/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete Group by ID
     *
     * @tags Group
     * @name GroupControllerRemove
     * @summary Delete Group
     * @request DELETE:/api/groups/{id}
     */
    groupControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<GroupDto, any>({
        path: `/api/groups/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * @description Append User in Group
     *
     * @tags Group
     * @name GroupControllerAppendUser
     * @summary Append User in Group
     * @request POST:/api/groups/{id}/append
     */
    groupControllerAppendUser: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/groups/${id}/append`,
        method: "POST",
        ...params,
      }),

    /**
     * @description Remove User from Group
     *
     * @tags Group
     * @name GroupControllerRemoveUser
     * @summary Remove User from Group
     * @request DELETE:/api/groups/{id}/remove
     */
    groupControllerRemoveUser: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/groups/${id}/remove`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Course
     * @name CourseControllerCreate
     * @request POST:/api/course
     */
    courseControllerCreate: (
      data: CreateCourseDto,
      params: RequestParams = {},
    ) =>
      this.request<CourseDto, any>({
        path: `/api/course`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Course
     * @name CourseControllerFindAll
     * @request GET:/api/course
     */
    courseControllerFindAll: (params: RequestParams = {}) =>
      this.request<CourseDto[], any>({
        path: `/api/course`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Course
     * @name CourseControllerFindOne
     * @request GET:/api/course/{id}
     */
    courseControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<CourseDto, any>({
        path: `/api/course/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Course
     * @name CourseControllerUpdate
     * @request PATCH:/api/course/{id}
     */
    courseControllerUpdate: (
      id: string,
      data: UpdateCourseDto,
      params: RequestParams = {},
    ) =>
      this.request<CourseDto, any>({
        path: `/api/course/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Course
     * @name CourseControllerRemove
     * @request DELETE:/api/course/{id}
     */
    courseControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<CourseDto, any>({
        path: `/api/course/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Discipline
     * @name DisciplineControllerCreate
     * @request POST:/api/discipline
     */
    disciplineControllerCreate: (
      data: CreateDisciplineDto,
      params: RequestParams = {},
    ) =>
      this.request<DisciplineDto, any>({
        path: `/api/discipline`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Discipline
     * @name DisciplineControllerFindAll
     * @request GET:/api/discipline
     */
    disciplineControllerFindAll: (params: RequestParams = {}) =>
      this.request<DisciplineDto[], any>({
        path: `/api/discipline`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Discipline
     * @name DisciplineControllerFindOne
     * @request GET:/api/discipline/{id}
     */
    disciplineControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<DisciplineDto, any>({
        path: `/api/discipline/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Discipline
     * @name DisciplineControllerUpdate
     * @request PATCH:/api/discipline/{id}
     */
    disciplineControllerUpdate: (
      id: string,
      data: UpdateDisciplineDto,
      params: RequestParams = {},
    ) =>
      this.request<DisciplineDto, any>({
        path: `/api/discipline/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Discipline
     * @name DisciplineControllerRemove
     * @request DELETE:/api/discipline/{id}
     */
    disciplineControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<DisciplineDto, any>({
        path: `/api/discipline/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Theme
     * @name ThemeControllerCreate
     * @request POST:/api/theme
     */
    themeControllerCreate: (data: CreateThemeDto, params: RequestParams = {}) =>
      this.request<ThemeDto, any>({
        path: `/api/theme`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Theme
     * @name ThemeControllerFindAll
     * @request GET:/api/theme
     */
    themeControllerFindAll: (params: RequestParams = {}) =>
      this.request<ThemeDto[], any>({
        path: `/api/theme`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Theme
     * @name ThemeControllerFindOne
     * @request GET:/api/theme/{id}
     */
    themeControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<ThemeDto, any>({
        path: `/api/theme/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Theme
     * @name ThemeControllerUpdate
     * @request PATCH:/api/theme/{id}
     */
    themeControllerUpdate: (
      id: string,
      data: UpdateThemeDto,
      params: RequestParams = {},
    ) =>
      this.request<ThemeDto, any>({
        path: `/api/theme/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Theme
     * @name ThemeControllerRemove
     * @request DELETE:/api/theme/{id}
     */
    themeControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<ThemeDto, any>({
        path: `/api/theme/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserPriority
     * @name UserPriorityControllerCreate
     * @request POST:/api/user-priority
     */
    userPriorityControllerCreate: (
      data: CreateUserPriorityDto,
      params: RequestParams = {},
    ) =>
      this.request<UserPriorityDto, any>({
        path: `/api/user-priority`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserPriority
     * @name UserPriorityControllerFindAll
     * @request GET:/api/user-priority
     */
    userPriorityControllerFindAll: (params: RequestParams = {}) =>
      this.request<UserPriorityDto[], any>({
        path: `/api/user-priority`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserPriority
     * @name UserPriorityControllerFindByUserId
     * @request GET:/api/user-priority/{id}
     */
    userPriorityControllerFindByUserId: (
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<UserPriorityDto, any>({
        path: `/api/user-priority/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserPriority
     * @name UserPriorityControllerFindOne
     * @request GET:/api/user-priority/{id}/{courseId}
     */
    userPriorityControllerFindOne: (
      id: string,
      userId: string,
      courseId: string,
      params: RequestParams = {},
    ) =>
      this.request<UserPriorityDto, any>({
        path: `/api/user-priority/${id}/${courseId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserPriority
     * @name UserPriorityControllerUpdate
     * @request PATCH:/api/user-priority/{id}/{courseId}
     */
    userPriorityControllerUpdate: (
      id: string,
      userId: string,
      courseId: string,
      data: UpdateUserPriorityDto,
      params: RequestParams = {},
    ) =>
      this.request<UserPriorityDto, any>({
        path: `/api/user-priority/${id}/${courseId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserPriority
     * @name UserPriorityControllerRemove
     * @request DELETE:/api/user-priority/{id}/{userId}
     */
    userPriorityControllerRemove: (
      id: string,
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<UserPriorityDto, any>({
        path: `/api/user-priority/${id}/${userId}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Grade
     * @name GradeControllerCreate
     * @request POST:/api/grades
     */
    gradeControllerCreate: (data: CreateGradeDto, params: RequestParams = {}) =>
      this.request<GradeDto, any>({
        path: `/api/grades`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Grade
     * @name GradeControllerFindAll
     * @request GET:/api/grades
     */
    gradeControllerFindAll: (params: RequestParams = {}) =>
      this.request<GradeDto[], any>({
        path: `/api/grades`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Grade
     * @name GradeControllerFindOne
     * @request GET:/api/grades/{id}
     */
    gradeControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<GradeDto, any>({
        path: `/api/grades/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Grade
     * @name GradeControllerUpdate
     * @request PATCH:/api/grades/{id}
     */
    gradeControllerUpdate: (
      id: string,
      data: UpdateGradeDto,
      params: RequestParams = {},
    ) =>
      this.request<GradeDto, any>({
        path: `/api/grades/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Grade
     * @name GradeControllerRemove
     * @request DELETE:/api/grades/{id}
     */
    gradeControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<GradeDto, any>({
        path: `/api/grades/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Meeting
     * @name MeetingControllerCreate
     * @request POST:/api/meeting
     */
    meetingControllerCreate: (
      data: CreateMeetingDto,
      params: RequestParams = {},
    ) =>
      this.request<MeetingDto, any>({
        path: `/api/meeting`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Meeting
     * @name MeetingControllerFindAll
     * @request GET:/api/meeting
     */
    meetingControllerFindAll: (params: RequestParams = {}) =>
      this.request<MeetingDto[], any>({
        path: `/api/meeting`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Meeting
     * @name MeetingControllerFindOne
     * @request GET:/api/meeting/{id}
     */
    meetingControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<MeetingDto, any>({
        path: `/api/meeting/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Meeting
     * @name MeetingControllerUpdate
     * @request PATCH:/api/meeting/{id}
     */
    meetingControllerUpdate: (
      id: string,
      data: UpdateMeetingDto,
      params: RequestParams = {},
    ) =>
      this.request<MeetingDto, any>({
        path: `/api/meeting/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Meeting
     * @name MeetingControllerRemove
     * @request DELETE:/api/meeting/{id}
     */
    meetingControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<MeetingDto, any>({
        path: `/api/meeting/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Meeting
     * @name MeetingControllerGetFeedbacks
     * @request GET:/api/meeting/{id}/feedback
     */
    meetingControllerGetFeedbacks: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/meeting/${id}/feedback`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Meeting
     * @name MeetingControllerAppendFeedback
     * @request POST:/api/meeting/{id}/feedback
     */
    meetingControllerAppendFeedback: (id: string, params: RequestParams = {}) =>
      this.request<MeetingDto, any>({
        path: `/api/meeting/${id}/feedback`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Meeting
     * @name MeetingControllerRemoveFeedback
     * @request DELETE:/api/meeting/{id}/feedback
     */
    meetingControllerRemoveFeedback: (id: string, params: RequestParams = {}) =>
      this.request<MeetingDto, any>({
        path: `/api/meeting/${id}/feedback`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Meeting
     * @name MeetingControllerAppendUser
     * @request POST:/api/meeting/{id}/user
     */
    meetingControllerAppendUser: (id: string, params: RequestParams = {}) =>
      this.request<MeetingDto, any>({
        path: `/api/meeting/${id}/user`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Meeting
     * @name MeetingControllerUpdateUser
     * @request PATCH:/api/meeting/{id}/user
     */
    meetingControllerUpdateUser: (id: string, params: RequestParams = {}) =>
      this.request<MeetingUsersDto, any>({
        path: `/api/meeting/${id}/user`,
        method: "PATCH",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Meeting
     * @name MeetingControllerRemoveUser
     * @request DELETE:/api/meeting/{id}/user
     */
    meetingControllerRemoveUser: (id: string, params: RequestParams = {}) =>
      this.request<MeetingDto, any>({
        path: `/api/meeting/${id}/user`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Homework
     * @name HomeworkControllerCreate
     * @request POST:/api/homework
     */
    homeworkControllerCreate: (
      data: CreateHomeworkDto,
      params: RequestParams = {},
    ) =>
      this.request<HomeworkDto, any>({
        path: `/api/homework`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Homework
     * @name HomeworkControllerFindAll
     * @request GET:/api/homework
     */
    homeworkControllerFindAll: (params: RequestParams = {}) =>
      this.request<HomeworkDto[], any>({
        path: `/api/homework`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Homework
     * @name HomeworkControllerFindOne
     * @request GET:/api/homework/{id}
     */
    homeworkControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<HomeworkDto, any>({
        path: `/api/homework/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Homework
     * @name HomeworkControllerUpdate
     * @request PATCH:/api/homework/{id}
     */
    homeworkControllerUpdate: (
      id: string,
      data: UpdateHomeworkDto,
      params: RequestParams = {},
    ) =>
      this.request<HomeworkDto, any>({
        path: `/api/homework/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Homework
     * @name HomeworkControllerRemove
     * @request DELETE:/api/homework/{id}
     */
    homeworkControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<HomeworkDto, any>({
        path: `/api/homework/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),
  };
}
