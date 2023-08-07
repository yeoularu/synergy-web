import { useMediaQuery } from "@mantine/hooks";
import ChatNavbar from "components/chat/ChatNavbar";
import NewChatButton from "components/chat/NewChatButton";

export default function Chat() {
  const matches = useMediaQuery("(min-width: 48em)", true);

  return matches ? <NewChatButton /> : <ChatNavbar />;
}
