/* ===========================================================
|  SELURUH KONFIGURASI HALAMAN USER
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 19-Jan-2026
|  Updated At: 2-Feb-2026
*/

// Libraries
import { APP_PAGE_LOADING_DELAY } from "../../../lib/constants/app.constant";
import { rootRemoveLoading } from "../../../lib/redux/reducers/root.reducer";
import { ReduxRootStateType } from "../../../lib/redux/store.redux";

// Node Modules
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import $ from "jquery";

// Navbar
import { UserNavbar } from "./user.navbar";

// Sidebar
import { UserSidebar } from "./user.sidebar";

// User Style
import "../../../styles/pages/homepage/user/user.main.style.sass";

// Socket object inside main.tsx
import { socket } from "../../../main";

// Functions
import { userSocketListener } from "./_func";

// User Entrypoint page
import UserEntrypoint from "./entrypoint";

// Default pages
import { Contactpage } from "../../contactpage";
import { Aboutpage } from "../../aboutpage";

// Other user pages
import { MonitorToko } from "./monitor-toko";
import { Inventaris } from "./inventaris";
import { Laporan } from "./laporan";
import { Member } from "./member";
import { Produk } from "./produk";
import { Diskon } from "./diskon";
import { Modal } from "./modal";
import { Jasa } from "./jasa";
import { Bank } from "./bank";
import { Toko } from "./toko";

// User Settings
import { UserSettings } from "./settings";

function UserGlobalTemplates({ children, socketConnect }: any) {
  const settingsState = useSelector(
    (state: ReduxRootStateType) => state.user_settings,
  );
  const dispatch = useDispatch();

  // When the page is loaded or refreshed
  async function load() {
    // Listen to incoming socket event
    userSocketListener();

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
      {settingsState.opened && <UserSettings />}
    </div>
  );
}

export const UserRoutes: any[] = [
  {
    path: "/user",
    element: (props: any) => (
      <UserGlobalTemplates {...props}>
        <UserEntrypoint />
      </UserGlobalTemplates>
    ),
  },
  {
    path: "/user/toko",
    element: (props: any) => (
      <UserGlobalTemplates {...props}>
        <Toko />
      </UserGlobalTemplates>
    ),
  },
  {
    path: "/user/produk",
    element: (props: any) => (
      <UserGlobalTemplates {...props}>
        <Produk />
      </UserGlobalTemplates>
    ),
  },
  {
    path: "/user/diskon",
    element: (props: any) => (
      <UserGlobalTemplates {...props}>
        <Diskon />
      </UserGlobalTemplates>
    ),
  },
  {
    path: "/user/jasa",
    element: (props: any) => (
      <UserGlobalTemplates {...props}>
        <Jasa />
      </UserGlobalTemplates>
    ),
  },
  {
    path: "/user/member",
    element: (props: any) => (
      <UserGlobalTemplates {...props}>
        <Member />
      </UserGlobalTemplates>
    ),
  },
  {
    path: "/user/inventaris",
    element: (props: any) => (
      <UserGlobalTemplates {...props}>
        <Inventaris />
      </UserGlobalTemplates>
    ),
  },
  {
    path: "/user/modal",
    element: (props: any) => (
      <UserGlobalTemplates {...props}>
        <Modal />
      </UserGlobalTemplates>
    ),
  },
  {
    path: "/user/laporan",
    element: (props: any) => (
      <UserGlobalTemplates {...props}>
        <Laporan />
      </UserGlobalTemplates>
    ),
  },
  {
    path: "/user/bank",
    element: (props: any) => (
      <UserGlobalTemplates {...props}>
        <Bank />
      </UserGlobalTemplates>
    ),
  },
  {
    path: "/user/monitor-toko",
    element: (props: any) => (
      <UserGlobalTemplates {...props}>
        <MonitorToko />
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
