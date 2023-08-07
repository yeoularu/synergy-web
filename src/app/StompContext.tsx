import { createContext, useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { useDispatch } from "react-redux";
import { messageReceived } from "app/stompSlice";
import { api } from "./api";

interface StompContextProps {
  client: Client | null;
}

export const StompContext = createContext<StompContextProps>({ client: null });

export const StompProvider = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();
  const brokerURL = import.meta.env.VITE_WEBSOCKET_URL;
  const { data } = api.useGetMyInfoQuery(null);

  const topics = data?.chatRooms.map(({ roomId }) => `/topic/${roomId}`) || [];

  const clientRef = useRef<Client | null>(null);
  const isConnected = clientRef.current?.connected;

  useEffect(() => {
    if (!clientRef.current) {
      console.log("create new client");
      clientRef.current = new Client({
        brokerURL,
        debug: (str) => {
          console.log(str);
        },

        reconnectDelay: 5000,
      });

      clientRef.current.activate();
      return;
    }

    if (isConnected) {
      const subscriptions = topics.map((topic) =>
        clientRef.current?.subscribe(topic, (message) => {
          dispatch(messageReceived({ topic, body: message.body }));
        })
      );

      return () => {
        subscriptions.forEach((subscription) => {
          console.log(subscription);
          subscription?.unsubscribe();
        });
      };
    }
  }, [data?.chatRooms.length]);

  return (
    <StompContext.Provider value={{ client: clientRef.current }}>
      {children}
    </StompContext.Provider>
  );
};
