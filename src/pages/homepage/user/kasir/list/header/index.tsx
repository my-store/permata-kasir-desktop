/* ===========================================================
|  HALAMAN KASIR | LIST | HEADER
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 26-Feb-2026
|  Updated At: 26-Feb-2026
*/

// Node Modules
import { ReactNode } from "react";

// Style
import "../../../../../../styles/pages/homepage/user/kasir/user.kasir.list.header.main.style.sass";

export function UserKasirListHeader(): ReactNode {
  return (
    <div id="Item-Header">
      <p id="Nama">Nama</p>
      <p id="Alamat">Alamat</p>
      <p id="Online">Online</p>
      <p id="Tlp">No. Tlp</p>
    </div>
  );
}
