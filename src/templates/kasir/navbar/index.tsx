/* ===========================================================
|  TOP NAVBAR
|  ===========================================================
|  Disini berisi beberapa komponen seperti:
|  1. Brand "Permata Kasir"
|  2. Link bawaan aplikasi diantaranya link menuju halaman:
|     - Tentang Kami
|     - Hubungi Kami
|  3. Pemberitahuan
|  4. Tombol Logout
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 19-Jan-2026
|  Updated At: 27-Jan-2026
*/

// Node Modules
import { FiActivity, FiInfo, FiLayers, FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

// Navbar Style
import "../../../styles/templates/kasir/navbar.style.sass";

// Entry Point
export function KasirNavbar(): ReactNode {
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
          onClick={() => navigate("/kasir/contact")}
        />
        <FiInfo
          title="Tentang Kami"
          className="Badges-Btn"
          onClick={() => navigate("/kasir/about")}
        />
      </div>
    </nav>
  );
}
