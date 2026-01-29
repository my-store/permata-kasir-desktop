/* ===========================================================
|  HALAMAN JASA
|  ===========================================================
|  Halaman jasa yang berisi ...
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

interface JasaInterface {
  id: number;
  uuid: string;
  nama: string;
  biaya: number;
  createdAt: string;
  updatedAt: string;
}

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
  const dispatch = useDispatch();

  async function getJasa() {
    const savedCred = getLoginCredentials();
    const jasa = await JSONGet(`${SERVER_URL}/api/v1/jasa`, {
      headers: { Authorization: `Bearer ${savedCred.access_token}` },
    });

    if (jasa.message) {
      // Token expired
      if (jasa.message == "Unauthorized") {
        // Refresh token
        const tokenRefreshed = await refreshToken(savedCred);

        // Token is refreshed
        if (tokenRefreshed) {
          return getJasa();
        }

        // Error while refreshin token
        else {
          // Show alert | Error message
          throw dispatch(
            openAlert({
              type: "Error",
              title: "Gagal mengambil data",
              body: "Gagal melakukan refresh-token\nUnauthorized: getJasa()",
            }),
          );
        }
      }
    }

    return jasa;
  }

  const query = useQuery({
    queryKey: ["user.jasa.getAll"],
    queryFn: getJasa,
  });

  return (
    <div id="Jasa">
      <Template data={query.data} isPending={query.isPending} />
    </div>
  );
}
