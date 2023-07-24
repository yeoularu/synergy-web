import { useSelector } from "react-redux";
import { RootState } from "app/store";
import { MediaQuery, Stack } from "@mantine/core";
import { ChatInput } from "./ChatInput";
import { redirect, useParams } from "react-router-dom";
import { api } from "app/api";
import ChatMessageCard from "./ChatMessageCard";

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
    oldMessages = data.chatRooms
      .find((chatRoom) => chatRoom.roomId === Number(id))
      ?.messages.map(({ text, senderId }) => {
        const fromMe = senderId === data.id;
        return <ChatMessageCard {...{ text, fromMe }} />;
      });
  } else if (isError) {
    console.error(error);
    oldMessages = <p>error! check the console message</p>;
  }

  const newMessages = useSelector((state: RootState) => state.stomp.messages)
    .filter((message) => message.topic === "/topic/" + id)
    .map((message) => {
      const { text, senderId } = JSON.parse(message.body);
      const fromMe = senderId === data?.id;
      return <ChatMessageCard {...{ text, fromMe }} />;
    });

  return (
    <Stack h="100%" sx={() => ({ gap: 5 })}>
      {oldMessages}
      {newMessages}
      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <ChatInput roomId={Number(id)} />
      </MediaQuery>
    </Stack>
  );
}
