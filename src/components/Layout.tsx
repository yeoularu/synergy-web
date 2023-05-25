import { useState } from "react";
import {
  AppShell,
  Navbar,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import { HeaderSearch } from "components/HeaderSearch";
import { BottomNav } from "./BottomNav";

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

interface LayoutProps {
  children: React.ReactNode;
  navbarChildren?: React.ReactNode;
  sidebarChildren?: React.ReactNode;
}

export default function Layout({
  children,
  navbarChildren = <Text>Nav</Text>,
  sidebarChildren = <Text>트렌딩 컨텐츠</Text>,
}: LayoutProps) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
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
          bg={theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white}
          withBorder={false}
        >
          <Navbar.Section grow mt="md">
            {navbarChildren}
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
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white
            }
            withBorder={false}
          >
            {sidebarChildren}
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
      {children}
    </AppShell>
  );
}
