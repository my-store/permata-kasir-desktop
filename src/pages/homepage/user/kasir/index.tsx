/* ===========================================================
|  HALAMAN KASIR
|  ===========================================================
|  Halaman kasir yang berisi ...
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 9-Feb-2026
|  Updated At: 9-Feb-2026
*/

// Node Modules
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { CSSProperties, ReactNode } from "react";
import { UserKasirInsertForm } from "./insert";
import { FiPlus } from "react-icons/fi";

// Libraries
import { openUserKasirInsertForm } from "../../../../lib/redux/reducers/user/kasir.reducer";
import { KasirInterface } from "../../../../lib/interfaces/database.interface";
import { ReduxRootStateType } from "../../../../lib/redux/store.redux";

// Templates
import { ContentLoading } from "../../../../templates/loading";

// Functions
import { getAllKasir } from "./_func";

// Style
import "../../../../styles/pages/homepage/user/kasir/user.kasir.main.style.sass";

interface PageInterface {
  data: KasirInterface[];
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
      {data.length < 1 && <p id="Empty-Message">Belum ada kasir</p>}
      {data.map((d: KasirInterface, dx: number) => (
        <p key={dx}>{d.nama}</p>
      ))}
    </div>
  );
}

function Page({ data, isPending }: PageInterface): ReactNode {
  const state = useSelector((state: ReduxRootStateType) => state.user_kasir);
  const dispatch = useDispatch();

  const ready: boolean = !isPending;
  return (
    <div id="User-Kasir">
      {isPending && (
        <ContentLoading style={{ width: "100%", height: "100vh" }} />
      )}
      {ready && <Item data={data} />}
      {ready && (
        <FiPlus
          className="Add-New-Btn"
          title="Buat kasir baru"
          size={"1.5rem"}
          onClick={() => dispatch(openUserKasirInsertForm())}
        />
      )}
      {ready && state.insert.opened && <UserKasirInsertForm />}
    </div>
  );
}

// Entry Point
export function Kasir(): ReactNode {
  const query = useQuery({
    queryKey: ["user.kasir.getAll"],
    queryFn: getAllKasir,
  });

  return <Page data={query.data ?? []} isPending={query.isPending} />;
}
