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

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["Post", "Project"],
  endpoints: (build) => ({
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
    getAllPosts: build.query<{ data: Post[] }, null>({
      query: () => "/post/postAll",
      providesTags: ["Post"],
    }),
    getAllProjects: build.query<{ data: Project[] }, null>({
      query: () => "/project/projectAll",
      providesTags: ["Project"],
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
      invalidatesTags: ["Post"],
    }),
    deletePost: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/post/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
    createProject: build.mutation<number, Omit<Project, "id" | "likes">>({
      query: (project) => ({
        url: "/project/create",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Project"],
    }),

    getProject: build.query<{ data: Project }, { id: number }>({
      query: ({ id }) => `/project/search/${id}`,
      providesTags: ["Project"],
    }),

    deleteProject: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/project/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});
