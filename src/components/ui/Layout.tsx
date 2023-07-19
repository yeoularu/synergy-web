import { createContext, useEffect, useState } from "react";
import {
  AppShell,
  Navbar,
  Footer,
  Aside,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import { HeaderSearch } from "components/ui/HeaderSearch";
import { BottomNav } from "./BottomNav";
import { Outlet } from "react-router-dom";
import { NavbarContent } from "./NavbarContent";
import AsideContent from "./AsideContent";
import { Client } from "@stomp/stompjs";
import { useDispatch } from "react-redux";
import { messageReceived } from "app/stompSlice";

const headerLinks = [
  {
    link: "/",
    label: "홈",
  },
  {
    link: "/people",
    label: "사람",
  },
  {
    link: "/chat",
    label: "채팅",
  },
  {
    link: "/notification",
    label: "알림",
  },
];

export const WebSocketContext = createContext<Client | null>(null);

export default function Layout() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  // Stomp Client

  const dispatch = useDispatch();
  const brokerURL = import.meta.env.VITE_WEBSOCKET_URL;
  const topics = ["/topic/0", "/topic/1"]; // 테스트용. 서버상태로 관리해야함

  const client = new Client({
    brokerURL,
    debug: (str) => {
      console.log(str);
    },
    reconnectDelay: 5000,
  });

  useEffect(() => {
    (client.onConnect = () => {
      topics.forEach((topic) => {
        client.subscribe(topic, (message) => {
          dispatch(messageReceived({ topic, body: message.body }));
        });
      });
    }),
      client.activate();
  }, []);

  return (
    <WebSocketContext.Provider value={client}>
      <AppShell
        styles={{
          main: {
            minHeight: 0,
            background:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
            bg={
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white
            }
            withBorder={false}
          >
            <Navbar.Section grow mt="md">
              <NavbarContent />
            </Navbar.Section>
          </Navbar>
        }
        aside={
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Aside
              p="md"
              hiddenBreakpoint="sm"
              width={{ sm: 200, lg: 300 }}
              bg={
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.white
              }
              withBorder={false}
            >
              <AsideContent />
            </Aside>
          </MediaQuery>
        }
        footer={
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Footer height={56}>
              <BottomNav links={headerLinks} />
            </Footer>
          </MediaQuery>
        }
        header={
          <HeaderSearch links={headerLinks}>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
              />
            </MediaQuery>
          </HeaderSearch>
        }
      >
        <Outlet />
      </AppShell>
    </WebSocketContext.Provider>
  );
}
