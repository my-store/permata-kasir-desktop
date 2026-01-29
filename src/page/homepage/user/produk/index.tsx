/* ===========================================================
|  HALAMAN PRODUK
|  ===========================================================
|  Halaman produk yang berisi ...
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 28-Jan-2026
|  Updated At: 29-Jan-2026
*/

// Node Modules
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { ReactNode } from "react";

// Libraries
import { openAlert } from "../../../../lib/redux/reducers/alert.reducer";
import { SERVER_URL } from "../../../../lib/constants/server.constant";
import { JSONGet } from "../../../../lib/system/requests";
import {
  getLoginCredentials,
  refreshToken,
} from "../../../../lib/system/credentials";

// Templates
import { ContentLoading } from "../../../../templates/loading";

interface ProdukInterface {
  id: number;
  uuid: string;
  nama: string;
  hargaPokok: number;
  hargaJual: number;
  createdAt: string;
  updatedAt: string;
}

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
  const dispatch = useDispatch();

  async function getProduk() {
    const savedCred = getLoginCredentials();
    const produk = await JSONGet(`${SERVER_URL}/api/v1/produk`, {
      headers: { Authorization: `Bearer ${savedCred.access_token}` },
    });

    if (produk.message) {
      // Token expired
      if (produk.message == "Unauthorized") {
        // Refresh token
        const tokenRefreshed = await refreshToken(savedCred);

        // Token is refreshed
        if (tokenRefreshed) {
          return getProduk();
        }

        // Error while refreshin token
        else {
          // Show alert | Error message
          throw dispatch(
            openAlert({
              type: "Error",
              title: "Gagal mengambil data",
              body: "Gagal melakukan refresh-token\nUnauthorized: getProduk()",
            }),
          );
        }
      }
    }

    return produk;
  }

  const query = useQuery({
    queryKey: ["user.produk.getAll"],
    queryFn: getProduk,
  });

  return (
    <div id="Produk">
      <Template data={query.data} isPending={query.isPending} />
    </div>
  );
}
