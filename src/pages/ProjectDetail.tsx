import { api } from "app/api";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Text,
  Progress,
  Badge,
  Group,
  Title,
  Button,
  Box,
  ActionIcon,
  Menu,
  rem,
  Dialog,
  Flex,
} from "@mantine/core";
import { IconDots, IconHeart, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import ProjectLike from "components/project/ProjectLike";

const avatars = [
  "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
];

export default function ProjectDetail() {
  const id = parseInt(useParams().id as string);
  const { data, isFetching } = api.useGetProjectQuery({ id });
  const setDeleteProject = api.useDeleteProjectMutation()[0];
  const navigate = useNavigate();
  const [isApplied, setIsApplied] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  if (isFetching) return <div>loading...</div>;
  if (!data) return <div>프로젝트 데이터를 불러오지 못했습니다.</div>;
  const project = data;
  const today = new Date();
  const startAt = new Date(project.startAt);
  const dday = Math.floor(
    (today.getTime() - startAt.getTime()) / 1000 / 60 / 60 / 24
  );

  const handleDelete = async () => {
    try {
      await setDeleteProject({ id }).unwrap();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  const handleApply = async () => {
    open();
    setIsApplied((prev) => !prev);
  };

  return (
    <>
      <Box w="100%">
        <Group position="apart">
          <Badge>D{dday < 0 ? dday : `+${dday}`}</Badge>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon>
                <IconDots size="1rem" />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                icon={<IconTrash size={rem(14)} />}
                color="red"
                onClick={handleDelete}
              >
                삭제하기
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>

        <Title fz="lg" fw={500} mt="md">
          {project.name}
        </Title>
        <Text c="dark" mt={5}>
          {project.content}
        </Text>

        <Text c="dimmed" fz="sm" mt="md">
          분야:{" "}
          <Text
            span
            fw={500}
            sx={(theme) => ({
              color: theme.colorScheme === "dark" ? theme.white : theme.black,
            })}
          >
            {project.field.join(", ")}
          </Text>
        </Text>

        <Text>
          {project.startAt.split("T")[0]} ~ {project.endAt.split("T")[0]}
        </Text>

        <Progress value={(23 / 36) * 100} mt={5} />

        <Group position="apart" mt="md">
          <ProjectLike {...{ id, likes: project.likes, isPost: false }} />

          <Avatar.Group spacing="sm">
            <Avatar src={avatars[0]} radius="xl" />
            <Avatar src={avatars[1]} radius="xl" />
            <Avatar src={avatars[2]} radius="xl" />
            <Avatar radius="xl">+5</Avatar>
          </Avatar.Group>
        </Group>
        <Flex justify="right" mt={10}>
          <Button onClick={handleApply}>
            {isApplied ? "신청 취소하기" : "신청하기"}
          </Button>
        </Flex>
      </Box>
      <Dialog
        opened={opened}
        withCloseButton
        onClose={close}
        size="lg"
        radius="md"
      >
        <Text size="sm" weight={500}>
          {isApplied ? "신청하기" : "신청 취소하기"} 완료
        </Text>
      </Dialog>
    </>
  );
}
