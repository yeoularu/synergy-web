import PostCard from "components/post/PostCard";
import { Box, Button, Stack } from "@mantine/core";
import { api } from "app/api";
import { useEffect, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import PostSkeleton from "components/post/PostSkeleton";
import usePage from "hooks/usePage";

export default function RecentPost() {
  const { initPage, getPage, increasePage } = usePage();
  const [page, setPage] = useState(getPage("recentPost") || 0);
  const { data, isLoading, isSuccess, isError, error } =
    api.useGetRecentPostsQuery(page);

  const { ref, entry } = useIntersection();

  const isEnd = data?.totalPages !== undefined && data?.totalPages <= page;

  const handlePage = () => {
    increasePage("recentPost");
    setPage(getPage("recentPost"));
  };

  useEffect(() => {
    if (getPage("recentPost") === undefined) {
      initPage("recentPost");
    }
  }, []);

  useEffect(() => {
    console.log(page);
    if (entry?.isIntersecting && isSuccess) handlePage();
    if (isEnd) return;
  }, [entry?.isIntersecting, isSuccess]);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = data.contents.map((post, i) => <PostCard key={i} post={post} />);
  } else if (isError) {
    console.error(error);
    content = <p>error! check the console message</p>;
  }

  return (
    <>
      <Stack w="100%">{content}</Stack>
      <Stack ref={ref} w="100%" mt="md" display={isEnd ? "none" : "flex"}>
        <PostSkeleton />
        <PostSkeleton />
        <Button m="auto" onClick={handlePage}>
          더 보기
        </Button>
      </Stack>
    </>
  );
}
