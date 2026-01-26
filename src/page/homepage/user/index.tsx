// Libraries
import { APP_PAGE_LOADING_DELAY } from "../../../lib/constants/app.constant";
import {
  rootRemoveLoading,
  rootOpenLoading,
} from "../../../lib/redux/reducers/root.reducer";

// Node Modules
import { removeLoginCredentials } from "../../../lib/system/credentials";
import { logout } from "../../../lib/redux/reducers/login.reducer";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { socket } from "../../../main";
import $ from "jquery";

// User Root Page | Entrypoint
function Entrypoint(): ReactNode {
  const dispatch = useDispatch();
  return (
    <div id="User-Page">
      <h1>Halaman User</h1>
      <button
        onClick={() => {
          removeLoginCredentials();
          dispatch(rootOpenLoading());
          dispatch(logout());
          socket.disconnect();
        }}
      >
        Keluar
      </button>
    </div>
  );
}

function UserGlobalTemplates({ children, socketConnect }: any) {
  const dispatch = useDispatch();

  function socketListener() {}

  // When the page is loaded or refreshed
  async function load() {
    socketListener();

    // After 3 seconds remove loading animation
    setTimeout(() => dispatch(rootRemoveLoading()), APP_PAGE_LOADING_DELAY);
  }

  useEffect(() => {
    // Force scrolll to top
    $("html, body").animate({ scrollTop: 0 }, "fast");

    // Connect to socket server, before any tasks
    socketConnect(load);
  }, []);

  return <div id="User">{children}</div>;
}

export const UserRoutes: any[] = [
  {
    path: "/user",
    element: (props: any) => (
      <UserGlobalTemplates {...props}>
        <Entrypoint />
      </UserGlobalTemplates>
    ),
  },
];
