// Libraries
import { APP_PAGE_LOADING_DELAY } from "../../../lib/constants/app.constant";
import { removeLoginCredentials } from "../../../lib/system/credentials";
import { logout } from "../../../lib/redux/reducers/login.reducer";

// Node Modules
import {
  rootRemoveLoading,
  rootOpenLoading,
} from "../../../lib/redux/reducers/root.reducer";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import $ from "jquery";

// Kasir Style
import "../../../styles/pages/kasir.style.sass";

// Socket object inside main.tsx
import { socket } from "../../../main";

// Kasir Root Page | Entrypoint
function Entrypoint(): ReactNode {
  const dispatch = useDispatch();
  return (
    <div id="Kasir-Page">
      <h1>Halaman Kasir</h1>
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

function KasirGlobalTemplates({ children, socketConnect }: any) {
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

    /* -----------------------------------------------
    |  RETURN CLEAN-UP FUNCTION
    |  -----------------------------------------------
    |  This can fix socket connected twice
    |  in development mode, don't change this.
    */
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return <div id="Kasir">{children}</div>;
}

export const KasirRoutes: any[] = [
  {
    path: "/kasir",
    element: (props: any) => (
      <KasirGlobalTemplates {...props}>
        <Entrypoint />
      </KasirGlobalTemplates>
    ),
  },
];
