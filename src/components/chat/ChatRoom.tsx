import { useSelector } from "react-redux";
import { RootState } from "app/store";
import { Stack } from "@mantine/core";
import { ChatInput } from "./ChatInput";
import { redirect, useParams } from "react-router-dom";
import { api } from "app/api";

export default function ChatRoom() {
  const { id } = useParams();
  if (!id) {
    redirect("/chat");
  }
  const { data, isLoading, isSuccess, isError, error } =
    api.useGetMyInfoQuery(null);

  let oldMessages;
  if (isLoading) {
    oldMessages = <p>"Loading..."</p>;
  } else if (isSuccess) {
    oldMessages = data.chatMessages
      .filter(({ roomId }) => roomId === Number(id))
      .map(({ message }, i) => <div key={i}>{message}</div>);
  } else if (isError) {
    console.error(error);
    oldMessages = <p>error! check the console message</p>;
  }

  const newMessages = useSelector((state: RootState) => state.stomp.messages);

  return (
    <Stack h="100%">
      <div>{oldMessages}</div>
      <div>
        {newMessages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <ChatInput />
    </Stack>
  );
}
