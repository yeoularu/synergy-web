import { useCallback, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { useDispatch } from "react-redux";
import { messageReceived } from "app/stompSlice";
import { api } from "app/api";

function useStompClient() {
  const dispatch = useDispatch();
  const stompClient = useRef<Client | null>(null);

  const brokerURL = import.meta.env.VITE_WEBSOCKET_URL;
  const topics = ["/topic/0", "/topic/1"]; // 테스트용. 서버상태로 관리해야함

  useEffect(() => {
    if (!stompClient.current) {
      stompClient.current = new Client({
        brokerURL,
        debug: (str) => {
          console.log(str);
        },
        onConnect: () => {
          topics.forEach((topic) => {
            stompClient.current?.subscribe(topic, (message) => {
              dispatch(messageReceived({ topic, body: message.body }));
            });
          });
        },
      });

      stompClient.current.activate();
    }

    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
        stompClient.current = null;
      }
    };
  }, []);

  const sendMessage = useCallback((chatRoomId: string, body: string) => {
    if (stompClient.current?.connected) {
      stompClient.current.publish({
        destination: "/topic/" + chatRoomId,
        body,
      });
    }
  }, []);

  return { stompClient: stompClient.current, sendMessage };
}

export default useStompClient;
