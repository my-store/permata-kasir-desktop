/* ===========================================================
|  HALAMAN MEMBER
|  ===========================================================
|  Halaman member yang berisi ...
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 28-Jan-2026
|  Updated At: 9-Feb-2026
*/

// Node Modules
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { CSSProperties, ReactNode } from "react";
import { FiPlus } from "react-icons/fi";

// Libraries
import { openUserMemberInsertForm } from "../../../../lib/redux/reducers/user/member.reducer";
import { MemberInterface } from "../../../../lib/interfaces/database.interface";
import { ReduxRootStateType } from "../../../../lib/redux/store.redux";

// Templates
import { ContentLoading } from "../../../../templates/loading";

// Style
import "../../../../styles/pages/homepage/user/member/user.member.main.style.sass";

// Functions
import { getAllMember } from "./_func";

// Forms
import { UserMemberInsertForm } from "./insert";

interface PageInterface {
  data: MemberInterface[];
  isPending: boolean;
}

function Item({ data }: any): ReactNode {
  let containerStyle: CSSProperties = {};

  // If data is grather than .., activate scrollbar
  if (data.length > 0) {
    containerStyle.overflowY = "scroll";
  }

  return (
    <div id="Items-Container" style={containerStyle}>
      {data.length < 1 && <p id="Empty-Message">Belum ada member</p>}
      {data.map((d: MemberInterface, dx: number) => (
        <p key={dx}>
          {d.nama} | {d.alamat}
        </p>
      ))}
    </div>
  );
}

function Page({ data, isPending }: PageInterface): ReactNode {
  const state = useSelector((state: ReduxRootStateType) => state.user_member);
  const dispatch = useDispatch();

  const ready: boolean = !isPending;
  return (
    <div id="Member">
      {isPending && (
        <ContentLoading style={{ width: "100%", height: "100vh" }} />
      )}
      {ready && <Item data={data} />}
      {ready && (
        <FiPlus
          className="Add-New-Btn"
          title="Buat member baru"
          size={"1.5rem"}
          onClick={() => dispatch(openUserMemberInsertForm())}
        />
      )}
      {ready && state.insert.opened && <UserMemberInsertForm />}
    </div>
  );
}

// Entry Point
export function Member(): ReactNode {
  const query = useQuery({
    queryKey: ["user.member.getAll"],
    queryFn: getAllMember,
  });

  return <Page data={query.data ?? []} isPending={query.isPending} />;
}
