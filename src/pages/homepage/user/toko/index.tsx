/* ===========================================================
|  HALAMAN TOKO
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 28-Jan-2026
|  Updated At: 5-Feb-2026
*/

// Node Modules
import { CSSProperties, ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { FiPlus } from "react-icons/fi";

// Libraries
import { TokoInterface } from "../../../../lib/interfaces/database.interface";
import { ReduxRootStateType } from "../../../../lib/redux/store.redux";
import {
  openUserTokoInsertForm,
  setUserTokoList,
} from "../../../../lib/redux/reducers/user/toko.reducer";

// Templates
import { ContentLoading } from "../../../../templates/loading";

// Style
import "../../../../styles/pages/homepage/user/toko/user.toko.main.style.sass";

// Functions
import { getAllToko } from "./_func";

// Forms
import { UserTokoInsertForm } from "./insert";

interface TemplateInterface {
  data: TokoInterface[];
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
      {data.length < 1 && <p id="Empty-Message">Belum ada toko</p>}
      {data.map((d: TokoInterface, dx: number) => (
        <p key={dx}>
          {d.nama} | {d.tlp}
        </p>
      ))}
    </div>
  );
}

function Page({ data, isPending }: TemplateInterface): ReactNode {
  const state = useSelector((state: ReduxRootStateType) => state.user_toko);
  const dispatch = useDispatch();

  const ready: boolean = !isPending;
  return (
    <div id="Toko">
      {isPending && (
        <ContentLoading style={{ width: "100%", height: "100vh" }} />
      )}
      {ready && <Item data={data} />}
      <FiPlus
        className="Add-New-Btn"
        title="Buat toko baru"
        size={"1.5rem"}
        onClick={() => dispatch(openUserTokoInsertForm())}
      />
      {state.insert.opened && <UserTokoInsertForm />}
    </div>
  );
}

// Entry Point
export function Toko(): ReactNode {
  const { list } = useSelector((state: ReduxRootStateType) => state.user_toko);
  const dispatch = useDispatch();

  const { isPending, data } = useQuery({
    queryKey: ["user.toko.getAll"],
    queryFn: getAllToko,
  });

  useEffect(() => {
    if (data) {
      dispatch(setUserTokoList(data));
    }
  }, [data]);

  return <Page data={list} isPending={isPending} />;
}
