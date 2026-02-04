/* ===========================================================
|  HALAMAN DISKON
|  ===========================================================
|  Halaman diskon yang berisi ...
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 28-Jan-2026
|  Updated At: 4-Feb-2026
*/

// Node Modules
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { CSSProperties, ReactNode } from "react";
import { FiPlus } from "react-icons/fi";

// Libraries
import { openUserDiskonInsertForm } from "../../../../lib/redux/reducers/user/diskon.reducer";
import { DiskonInterface } from "../../../../lib/interfaces/database.interface";
import { ReduxRootStateType } from "../../../../lib/redux/store.redux";

// Templates
import { ContentLoading } from "../../../../templates/loading";

// Style
import "../../../../styles/pages/homepage/user/diskon/user.diskon.main.style.sass";

// Functions
import { getAllDiskon } from "./_func";

// Forms
import { UserDiskonInsertForm } from "./insert";

interface TemplateInterface {
  data: DiskonInterface[];
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
      {data.length < 1 && <p id="Empty-Message">Belum ada diskon</p>}
      {data.map((d: DiskonInterface, dx: number) => (
        <p key={dx}>
          {d.keterangan} | {d.nilai}
        </p>
      ))}
    </div>
  );
}

function Template({ data, isPending }: TemplateInterface): ReactNode {
  const state = useSelector((state: ReduxRootStateType) => state.user_diskon);
  const dispatch = useDispatch();

  const ready: boolean = !isPending;
  return (
    <div id="Diskon">
      {isPending && (
        <ContentLoading style={{ width: "100%", height: "100vh" }} />
      )}
      {ready && <Item data={data} />}
      <FiPlus
        className="Add-New-Btn"
        title="Buat diskon baru"
        size={"1.5rem"}
        onClick={() => dispatch(openUserDiskonInsertForm())}
      />
      {state.insert.opened && <UserDiskonInsertForm />}
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
