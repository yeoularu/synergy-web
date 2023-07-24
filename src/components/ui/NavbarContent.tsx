import { useLocation } from "react-router-dom";
import { ContentCategory } from "./ContentCategory";

export function NavbarContent() {
  const { pathname } = useLocation();
  const page = pathname.split("/")[1];
  console.log(page);
  switch (page) {
    case "":
      return <ContentCategory />;
    case "chat":
      return <p>chat navbar</p>;
    default:
      return <p>default</p>;
  }
}
