import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { useDispatch } from "react-redux";
import { messageReceived } from "app/stompSlice";

function useStompClient(brokerURL: string, topic: string) {
  const dispatch = useDispatch();
  const stompClient = useRef<Client | null>(null);

  useEffect(() => {
    if (!stompClient.current) {
      stompClient.current = new Client({
        brokerURL,
        onConnect: () => {
          stompClient.current?.subscribe(topic, (message) => {
            dispatch(messageReceived(message.body));
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
  }, [brokerURL, dispatch, topic]);

  return stompClient.current;
}

export default useStompClient;
