/* ===========================================================
|  HALAMAN TOKO
|  ===========================================================
|  Halaman toko yang berisi ...
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 28-Jan-2026
|  Updated At: 29-Jan-2026
*/

// Node Modules
import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";

// Libraries
import { SERVER_URL } from "../../../../lib/constants/server.constant";
import { JSONGet } from "../../../../lib/system/requests";
import {
  getLoginCredentials,
  refreshToken,
} from "../../../../lib/system/credentials";

// Templates
import { openAlert } from "../../../../lib/redux/reducers/alert.reducer";
import { ContentLoading } from "../../../../templates/loading";
import { useDispatch } from "react-redux";

interface TokoInterface {
  id: number;
  uuid: string;
  nama: string;
  alamat: string;
  tlp: string;
  createdAt: string;
  updatedAt: string;
}

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
  const dispatch = useDispatch();

  async function getToko() {
    const savedCred = getLoginCredentials();
    const toko = await JSONGet(`${SERVER_URL}/api/v1/toko`, {
      headers: { Authorization: `Bearer ${savedCred.access_token}` },
    });

    if (toko.message) {
      // Token expired
      if (toko.message == "Unauthorized") {
        // Refresh token
        const tokenRefreshed = await refreshToken(savedCred);

        // Token is refreshed
        if (tokenRefreshed) {
          return getToko();
        }

        // Error while refreshin token
        else {
          // Show alert | Error message
          throw dispatch(
            openAlert({
              type: "Error",
              title: "Gagal mengambil data",
              body: "Gagal melakukan refresh-token\nUnauthorized: getToko()",
            }),
          );
        }
      }
    }

    return toko;
  }

  const query = useQuery({ queryKey: ["user.toko.getAll"], queryFn: getToko });

  return (
    <div id="Toko">
      <Template data={query.data} isPending={query.isPending} />
    </div>
  );
}
