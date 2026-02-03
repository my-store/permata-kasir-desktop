/* ===========================================================
|  HALAMAN MEMBER
|  ===========================================================
|  Halaman member yang berisi ...
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
import { MemberInterface } from "../../../../lib/interfaces/database.interface";

// Templates
import { ContentLoading } from "../../../../templates/loading";

// Functions
import { getAllMember } from "./_func";

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
  const query = useQuery({
    queryKey: ["user.member.getAll"],
    queryFn: getAllMember,
  });

  return (
    <div id="Member">
      <Template data={query.data ?? []} isPending={query.isPending} />
    </div>
  );
}
