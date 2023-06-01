import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Post {
  title: string;
  content: string;
  author: string;
  likes: number;
}

interface Project {
  id: number;
  name: string;
  content: string;
  field: string;
  createDate: string;
  endDate: string;
  teamMembers: number[];
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
    getAllPosts: build.query<Post[], null>({
      query: () => "/post/postAll",
      providesTags: ["Post"],
    }),
    getAllProjects: build.query<Project[], null>({
      query: () => "/project/projectAll",
      providesTags: ["Project"],
    }),
    newPost: build.mutation<void, { title: string; content: string }>({
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
  }),
});
