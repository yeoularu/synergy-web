import { api } from "app/api";
import { Button, Stack, Text } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { useIntersection } from "@mantine/hooks";
import { useState, useEffect } from "react";
import ProjectCard from "components/project/ProjectCard";
import PostSkeleton from "components/post/PostSkeleton";

export default function SearchProjectsResult() {
  const [page, setPage] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const { data, isLoading, isSuccess, isError, error } =
    api.useSearchProjectsQuery([query, page]);

  const { ref, entry } = useIntersection();
  useEffect(() => {
    if (entry?.isIntersecting && isSuccess) {
      setPage((prev) => prev + 1);
    }
    if (page === data?.totalPages) return setIsEnd(true);
  }, [entry?.isIntersecting, isSuccess]);
  console.log(entry?.isIntersecting);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = data.contents?.map((project, i) => (
      <ProjectCard key={i} project={project} />
    ));
  } else if (isError) {
    console.error(error);
    content = <p>error! check the console message</p>;
  }

  return (
    <>
      <Stack w="100%">
        <Text size="sm" mt="sm">
          {query} 프로젝트 검색 결과 {data?.totalElements}건
        </Text>
        {content}
      </Stack>
      <Stack ref={ref} w="100%" pt="md" display={isEnd ? "none" : "flex"}>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </Stack>
    </>
  );
}
