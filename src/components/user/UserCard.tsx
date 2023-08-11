import {
  createStyles,
  Card,
  Avatar,
  Text,
  Group,
  Button,
  rem,
  Progress,
} from "@mantine/core";

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
  backgroundImage: string;
  avatar: string;
  name: string;
  major: string;
  temperature: number;
}

export function UserCard({
  backgroundImage,
  avatar,
  name,
  major,
  temperature,
}: UserCardImageProps) {
  const { classes, theme } = useStyles();

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

      <Button
        fullWidth
        radius="md"
        mt="xl"
        size="md"
        color={theme.colorScheme === "dark" ? undefined : "dark"}
      >
        Follow
      </Button>
    </Card>
  );
}
