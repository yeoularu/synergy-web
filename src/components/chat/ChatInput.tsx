import { useContext, useState } from "react";
import { TextInput, ActionIcon, useMantineTheme } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";

import { WebSocketContext } from "components/ui/Layout";

export function ChatInput({ chatRoomId }: { chatRoomId: number }) {
  const theme = useMantineTheme();
  const [text, setText] = useState("");

  const client = useContext(WebSocketContext);

  const handleSend = () => {
    if (text.trim() !== "") {
      client?.publish({
        destination: "/topic/" + String(chatRoomId),
        body: text,
      });
      setText("");
    }
  };

  return (
    <TextInput
      value={text}
      onChange={(e) => setText(e.target.value)}
      radius="xl"
      size="md"
      rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          color={theme.primaryColor}
          variant="filled"
          onClick={handleSend}
        >
          <IconSend size="1.1rem" stroke={1.5} />
        </ActionIcon>
      }
      placeholder="메세지를 입력하세요"
      rightSectionWidth={42}
    />
  );
}
