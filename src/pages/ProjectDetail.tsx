import { api } from "app/api";
import Layout from "components/Layout";
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
  createStyles,
} from "@mantine/core";
import { IconDots, IconHeart, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

const avatars = [
  "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
];

const useStyles = createStyles((theme) => ({
  likes: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray[6],
  },

  likeBtn: {
    color: theme.colors.red[6],
  },
}));

export default function ProjectDetail() {
  const { id } = useParams() as { id: string };
  const { data, isFetching } = api.useGetProjectQuery({ id: parseInt(id) });
  const setDeleteProject = api.useDeleteProjectMutation()[0];
  const navigate = useNavigate();
  const { classes } = useStyles();
  const [isApplied, setIsApplied] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  if (isFetching) return <div>loading...</div>;
  if (!data) return <div>프로젝트 데이터를 불러오지 못했습니다.</div>;
  const project = data.data;
  const today = new Date();
  const createDate = new Date(project.createDate);
  const dday = Math.floor(
    (today.getTime() - createDate.getTime()) / 1000 / 60 / 60 / 24
  );

  const handleDelete = async () => {
    try {
      await setDeleteProject({ id: parseInt(id) }).unwrap();
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
    <Layout>
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
          {project.createDate.split("T")[0]} ~ {project.endDate.split("T")[0]}
        </Text>

        <Progress value={(23 / 36) * 100} mt={5} />

        <Group position="apart" mt="md">
          <Avatar.Group spacing="sm">
            <Avatar src={avatars[0]} radius="xl" />
            <Avatar src={avatars[1]} radius="xl" />
            <Avatar src={avatars[2]} radius="xl" />
            <Avatar radius="xl">+5</Avatar>
          </Avatar.Group>

          <Group>
            <ActionIcon variant="default" radius="md" size={36}>
              <IconHeart
                size="1.1rem"
                className={classes.likeBtn}
                stroke={1.5}
              />
            </ActionIcon>
            {project.likes > 0 ? (
              <Text className={classes.likes}>좋아요 {project.likes}</Text>
            ) : null}
          </Group>

          <Button onClick={handleApply}>
            {isApplied ? "신청 취소하기" : "신청하기"}
          </Button>
        </Group>
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
    </Layout>
  );
}
