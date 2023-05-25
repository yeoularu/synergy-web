import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import { store } from "./store";
import { Main, People, Chat, Notification, Auth } from "pages";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

const PrivateRoutes = () => {
  const auth = sessionStorage.getItem("logged-in");
  return auth ? <Outlet /> : <Navigate to="/auth" />;
};

export default function App() {
  return (
    <Provider store={store}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Main />} />
              <Route path="/people" element={<People />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/notification" element={<Notification />} />
            </Route>
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </Provider>
  );
}