import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post, Project, User, ChatRoom, SearchResponse } from "types";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: [
    "Post",
    "Project",
    "LikedPostId",
    "LikedProjectId",
    "FollowingId",
    "FollowerId",
    "ChatRoom",
    "User",
  ],
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
    getMyId: build.query<number, null>({
      query: () => "/me/id",
    }),

    getMyLikedPosts: build.query<number[], null>({
      query: () => "/me/like/post",
      providesTags: [{ type: "LikedPostId", id: "LIST" }],
    }),

    getMyLikedProjects: build.query<number[], null>({
      query: () => "/me/like/project",
      providesTags: [{ type: "LikedProjectId", id: "LIST" }],
    }),

    getMyFollowing: build.query<number[], null>({
      query: () => "/me/following",
      providesTags: [{ type: "FollowingId", id: "LIST" }],
    }),

    getMyFollowers: build.query<number[], null>({
      query: () => "/me/follower",
      providesTags: [{ type: "FollowerId", id: "LIST" }],
    }),

    getMyChatRooms: build.query<ChatRoom[], null>({
      query: () => "/me/chatrooms",
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ roomId }) => ({
                type: "ChatRoom" as const,
                id: String(roomId),
              })),
              { type: "ChatRoom", id: "LIST" },
            ]
          : [{ type: "ChatRoom", id: "LIST" }],
    }),

    likePost: build.mutation<void, number>({
      query: (id) => ({
        url: `/post/like/${id}`,
        method: "PUT",
      }),

      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: String(arg) },
        { type: "LikedPostId", id: "LIST" },
      ],
    }),

    likeProject: build.mutation<void, number>({
      query: (id) => ({
        url: `/project/like/${id}`,
        method: "PUT",
      }),

      invalidatesTags: (result, error, arg) => [
        { type: "Project", id: String(arg) },
        { type: "LikedProjectId", id: "LIST" },
      ],
    }),

    follow: build.mutation<void, number>({
      query: (id) => ({
        url: `/members/follow/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "User", id: String(arg) },
        { type: "FollowingId", id: "LIST" },
      ],
    }),

    createChatRoom: build.mutation<void, number>({
      query: (userId) => ({
        url: `/chat/create/${userId}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "ChatRoom", id: "LIST" },
      ],
    }),

    // Users
    getUser: build.query<User, number>({
      query: (id) => `/members/${id}`,
      providesTags: (result, error, arg) => [{ type: "User", id: String(arg) }],
    }),

    getUsers: build.query<User[], number[]>({
      query: (ids) => `/members?ids=${ids.join(",")}`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "User" as const,
                id: String(id),
              })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),

    // Post
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

    getPost: build.query<{ data: Post }, number>({
      query: (id) => `/post/${id}`,
      providesTags: (result, error, arg) => [{ type: "Post", id: String(arg) }],
    }),

    getRecentPosts: build.query<{ data: Post[] }, number>({
      query: (page) => `/post/recent?page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.data.push(...newItems.data);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    deletePost: build.mutation<void, number>({
      query: (id) => ({
        url: `/post/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Post", id: String(arg) },
      ],
    }),

    // Project
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

    getRecentProjects: build.query<{ data: Project[] }, number>({
      query: (page) => `/project/recent?page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.data.push(...newItems.data);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
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

    // Search
    search: build.query<SearchResponse, string>({
      query: (keyword) => `/search?keyword=${keyword}`,
    }),

    searchPosts: build.query<
      { contents: Post[]; totalPages: number; totalElements: number },
      [string, number]
    >({
      query: ([keyword, page]) =>
        `/search/post?keyword=${keyword}&page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.contents.push(...newItems.contents);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    searchProjects: build.query<
      { contents: Project[]; totalPages: number; totalElements: number },
      [string, number]
    >({
      query: ([keyword, page]) =>
        `/search/project?keyword=${keyword}&page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.contents.push(...newItems.contents);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    searchUsers: build.query<
      { contents: User[]; totalPages: number; totalElements: number },
      [string, number]
    >({
      query: ([keyword, page]) =>
        `/search/user?keyword=${keyword}&page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.contents.push(...newItems.contents);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});
