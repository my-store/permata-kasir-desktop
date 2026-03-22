/* ===========================================================
|  HALAMAN KASIR | LIST | ITEM | TOOLTIP | NAMA
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 26-Feb-2026
|  Updated At: 22-Mar-2026
*/

// Node Modules
import { Tooltip } from "react-tooltip";
import { ReactNode } from "react";

// Libraries
import { KasirInterface } from "../../../../../../../lib/interfaces/database.interface";
import { SERVER_URL } from "../../../../../../../lib/constants/server.constant";
import { extractTimestamp } from "../../../../../../../lib/system/string";

// Style
import "../../../../../../../styles/pages/homepage/user/kasir/user.kasir.list.item.tooltip.nama.main.style.sass";

export function UserKasirListItemTooltipNama(data: KasirInterface): ReactNode {
  let { nama, foto, lastOnline, createdAt, updatedAt } = data;

  lastOnline = lastOnline ? extractTimestamp(lastOnline) : "";
  createdAt = createdAt ? extractTimestamp(createdAt) : "";
  updatedAt = updatedAt ? extractTimestamp(updatedAt) : "";

  return (
    <Tooltip id={nama} place="bottom-start" className="Tooltip">
      {/* Image */}
      <div
        className="Tooltip-Image"
        style={{ backgroundImage: `url(${SERVER_URL}/static/${foto})` }}
      ></div>

      {/* Created | Registered At */}
      <div className="Tootip-Item">
        <p className="Key">Terdaftar</p>
        <p className="Val">: {createdAt}</p>
      </div>

      {/* Last Online */}
      {lastOnline && (
        <div className="Tootip-Item">
          <p className="Key">Terankhir Online</p>
          <p className="Val">: {lastOnline}</p>
        </div>
      )}

      {/* Updated At | Only show if trully updated */}
      {createdAt != updatedAt && (
        <div className="Tootip-Item">
          <p className="Key">Terakhir Diubah</p>
          <p className="Val">: {updatedAt}</p>
        </div>
      )}
    </Tooltip>
  );
}
