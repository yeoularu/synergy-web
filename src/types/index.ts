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
  id: number;
  name: string;
}

interface MyInfo extends User {
  likedPosts: number[];
  likedProjects: number[];
  chatMessages: ChatMessage[];
}

interface ChatMessage {
  id: number;
  type: string;
  roomId: number;
  message: string;
  senderId: number;
  sendTime: string;
}

export type { Post, Project, User, MyInfo, ChatMessage };
