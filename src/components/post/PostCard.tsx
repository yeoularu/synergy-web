import { IconDots, IconHeart, IconTrash } from "@tabler/icons-react";
import {
  Card,
  Text,
  Group,
  ActionIcon,
  createStyles,
  Avatar,
  Menu,
  rem,
} from "@mantine/core";
import { api } from "app/api";
import PostLikeSection from "./PostLikeSection";

const useStyles = createStyles((theme) => ({
  card: {
    width: "100%",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    padding: theme.spacing.sm,
  },

  likes: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray[6],
  },

  likeBtn: {
    color: theme.colors.red[6],
  },
}));

interface PostCardProps {
  id: number;
  title: string;
  content: string;
  author: string;
  likes: number;
}

export default function PostCard({
  id,
  title,
  content,
  author,
  likes,
}: PostCardProps) {
  const { classes } = useStyles();
  const setDeletePost = api.useDeletePostMutation()[0];

  const handleDelete = async () => {
    try {
      await setDeletePost({ id }).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section className={classes.section}>
        <Group position="apart">
          <Group>
            <Avatar radius="xl" />
            <Text>{author}</Text>
          </Group>

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
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group position="apart">
          <Text fz="lg" fw={500}>
            {title}
          </Text>
        </Group>
        <Text mt="xs">{content}</Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <PostLikeSection {...{ id, likes, isPost: true }} />
      </Card.Section>
    </Card>
  );
}
