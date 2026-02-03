/* ===========================================================
|  TOP NAVBAR
|  ===========================================================
|  Disini berisi beberapa komponen paling atas pada aplikasi.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 2-Feb-2026
|  Updated At: 2-Feb-2026
*/

// Node Modules
import { FiActivity, FiInfo, FiLayers, FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

// Navbar Style
import "../../../styles/pages/homepage/user/user.navbar.style.sass";

// Entry Point
export function UserNavbar(): ReactNode {
  const navigate = useNavigate();

  return (
    <nav id="Navbar">
      <h1 id="App-Name">Permata Kasir</h1>
      <div id="Top-Badges">
        <FiActivity title="Aktifitas" className="Badges-Btn" />
        <FiLayers title="Dokumentasi" className="Badges-Btn" />
        <FiMail
          title="Hubungi Kami"
          className="Badges-Btn"
          onClick={() => navigate("/user/contact")}
        />
        <FiInfo
          title="Tentang Kami"
          className="Badges-Btn"
          onClick={() => navigate("/user/about")}
        />
      </div>
    </nav>
  );
}
