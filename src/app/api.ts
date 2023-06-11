import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  likes: number;
}

interface Project {
  id: number;
  name: string;
  content: string;
  field: string[];
  createDate: string;
  endDate: string;
  likes: number;
}

interface User {
  likedPosts: number[];
  likedProjects: number[];
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["Post", "Project", "User"],
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

    // User
    getMyInfo: build.query<User, null>({
      query: () => "/members/me",
      providesTags: [{ type: "User", id: "LIST" }],
    }),

    likePost: build.mutation<void, number>({
      query: (id) => ({
        url: `/post/like/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: arg },
        { type: "User", id: "LIST" },
      ],
    }),

    likeProject: build.mutation<void, number>({
      query: (id) => ({
        url: `/project/like/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Project", id: arg },
        { type: "User", id: "LIST" },
      ],
    }),

    // Post
    getAllPosts: build.query<{ data: Post[] }, null>({
      query: () => "/post/postAll",
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Post" as const, id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
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
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),

    // Project
    getAllProjects: build.query<{ data: Project[] }, null>({
      query: () => "/project/projectAll",
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Project" as const,
                id,
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
          ? [{ type: "Project", id: result.data.id }]
          : [{ type: "Project", id: "LIST" }],
    }),

    deleteProject: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/project/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Project", id: "LIST" }],
    }),
  }),
});
