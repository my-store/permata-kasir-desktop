/* ===========================================================
|  HALAMAN DISKON
|  ===========================================================
|  Halaman diskon yang berisi ...
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

interface DiskonInterface {
  id: number;
  uuid: string;
  keterangan: string;
  nilai: number;
  createdAt: string;
  updatedAt: string;
}

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
  const dispatch = useDispatch();

  async function getDiskon() {
    const savedCred = getLoginCredentials();
    const diskon = await JSONGet(`${SERVER_URL}/api/v1/diskon`, {
      headers: { Authorization: `Bearer ${savedCred.access_token}` },
    });

    if (diskon.message) {
      // Token expired
      if (diskon.message == "Unauthorized") {
        // Refresh token
        const tokenRefreshed = await refreshToken(savedCred);

        // Token is refreshed
        if (tokenRefreshed) {
          return getDiskon();
        }

        // Error while refreshin token
        else {
          // Show alert | Error message
          throw dispatch(
            openAlert({
              type: "Error",
              title: "Gagal mengambil data",
              body: "Gagal melakukan refresh-token\nUnauthorized: getDiskon()",
            }),
          );
        }
      }
    }

    return diskon;
  }

  const query = useQuery({
    queryKey: ["user.diskon.getAll"],
    queryFn: getDiskon,
  });

  return (
    <div id="Diskon">
      <Template data={query.data} isPending={query.isPending} />
    </div>
  );
}
