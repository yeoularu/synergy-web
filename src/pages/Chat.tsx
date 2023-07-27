import { useMediaQuery } from "@mantine/hooks";
import ChatNavbar from "components/chat/ChatNavbar";

export default function Chat() {
  const matches = useMediaQuery("(min-width: 48em)", true);

  return matches ? <p>새 채팅을 시작해보세요!</p> : <ChatNavbar />;
}
