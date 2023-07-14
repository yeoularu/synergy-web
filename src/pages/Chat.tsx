import { Stack } from "@mantine/core";
import { api } from "app/api";
import { Link } from "react-router-dom";

export default function Chat() {
  const { data, isLoading, isSuccess, isError, error } =
    api.useGetMyInfoQuery(null);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    // 차후 신규 메세지 순으로 정렬하도록 기능 추가
    const uniqueChatRoomIds: Set<number> = new Set();
    data.chatMessages.forEach(({ roomId }) => uniqueChatRoomIds.add(roomId));
    content = Array.from(uniqueChatRoomIds).map((roomId, i) => (
      <Link key={i} to={`${roomId}`}>
        {roomId}
      </Link>
    ));
  } else if (isError) {
    console.error(error);
    content = <p>error! check the console message</p>;
  }
  return <Stack>{content}</Stack>;
}
