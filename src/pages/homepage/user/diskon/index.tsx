/* ===========================================================
|  HALAMAN DISKON
|  ===========================================================
|  Halaman diskon yang berisi ...
|  -----------------------------------------------------------
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
import { DiskonInterface } from "../../../../lib/interfaces/database.interface";

// Templates
import { ContentLoading } from "../../../../templates/loading";

// Functions
import { getAllDiskon } from "./_func";

interface TemplateInterface {
  data: DiskonInterface[];
  isPending: boolean;
}

function Header(): ReactNode {
  return (
    <div id="Header">
      <h1>Diskon</h1>
      <p>Daftar Diskon</p>
    </div>
  );
}

function Item({ data }: any): ReactNode {
  if (data.length < 1) return <p>Masih Kosong</p>;
  return data.map((d: DiskonInterface, dx: number) => (
    <p key={dx}>
      {d.keterangan}: {d.nilai}
    </p>
  ));
}

function Template({ data, isPending }: TemplateInterface): ReactNode {
  const ready: boolean = !isPending;
  return (
    <div id="Diskon">
      {isPending && (
        <ContentLoading style={{ width: "100%", height: "100vh" }} />
      )}
      {ready && <Header />}
      {ready && <Item data={data} />}
    </div>
  );
}

// Entry Point
export function Diskon(): ReactNode {
  const query = useQuery({
    queryKey: ["user.diskon.getAll"],
    queryFn: getAllDiskon,
  });

  return (
    <div id="Diskon">
      <Template data={query.data ?? []} isPending={query.isPending} />
    </div>
  );
}
