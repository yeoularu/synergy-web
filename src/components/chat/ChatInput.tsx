import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "app/store"; // Replace with the path to your store file
import { sendMessage } from "app/stompSlice";
import { TextInput, ActionIcon, useMantineTheme } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";

export function ChatInput() {
  const theme = useMantineTheme();

  const dispatch = useAppDispatch();
  const [text, setText] = useState("");
  const sending = useSelector((state: RootState) => state.stomp.sending);

  const handleSend = () => {
    if (text.trim() !== "") {
      dispatch(sendMessage(text));
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
          disabled={sending}
          onClick={handleSend}
        >
          <IconSend size="1.1rem" stroke={1.5} />
        </ActionIcon>
      }
      placeholder="메세지를 입력하세요"
      rightSectionWidth={42}
      disabled={sending}
    />
  );
}
