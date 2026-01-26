/* ===========================================================
|  PERMATA KASIR 2026
|  ===========================================================
|  Permata Kasir berpindah dari Electron ke Tauri pada:
|  Senin, 19 Januari 2026
|  -----------------------------------------------------------
|  Karna alasan performa, kami memilih tauri dengan backend
|  Rust, karna ukuran file lebih kecil dan berjalan
|  di komputer secara Native.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 19-Jan-2026
|  Updated At: 19-Jan-2026
*/

// Pages
import { KasirRoutes } from "./page/homepage/kasir";
import { UserRoutes } from "./page/homepage/user";
import { Loginpage } from "./page/login";

// Libraries
import { RootProtectedLayoutInterface } from "./lib/interfaces/root.interface";
import { ReduxRootStateType, store } from "./lib/redux/store.redux";
import { getLoginCredentials } from "./lib/system/credentials";
import { SERVER_URL } from "./lib/constants/server.constant";
import { findDeepUrl } from "./lib/system/url";
import { Log, Error } from "./lib/system/log";

// Node Modules
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Navigate,
  Routes,
  Outlet,
  Route,
} from "react-router-dom";

// Main Style
import "./styles/app.style.sass";

// Templates
import { PageLoading } from "./templates/loading";
import Alert from "./templates/alert";

export let socket: Socket;

const queryClient = new QueryClient();

// Protected routes
function ProtectedRoutes({ role }: RootProtectedLayoutInterface) {
  const loginState = useSelector((state: ReduxRootStateType) => state.login);

  // Not signed-in, redirect to login page
  const deepUrl: string = findDeepUrl();
  if (!loginState.isLogin)
    return <Navigate to={`/?redirect=${deepUrl}`} replace />;

  // Unauthorized, signed-in but requested URL is not match with its login role
  const unauthorized_url: string = "/unauthorized";
  if (loginState.loginRole != role)
    return <Navigate to={unauthorized_url} replace />;

  // Display page for (admin | kasir | user)
  return <Outlet />;
}

// Main Class
function App(): ReactNode {
  const rootState = useSelector((state: ReduxRootStateType) => state.root);
  const alertState = useSelector((state: ReduxRootStateType) => state.alert);

  function socketConnect(callback: Function) {
    socket = io(SERVER_URL);
    /*
    | -----------------------------------------------------------------------
    | WHEN I'AM IS CONNECTED TO SOCKET SERVER
    | -----------------------------------------------------------------------
    | Get my login data in local-storage and sent to server for broadcast
    | The last step is inside socket connected listener.
    | -----------------------------------------------------------------------
    | NOTE:
    | Set login state first before set ready, only if token is still active
    | if not, will force redirect to login page, because default value
    | of 'isLogin' is false.
    | If not connected to the server will never redirected.
    */
    socket.on("connect", () => {
      Log("Socket is now connected");

      // Broadcast to other, that i'm is online now
      const { role, data } = getLoginCredentials();
      socket.emit("online", { tlp: data.tlp, role });

      // Return the next logic to callback
      callback();
    });

    // When socket is disconected
    socket.on("disconnect", () => {
      Error("Socket disconnected");
    });
  }

  return (
    <BrowserRouter>
      <div id="Page-Container">
        {/* Loading animation */}
        {rootState.isLoading && <PageLoading easing="ease-in-out" />}

        {/* Alert box */}
        {alertState.opened && <Alert />}

        <Routes>
          {/* Login | Default landing page logic */}
          <Route path="/" element={<Loginpage />} />

          {/* User routes */}
          <Route element={<ProtectedRoutes role="User" />}>
            {UserRoutes.map((userRoute, userRouteIndex) => (
              <Route
                key={userRouteIndex}
                path={userRoute.path}
                element={userRoute.element({ socketConnect })}
              />
            ))}
          </Route>

          {/* Kasir routes */}
          <Route element={<ProtectedRoutes role="Kasir" />}>
            {KasirRoutes.map((kasirRoute, kasirRouteIndex) => (
              <Route
                key={kasirRouteIndex}
                path={kasirRoute.path}
                element={kasirRoute.element({ socketConnect })}
              />
            ))}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// Entry Point
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);
