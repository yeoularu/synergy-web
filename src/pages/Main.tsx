import { Button, Group, Stack } from "@mantine/core";
import Layout from "components/Layout";
import { PostCard } from "components/PostCard";
import { Category } from "components/Category";
import { api } from "app/api";

export default function Main() {
  const { data, isFetching } = api.useGetPostsQuery(null);

  if (isFetching) return <div>loading...</div>;
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
          <Button>글 쓰기</Button>
          <Button>새 프로젝트</Button>
        </Group>

        {data?.map((post, i) => (
          <PostCard key={i} {...post}></PostCard>
        ))}
      </Stack>
    </Layout>
  );
}
