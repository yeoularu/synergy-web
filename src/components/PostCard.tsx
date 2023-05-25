import { IconHeart } from "@tabler/icons-react";
import {
  Card,
  Text,
  Group,
  ActionIcon,
  createStyles,
  Avatar,
} from "@mantine/core";

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
  title: string;
  content: string;
  author: string;
  likes: number;
}

export function PostCard({ title, content, author, likes }: PostCardProps) {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section className={classes.section}>
        <Group>
          <Avatar radius="xl" />
          <Text>{author}</Text>
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
        <Group>
          <ActionIcon variant="default" radius="md" size={36}>
            <IconHeart size="1.1rem" className={classes.likeBtn} stroke={1.5} />
          </ActionIcon>
          {likes ? <Text className={classes.likes}>좋아요 {likes}</Text> : null}
        </Group>
      </Card.Section>
    </Card>
  );
}
