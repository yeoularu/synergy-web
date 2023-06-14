import { Post } from "types";
import PostCard from "./PostCard";
import { Key } from "react";
import { Stack } from "@mantine/core";

interface PostListProps {
  posts: Post[] | undefined;
}

function PostList({ posts }: PostListProps) {
  if (!posts) return <div>loading...</div>;
  return (
    <Stack w="100%">
      {posts.map((post: Post, i: Key | null | undefined) => (
        <PostCard key={i} {...post}></PostCard>
      ))}
    </Stack>
  );
}

export default PostList;
