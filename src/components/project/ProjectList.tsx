import { Project } from "types";
import ProjectCard from "./ProjectCard";
import { Key } from "react";
import { Stack } from "@mantine/core";

interface ProjectListProps {
  projects: Project[] | undefined;
}

function ProjectList({ projects }: ProjectListProps) {
  if (!projects) return <div>loading...</div>;
  return (
    <Stack w="100%">
      {projects.map((project: Project, i: Key | null | undefined) => (
        <ProjectCard key={i} {...project}></ProjectCard>
      ))}
    </Stack>
  );
}

export default ProjectList;
