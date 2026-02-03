/* ===========================================================
|  HALAMAN TOKO
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 28-Jan-2026
|  Updated At: 3-Feb-2026
*/

// Node Modules
import { useQuery } from "@tanstack/react-query";
import { CSSProperties, ReactNode } from "react";
import { FiPlus } from "react-icons/fi";

// Libraries
import { TokoInterface } from "../../../../lib/interfaces/database.interface";

// Templates
import { ContentLoading } from "../../../../templates/loading";

// Style
import "../../../../styles/pages/homepage/user/toko/user.toko.main.style.sass";

// Functions
import { getAllToko } from "./_func";

interface TemplateInterface {
  data: TokoInterface[];
  isPending: boolean;
}

function Item({ data }: any): ReactNode {
  let containerStyle: CSSProperties = {};

  // If data is grather than .., activate scrollbar
  if (data.length > 0) {
    containerStyle.overflowY = "scroll";
  }

  return (
    <div id="Items-Container" style={containerStyle}>
      {data.length < 1 && <p id="Empty-Message">Belum ada toko</p>}
      {data.length < 1 && (
        <div className="Add-New-Btn">
          <FiPlus />
        </div>
      )}
      {data.map((d: TokoInterface, dx: number) => (
        <p key={dx}>
          {d.nama} | {d.tlp}
        </p>
      ))}
    </div>
  );
}

function Page({ data, isPending }: TemplateInterface): ReactNode {
  const ready: boolean = !isPending;
  return (
    <div id="Toko">
      {isPending && (
        <ContentLoading style={{ width: "100%", height: "100vh" }} />
      )}
      {ready && <Item data={data} />}
    </div>
  );
}

// Entry Point
export function Toko(): ReactNode {
  const query = useQuery({
    queryKey: ["user.toko.getAll"],
    queryFn: getAllToko,
  });

  return <Page data={query.data ?? []} isPending={query.isPending} />;
}
