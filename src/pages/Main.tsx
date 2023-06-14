import { Button, Group, Stack } from "@mantine/core";
import Layout from "components/Layout";
import { MainCategory } from "components/MainCategory";
import { api } from "app/api";
import { Link } from "react-router-dom";
import PostList from "components/post/PostList";
import ProjectList from "components/project/ProjectList";

export default function Main() {
  const { data: postsData, isFetching: isPostsFetching } =
    api.useGetAllPostsQuery(null);
  const { data: projectsData, isFetching: isProjectsFetching } =
    api.useGetAllProjectsQuery(null);

  if (isPostsFetching || isProjectsFetching) return <div>loading...</div>;
  return (
    <Layout navbarChildren={<MainCategory />}>
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

        <PostList posts={postsData?.data} />
        <ProjectList projects={projectsData?.data} />
      </Stack>
    </Layout>
  );
}
