import { api } from "app/api";
import { Button, Stack, Text } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import PostCard from "components/post/PostCard";
import ProjectCard from "components/project/ProjectCard";

import UserCard from "components/user/UserCard";

export default function SearchTotalResult({
  handleTabChange,
}: {
  handleTabChange: (tab: string) => void;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  if (!query) return <Text>검색어가 없습니다.</Text>;

  const { data, isLoading } = api.useSearchQuery(query);
  if (isLoading) return <Text>Loading...</Text>;
  console.log(data);
  if (!data?.totalElements) return <Text>검색 결과가 없습니다.</Text>;

  const { totalElements, posts, projects, users } = data;

  return (
    <>
      <Text size="sm" mt="sm">
        {query} 전체 검색 결과 {totalElements}건
      </Text>

      <Stack spacing="md" my="xl">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        <Button onClick={() => handleTabChange("post")}>게시글 더 보기</Button>
      </Stack>
      <Stack spacing="md" my="xl">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <Button onClick={() => handleTabChange("project")}>
          프로젝트 더 보기
        </Button>
      </Stack>
      <Stack spacing="md" my="xl">
        {users.map((user) => (
          <UserCard key={user.id} {...user} />
        ))}
        <Button onClick={() => handleTabChange("people")}>사람 더 보기</Button>
      </Stack>
    </>
  );
}
