/* ===========================================================
|  HALAMAN MEMBER
|  ===========================================================
|  Halaman member yang berisi ...
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

interface MemberInterface {
  id: number;
  uuid: string;
  nama: string;
  alamat: string;
  tlp: string;
  createdAt: string;
  updatedAt: string;
}

interface TemplateInterface {
  data: MemberInterface[];
  isPending: boolean;
}

function Header(): ReactNode {
  return (
    <div id="Header">
      <h1>Member</h1>
      <p>Daftar Member</p>
    </div>
  );
}

function Item({ data }: any): ReactNode {
  if (data.length < 1) return <p>Masih Kosong</p>;
  return data.map((d: MemberInterface, dx: number) => (
    <p key={dx}>
      {d.nama} | {d.alamat} | {d.tlp}
    </p>
  ));
}

function Template({ data, isPending }: TemplateInterface): ReactNode {
  const ready: boolean = !isPending;
  return (
    <div id="Member">
      {isPending && (
        <ContentLoading style={{ width: "100%", height: "100vh" }} />
      )}
      {ready && <Header />}
      {ready && <Item data={data} />}
    </div>
  );
}

// Entry Point
export function Member(): ReactNode {
  const dispatch = useDispatch();

  async function getMember() {
    const savedCred = getLoginCredentials();
    const member = await JSONGet(`${SERVER_URL}/api/v1/member`, {
      headers: { Authorization: `Bearer ${savedCred.access_token}` },
    });

    if (member.message) {
      // Token expired
      if (member.message == "Unauthorized") {
        // Refresh token
        const tokenRefreshed = await refreshToken(savedCred);

        // Token is refreshed
        if (tokenRefreshed) {
          return getMember();
        }

        // Error while refreshin token
        else {
          // Show alert | Error message
          throw dispatch(
            openAlert({
              type: "Error",
              title: "Gagal mengambil data",
              body: "Gagal melakukan refresh-token\nUnauthorized: getMember()",
            }),
          );
        }
      }
    }

    return member;
  }

  const query = useQuery({
    queryKey: ["user.member.getAll"],
    queryFn: getMember,
  });

  return (
    <div id="Member">
      <Template data={query.data} isPending={query.isPending} />
    </div>
  );
}
