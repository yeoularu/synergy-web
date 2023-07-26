import { createContext, useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { useDispatch } from "react-redux";
import { messageReceived } from "app/stompSlice";

interface StompContextProps {
  client: Client | null;
}

export const StompContext = createContext<StompContextProps>({ client: null });

export const StompProvider = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();
  const brokerURL = import.meta.env.VITE_WEBSOCKET_URL;
  const topics = ["/topic/0", "/topic/1"]; // 테스트용. 서버상태로 관리해야함

  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    const newClient = new Client({
      brokerURL,
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      onConnect: () => {
        topics.forEach((topic) => {
          newClient.subscribe(topic, (message) => {
            // Change here
            dispatch(messageReceived({ topic, body: message.body }));
          });
        });
      },
    });

    newClient.activate();

    setClient(newClient);

    // This function will be called when StompProvider is unmounted
    return () => {
      newClient.deactivate();
    };
  }, []); // Empty dependency array ensures this runs once on mount and not on updates

  return (
    <StompContext.Provider value={{ client }}>{children}</StompContext.Provider>
  );
};
