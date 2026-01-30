// Node Modules
import { useDispatch } from "react-redux";
import { ReactNode } from "react";

// Libraries
import { logout } from "../../../lib/redux/reducers/login.reducer";
import { rootOpenLoading } from "../../../lib/redux/reducers/root.reducer";
import { removeLoginCredentials } from "../../../lib/system/credentials";

// Socket object inside main.tsx
import { socket } from "../../../main";

export default function KasirEntrypoint(): ReactNode {
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
