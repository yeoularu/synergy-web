import { useSearchParams } from "react-router-dom";
import { Tabs, Text } from "@mantine/core";
import { useState } from "react";
import SearchTotalResult from "./SearchTotalResult";
import SearchPostsResult from "./SearchPostsResult";
import SearchProjectsResult from "./SearchProjectsResult";
import SearchUsersResult from "./SearchUsersResult";

export default function SearchResult() {
  const [activeTab, setActiveTab] = useState<string | null>("total");

  let content;
  if (activeTab === "total")
    content = <SearchTotalResult handleTabChange={setActiveTab} />;
  if (activeTab === "post") content = <SearchPostsResult />;
  if (activeTab === "project") content = <SearchProjectsResult />;
  if (activeTab === "people") content = <SearchUsersResult />;

  return (
    <Tabs value={activeTab} onTabChange={setActiveTab} defaultValue="total">
      <Tabs.List>
        <Tabs.Tab value="total">전체</Tabs.Tab>
        <Tabs.Tab value="post">게시글</Tabs.Tab>
        <Tabs.Tab value="project">프로젝트</Tabs.Tab>
        <Tabs.Tab value="people">사람</Tabs.Tab>
      </Tabs.List>
      {content}
    </Tabs>
  );
}
