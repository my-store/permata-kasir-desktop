/* ===========================================================
|  HALAMAN TOKO
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 28-Jan-2026
|  Updated At: 30-Jan-2026
*/

// Node Modules
import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";

// Libraries
import { TokoInterface } from "../../../../lib/interfaces/database.interface";

// Templates
import { ContentLoading } from "../../../../templates/loading";

// Functions
import { getAllToko } from "./_func";

interface TemplateInterface {
  data: TokoInterface[];
  isPending: boolean;
}

function Header(): ReactNode {
  return (
    <div id="Header">
      <h1>Toko</h1>
      <p>Daftar Toko</p>
    </div>
  );
}

function Item({ data }: any): ReactNode {
  if (data.length < 1) return <p>Masih Kosong</p>;
  return data.map((d: TokoInterface, dx: number) => (
    <p key={dx}>
      {d.nama} | {d.tlp}
    </p>
  ));
}

function Template({ data, isPending }: TemplateInterface): ReactNode {
  const ready: boolean = !isPending;
  return (
    <div id="Toko">
      {isPending && (
        <ContentLoading style={{ width: "100%", height: "100vh" }} />
      )}
      {ready && <Header />}
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

  return (
    <div id="Toko">
      <Template data={query.data ?? []} isPending={query.isPending} />
    </div>
  );
}
