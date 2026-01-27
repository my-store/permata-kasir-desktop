// Libraries
import { APP_PAGE_LOADING_DELAY } from "../../../lib/constants/app.constant";
import { rootRemoveLoading } from "../../../lib/redux/reducers/root.reducer";

// Node Modules
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import $ from "jquery";

// Templates
import { UserNavbar } from "../../../templates/user/navbar";
import { UserSidebar } from "../../../templates/user/sidebar";

// User Style
import "../../../styles/pages/user.style.sass";

// Socket object inside main.tsx
import { socket } from "../../../main";

// Default pages
import { Contactpage } from "../../contactpage";
import { Aboutpage } from "../../aboutpage";

// User Root Page | Entrypoint
function Entrypoint(): ReactNode {
  return <h1>Halaman User</h1>;
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

  return (
    <div id="User">
      <UserNavbar />
      <UserSidebar />
      {children}
    </div>
  );
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
  {
    path: "/user/contact",
    element: (props: any) => (
      <UserGlobalTemplates {...props}>
        <Contactpage />
      </UserGlobalTemplates>
    ),
  },
  {
    path: "/user/about",
    element: (props: any) => (
      <UserGlobalTemplates {...props}>
        <Aboutpage />
      </UserGlobalTemplates>
    ),
  },
];
