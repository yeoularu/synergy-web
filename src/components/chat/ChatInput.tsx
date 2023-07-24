import { useContext } from "react";
import {
  TextInput,
  ActionIcon,
  useMantineTheme,
  Affix,
  MediaQuery,
} from "@mantine/core";
import { IconSend } from "@tabler/icons-react";

import { WebSocketContext } from "components/ui/Layout";
import { useForm } from "@mantine/form";
import { api } from "app/api";

export function ChatInput({ roomId }: { roomId: number }) {
  const { data } = api.useGetMyInfoQuery(null);
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      text: "",
    },
  });

  const client = useContext(WebSocketContext);

  const handleSend = (text: string) => {
    if (text !== "") {
      const message = {
        type: "TALK",
        roomId,
        text,
        senderId: data?.id,
      };
      client?.publish({
        destination: "/topic/" + String(roomId),
        body: JSON.stringify(message),
      });
    }
  };

  return (
    <MediaQuery smallerThan="sm" styles={{ bottom: 6, width: "100%" }}>
      <Affix
        w={{ sm: 400, lg: 600 }}
        px={5}
        position={{ bottom: 20, left: "50%" }}
        sx={() => ({ transform: "translateX(-50%)" })}
      >
        <form
          onSubmit={form.onSubmit((value) => {
            handleSend(value.text);
            value.text = "";
          })}
        >
          <TextInput
            {...form.getInputProps("text")}
            radius="xl"
            size="md"
            w="100%"
            rightSection={
              <ActionIcon
                type="submit"
                size={32}
                radius="xl"
                color={theme.primaryColor}
                variant="filled"
              >
                <IconSend size="1.1rem" stroke={1.5} />
              </ActionIcon>
            }
            placeholder="메세지를 입력하세요"
            rightSectionWidth={42}
          />{" "}
        </form>
      </Affix>
    </MediaQuery>
  );
}
