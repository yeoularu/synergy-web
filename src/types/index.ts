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

export type { Post, Project, User };
