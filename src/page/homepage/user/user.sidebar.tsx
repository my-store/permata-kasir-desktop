/* ===========================================================
|  LEFT SIDEBAR
|  ===========================================================
|  Disini berisi tombol-tombol menuju halaman inti aplikasi.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 2-Feb-2026
|  Updated At: 2-Feb-2026
*/

// Node Modules
import { FaBookOpen, FaUserFriends } from "react-icons/fa";
import { IoHome, IoSettingsSharp } from "react-icons/io5";
import { GiProgression, GiWallet } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { FiActivity } from "react-icons/fi";
import { ImExit } from "react-icons/im";
import {
  FaServicestack,
  FaSackDollar,
  FaShopify,
  FaDropbox,
} from "react-icons/fa6";

// Libraries
import { setUserLoginData } from "../../../lib/redux/reducers/user/login.data.reducer";
import { rootOpenLoading } from "../../../lib/redux/reducers/root.reducer";
import { ReduxRootStateType } from "../../../lib/redux/store.redux";
import { logout } from "../../../lib/redux/reducers/login.reducer";
import {
  removeLoginCredentials,
  getLoginCredentials,
} from "../../../lib/system/credentials";

// Sidebar Style
import "../../../styles/pages/homepage/user/user.sidebar.style.sass";

// Socket object inside main.tsx
import { socket } from "../../../main";
import { MdDiscount } from "react-icons/md";
import { SERVER_URL } from "../../../lib/constants/server.constant";
import { openUserSettings } from "../../../lib/redux/reducers/user/settings.reducer";

// Entry Point
export function UserSidebar(): ReactNode {
  const loginDataState = useSelector(
    (state: ReduxRootStateType) => state.user_login_data,
  );
  const settingsState = useSelector(
    (state: ReduxRootStateType) => state.user_settings,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function signOut() {
    removeLoginCredentials();
    dispatch(rootOpenLoading());
    dispatch(logout());
    socket.disconnect();
  }

  function load() {
    // Jika tidak dibungkus try-catch, akan error saat logout.
    try {
      const { data } = getLoginCredentials();
      dispatch(setUserLoginData(data));
    } catch {}
  }

  useEffect(() => {
    // Cleanup function
    return () => {
      load();
    };
  }, []);

  return (
    <section id="Sidebar">
      {/* PROFILE */}
      <div id="Profile">
        <div id="Image-Container">
          <div
            id="Image"
            style={{
              backgroundImage: `url(${SERVER_URL}/static/${loginDataState.data?.foto})`,
            }}
          ></div>
        </div>
        <div id="Info">
          <p id="Name">{loginDataState.data?.nama}</p>
          <p id="Phone">{loginDataState.data?.tlp}</p>
        </div>
      </div>

      {/* USER BUTTONS */}
      <div id="User-Button-Container">
        <div className="Btn-Container">
          <IoHome size={"1.1rem"} color="#eee" />
          <button className="Sidebar-Btn" onClick={() => navigate("/user")}>
            Beranda
          </button>
        </div>
        <div className="Btn-Container">
          <FaShopify size={"1.1rem"} color="#eee" />
          <button
            className="Sidebar-Btn"
            onClick={() => navigate("/user/toko")}
          >
            Toko
          </button>
        </div>
        <div className="Btn-Container">
          <FaDropbox size={"1.1rem"} color="#eee" />
          <button
            className="Sidebar-Btn"
            onClick={() => navigate("/user/produk")}
          >
            Produk
          </button>
        </div>
        <div className="Btn-Container">
          <MdDiscount size={"1.1rem"} color="#eee" />
          <button
            className="Sidebar-Btn"
            onClick={() => navigate("/user/diskon")}
          >
            Diskon
          </button>
        </div>
        <div className="Btn-Container">
          <FaServicestack size={"1.1rem"} color="#eee" />
          <button
            className="Sidebar-Btn"
            onClick={() => navigate("/user/jasa")}
          >
            Jasa
          </button>
        </div>
        <div className="Btn-Container">
          <FaUserFriends size={"1.1rem"} color="#eee" />
          <button
            className="Sidebar-Btn"
            onClick={() => navigate("/user/member")}
          >
            Member
          </button>
        </div>
        <div className="Btn-Container">
          <FaBookOpen size={"1.1rem"} color="#eee" />
          <button onClick={() => navigate("/user/inventaris")}>
            Inventaris
          </button>
        </div>
        <div className="Btn-Container">
          <FaSackDollar size={"1.1rem"} color="#eee" />
          <button onClick={() => navigate("/user/modal")}>Modal</button>
        </div>
        <div className="Btn-Container">
          <GiProgression size={"1.1rem"} color="#eee" />
          <button onClick={() => navigate("/user/laporan")}>Laporan</button>
        </div>
        <div className="Btn-Container">
          <GiWallet size={"1.1rem"} color="#eee" />
          <button onClick={() => navigate("/user/bank")}>Bank</button>
        </div>
        <div className="Btn-Container">
          <FiActivity size={"1.1rem"} color="#eee" />
          <button onClick={() => navigate("/user/monitor-toko")}>
            Monitor Toko
          </button>
        </div>
      </div>

      {/* SYSTEM BUTTONS */}
      <div id="System-Button-Container">
        <div className="Btn-Container">
          <IoSettingsSharp size={"1.1rem"} color="#eee" />
          <button onClick={() => dispatch(openUserSettings())}>
            Pengaturan
          </button>
        </div>
        <div className="Btn-Container">
          <ImExit size={"1.1rem"} color="#eee" />
          <button onClick={signOut}>Keluar</button>
        </div>
      </div>
    </section>
  );
}
