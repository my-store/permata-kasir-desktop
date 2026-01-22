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
|  Updated At: 19-Jan-2026
*/

// Node Modules
import { FiActivity, FiLayers } from "react-icons/fi";
import { ReactNode } from "react";

// Navbar Style
import "../styles/templates/navbar.style.sass";

// Entry Point
export function Navbar(): ReactNode {
  return (
    <nav id="Navbar">
      <h1 id="App-Name">Permata Kasir</h1>
      <div id="Top-Badges">
        <FiActivity title="Aktifitas" className="Badges-Btn" />
        <FiLayers title="Dokumentasi" className="Badges-Btn" />
      </div>
    </nav>
  );
}
