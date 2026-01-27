/* ===========================================================
|  LEFT SIDEBAR
|  ===========================================================
|  Disini berisi tombol-tombol menuju halaman inti aplikasi.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 19-Jan-2026
|  Updated At: 27-Jan-2026
*/

// Node Modules
import { useNavigate } from "react-router-dom";
import { FaSackDollar } from "react-icons/fa6";
import { GiProgression } from "react-icons/gi";
import { FaBookOpen } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { IoHome } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { ReactNode } from "react";

// Libraries
import { rootOpenLoading } from "../../../lib/redux/reducers/root.reducer";
import { removeLoginCredentials } from "../../../lib/system/credentials";
import { logout } from "../../../lib/redux/reducers/login.reducer";

// Sidebar Style
import "../../../styles/templates/user-sidebar.style.sass";

// Profile Image (Remove this in production)
import Image from "../../../assets/images/skull.png";

// Socket object inside main.tsx
import { socket } from "../../../main";

// Entry Point
export function UserSidebar(): ReactNode {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function signOut() {
    removeLoginCredentials();
    dispatch(rootOpenLoading());
    dispatch(logout());
    socket.disconnect();
  }

  return (
    <section id="Sidebar">
      <div id="Profile">
        <div id="Image" style={{ backgroundImage: `url(${Image})` }}></div>
        <div id="Info">
          <p id="Name"></p>
          <p id="Phone"></p>
        </div>
      </div>
      <div className="Btn-Container">
        <IoHome size={"1.35rem"} color="#eee" />
        <button className="Sidebar-Btn" onClick={() => navigate("/user")}>
          Beranda
        </button>
      </div>
      <div className="Btn-Container">
        <FaBookOpen size={"1.35rem"} color="#eee" />
        <button>Inventaris</button>
      </div>
      <div className="Btn-Container">
        <FaSackDollar size={"1.35rem"} color="#eee" />
        <button>Modal</button>
      </div>
      <div className="Btn-Container">
        <GiProgression size={"1.35rem"} color="#eee" />
        <button>Laporan</button>
      </div>
      <div className="Btn-Container">
        <ImExit size={"1.35rem"} color="#eee" />
        <button onClick={signOut}>Keluar</button>
      </div>

      <div id="Footer">
        <p id="Copyright">&copy; {new Date().getFullYear()} PMTKOM</p>
      </div>
    </section>
  );
}
