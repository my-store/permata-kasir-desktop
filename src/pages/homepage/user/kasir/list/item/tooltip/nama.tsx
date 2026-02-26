/* ===========================================================
|  HALAMAN KASIR | LIST | ITEM | TOOLTIP | NAMA
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 26-Feb-2026
|  Updated At: 26-Feb-2026
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
  const createdAt: string = extractTimestamp(data.createdAt || "");
  const updatedAt: string = extractTimestamp(data.updatedAt || "");

  return (
    <Tooltip id={data.nama} place="bottom-start" className="Tooltip">
      {/* Image */}
      <div
        className="Tooltip-Image"
        style={{ backgroundImage: `url(${SERVER_URL}/static/${data.foto})` }}
      ></div>

      {/* Status Aktif */}
      <div className="Tootip-Item">
        <p className="Key">Aktif</p>
        <p className="Val">: {data.active ? "Ya" : "Tidak"}</p>
      </div>

      {/* Created | Registered At */}
      <div className="Tootip-Item">
        <p className="Key">Terdaftar</p>
        <p className="Val">: {createdAt}</p>
      </div>

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
