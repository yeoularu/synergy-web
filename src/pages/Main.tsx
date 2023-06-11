import { Button, Group, Stack } from "@mantine/core";
import Layout from "components/Layout";
import PostCard from "components/PostCard";
import { Category } from "components/Category";
import { api } from "app/api";
import { Link } from "react-router-dom";
import ProjectCard from "components/ProjectCard";

export default function Main() {
  const { data: postsData, isFetching: isPostsFetching } =
    api.useGetAllPostsQuery(null);
  const { data: ProjectsData, isFetching: isProjectsFetching } =
    api.useGetAllProjectsQuery(null);

  if (isPostsFetching || isProjectsFetching) return <div>loading...</div>;
  return (
    <Layout navbarChildren={<Category />}>
      <Stack
        mih={300}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
        })}
        align="center"
      >
        <Group>
          <Link to={"/new/post"}>
            <Button>글 쓰기</Button>
          </Link>
          <Link to={"/new/project"}>
            <Button>새 프로젝트</Button>
          </Link>
        </Group>

        {postsData?.data.map((post, i) => (
          <PostCard key={i} {...post}></PostCard>
        ))}
        {ProjectsData?.data.map((project, i) => (
          <ProjectCard key={i} {...project}></ProjectCard>
        ))}
      </Stack>
    </Layout>
  );
}
