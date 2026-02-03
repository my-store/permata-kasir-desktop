/* ===========================================================
|  HALAMAN JASA
|  ===========================================================
|  Halaman jasa yang berisi ...
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 28-Jan-2026
|  Updated At: 31-Jan-2026
*/

// Node Modules
import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";

// Libraries
import { JasaInterface } from "../../../../lib/interfaces/database.interface";

// Templates
import { ContentLoading } from "../../../../templates/loading";

// Functions
import { getAllJasa } from "./_func";

interface TemplateInterface {
  data: JasaInterface[];
  isPending: boolean;
}

function Header(): ReactNode {
  return (
    <div id="Header">
      <h1>Jasa</h1>
      <p>Daftar Jasa</p>
    </div>
  );
}

function Item({ data }: any): ReactNode {
  if (data.length < 1) return <p>Masih Kosong</p>;
  return data.map((d: JasaInterface, dx: number) => (
    <p key={dx}>
      {d.nama} | {d.biaya}
    </p>
  ));
}

function Template({ data, isPending }: TemplateInterface): ReactNode {
  const ready: boolean = !isPending;
  return (
    <div id="Jasa">
      {isPending && (
        <ContentLoading style={{ width: "100%", height: "100vh" }} />
      )}
      {ready && <Header />}
      {ready && <Item data={data} />}
    </div>
  );
}

// Entry Point
export function Jasa(): ReactNode {
  const query = useQuery({
    queryKey: ["user.jasa.getAll"],
    queryFn: getAllJasa,
  });

  return (
    <div id="Jasa">
      <Template data={query.data ?? []} isPending={query.isPending} />
    </div>
  );
}
