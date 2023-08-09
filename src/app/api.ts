import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post, Project, MyInfo, User } from "types";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["Post", "Project", "MyInfo", "User"],
  endpoints: (build) => ({
    // Auth
    register: build.mutation<void, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/api/v1/members/join",
        method: "POST",
        body: credentials,
      }),
    }),

    login: build.mutation<void, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/api/v1/members/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // MyInfo
    getMyInfo: build.query<MyInfo, null>({
      query: () => "/members/me",
      providesTags: [{ type: "MyInfo", id: "LIST" }],
    }),

    likePost: build.mutation<void, number>({
      query: (id) => ({
        url: `/post/like/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: String(arg) },
        { type: "MyInfo", id: "LIST" },
      ],
    }),

    likeProject: build.mutation<void, number>({
      query: (id) => ({
        url: `/project/like/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Project", id: String(arg) },
        { type: "MyInfo", id: "LIST" },
      ],
    }),

    createChatRoom: build.mutation<void, number>({
      query: (userId) => ({
        url: `/chat/create/${userId}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "MyInfo", id: "LIST" }],
    }),

    // Users
    getUser: build.query<User, number>({
      query: (id) => `/members/${id}`,
      providesTags: (result, error, arg) => [{ type: "User", id: String(arg) }],
    }),

    // Post
    getAllPosts: build.query<{ data: Post[] }, null>({
      query: () => "/post/postAll",
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Post" as const,
                id: String(id),
              })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),

    getPost: build.query<{ data: Post }, number>({
      query: (id) => `/post/${id}`,
      providesTags: (result, error, arg) => [{ type: "Post", id: String(arg) }],
    }),

    createPost: build.mutation<void, { title: string; content: string }>({
      query: (post) => ({
        url: "/post/create",
        method: "POST",
        body: {
          subject: post.title,
          content: post.content,
        },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),

    deletePost: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/post/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: String(arg.id) },
      ],
    }),

    // Project
    getAllProjects: build.query<{ data: Project[] }, null>({
      query: () => "/project/projectAll",
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Project" as const,
                id: String(id),
              })),
              { type: "Project", id: "LIST" },
            ]
          : [{ type: "Project", id: "LIST" }],
    }),

    createProject: build.mutation<number, Omit<Project, "id" | "likes">>({
      query: (project) => ({
        url: "/project/create",
        method: "POST",
        body: project,
      }),
      invalidatesTags: [{ type: "Project", id: "LIST" }],
    }),

    getProject: build.query<{ data: Project }, { id: number }>({
      query: ({ id }) => `/project/search/${id}`,
      providesTags: (result) =>
        result
          ? [{ type: "Project", id: String(result.data.id) }]
          : [{ type: "Project", id: "LIST" }],
    }),

    deleteProject: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/project/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: String(arg.id) },
      ],
    }),
  }),
});
