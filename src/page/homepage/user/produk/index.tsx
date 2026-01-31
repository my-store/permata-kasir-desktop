/* ===========================================================
|  HALAMAN PRODUK
|  ===========================================================
|  Halaman produk yang berisi ...
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
import { ProdukInterface } from "../../../../lib/interfaces/database.interface";

// Templates
import { ContentLoading } from "../../../../templates/loading";

// Templates
import { getAllProduk } from "./_func";

interface TemplateInterface {
  data: ProdukInterface[];
  isPending: boolean;
}

function Header(): ReactNode {
  return (
    <div id="Header">
      <h1>Produk</h1>
      <p>Daftar Produk</p>
    </div>
  );
}

function Item({ data }: any): ReactNode {
  if (data.length < 1) return <p>Masih Kosong</p>;
  return data.map((d: ProdukInterface, dx: number) => (
    <p key={dx}>
      {d.nama} {d.hargaPokok} | {d.hargaJual}
    </p>
  ));
}

function Template({ data, isPending }: TemplateInterface): ReactNode {
  const ready: boolean = !isPending;
  return (
    <div id="Produk">
      {isPending && (
        <ContentLoading style={{ width: "100%", height: "100vh" }} />
      )}
      {ready && <Header />}
      {ready && <Item data={data} />}
    </div>
  );
}

// Entry Point
export function Produk(): ReactNode {
  const query = useQuery({
    queryKey: ["user.produk.getAll"],
    queryFn: getAllProduk,
  });

  return (
    <div id="Produk">
      <Template data={query.data ?? []} isPending={query.isPending} />
    </div>
  );
}
