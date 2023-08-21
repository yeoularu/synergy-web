import {
  createStyles,
  Card,
  Avatar,
  Text,
  Button,
  rem,
  Progress,
} from "@mantine/core";
import { api } from "app/api";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  avatar: {
    border: `${rem(2)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },
}));

interface UserCardImageProps {
  id: number;
  backgroundImage: string;
  avatar: string;
  name: string;
  major: string;
  temperature: number;
}

export function UserCard({
  id,
  backgroundImage,
  avatar,
  name,
  major,
  temperature,
}: UserCardImageProps) {
  const { classes, theme } = useStyles();
  const { data: myId } = api.useGetMyIdQuery(null);
  const { data: myFollowing } = api.useGetMyFollowingQuery(null);
  const isFollowing = myFollowing?.includes(id);

  const follow = api.useFollowMutation()[0];

  return (
    <Card withBorder padding="xl" radius="md" className={classes.card}>
      <Card.Section
        sx={{ backgroundImage: `url(${backgroundImage})`, height: 140 }}
      />

      <Avatar
        src={avatar}
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
      />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {name}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {major}
      </Text>

      <Text fz="sm" c="dimmed">
        시너지 온도
      </Text>

      <Progress value={temperature} label={`${temperature}°C`} size="xl" />

      {myId !== id ? (
        <Button
          fullWidth
          radius="md"
          mt="xl"
          size="md"
          color={
            isFollowing
              ? "gray"
              : theme.colorScheme === "dark"
              ? undefined
              : "dark"
          }
          onClick={() => follow(id)}
        >
          {isFollowing ? "팔로우 취소" : "팔로우"}
        </Button>
      ) : (
        <Button fullWidth radius="md" mt="xl" size="md">
          프로필 설정
        </Button>
      )}
    </Card>
  );
}
