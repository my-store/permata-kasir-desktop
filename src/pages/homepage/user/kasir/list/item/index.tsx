/* ===========================================================
|  HALAMAN KASIR | LIST | ITEM
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 26-Feb-2026
|  Updated At: 26-Feb-2026
*/

// Node Modules
import { CSSProperties, ReactNode } from "react";

// Libraries
import { KasirInterface } from "../../../../../../lib/interfaces/database.interface";

// Tooltip
import { UserKasirListItemTooltipNama } from "./tooltip/nama";

// Style
import "../../../../../../styles/pages/homepage/user/kasir/user.kasir.list.item.main.style.sass";

export function UserKasirListItem({ dataKasir }: any): ReactNode {
  let containerStyle: CSSProperties = {};

  // If dataKasir is grather than .., activate scrollbar
  if (dataKasir.length > 0) {
    containerStyle.overflowY = "scroll";
  }

  return (
    <div id="Item-Container" style={containerStyle}>
      {/* Empty Data */}
      {dataKasir.length < 1 && <p id="Empty-Message">Belum ada kasir</p>}

      {/* Data */}
      {dataKasir.map((d: KasirInterface, dx: number) => (
        <div key={dx} className="Item">
          {/* Nama */}
          <p data-tooltip-id={d.nama} className="Nama">
            {d.nama}
          </p>
          {/* Nama | Tooltip */}
          {UserKasirListItemTooltipNama(d)}

          {/* Alamat */}
          <p className="Alamat">{d.alamat}</p>

          {/* Status Online */}
          <p className="Online">
            <span className={d.online ? "Yes" : "No"}></span>
          </p>

          {/* No. Tlp */}
          <p className="Tlp">{d.tlp}</p>
        </div>
      ))}
    </div>
  );
}
