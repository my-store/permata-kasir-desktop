/* ===========================================================
|  SELURUH KONFIGURASI HALAMAN KASIR
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 19-Jan-2026
|  Updated At: 22-Feb-2026
*/

// Libraries
import { APP_PAGE_LOADING_DELAY } from "../../../lib/constants/app.constant";
import { rootRemoveLoading } from "../../../lib/redux/reducers/root.reducer";
import { ReduxRootStateType } from "../../../lib/redux/store.redux";

// Node Modules
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import $ from "jquery";

// Kasir Style
import "../../../styles/pages/homepage/kasir/kasir.main.style.sass";

// Socket object inside main.tsx
import { socket } from "../../../main";

// Kasir Entrypoint page
import KasirEntrypoint from "./entrypoint";

// Default pages
import { Contactpage } from "../../contactpage";
import { Aboutpage } from "../../aboutpage";

// Other kasir pages
import MesinKasir from "./mesin";

function KasirGlobalTemplates({ children, socketConnect }: any) {
  const loginState = useSelector((state: ReduxRootStateType) => state.login);
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

  if (!loginState.isLogin) {
    return <Navigate to={"/"} replace />;
  }

  return <div id="Kasir">{children}</div>;
}

export const KasirRoutes: any[] = [
  {
    path: "/kasir",
    element: (props: any) => (
      <KasirGlobalTemplates {...props}>
        <KasirEntrypoint />
      </KasirGlobalTemplates>
    ),
  },
  {
    path: "/kasir/mesin",
    element: (props: any) => (
      <KasirGlobalTemplates {...props}>
        <MesinKasir />
      </KasirGlobalTemplates>
    ),
  },
  {
    path: "/kasir/contact",
    element: (props: any) => (
      <KasirGlobalTemplates {...props}>
        <Contactpage />
      </KasirGlobalTemplates>
    ),
  },
  {
    path: "/kasir/about",
    element: (props: any) => (
      <KasirGlobalTemplates {...props}>
        <Aboutpage />
      </KasirGlobalTemplates>
    ),
  },
];
