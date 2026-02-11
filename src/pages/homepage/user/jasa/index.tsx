/* ===========================================================
|  HALAMAN JASA
|  ===========================================================
|  Halaman jasa yang berisi ...
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
import { UserJasaInsertForm } from "./insert";
import { FiPlus } from "react-icons/fi";

// Libraries
import { openUserJasaInsertForm } from "../../../../lib/redux/reducers/user/jasa.reducer";
import { JasaInterface } from "../../../../lib/interfaces/database.interface";
import { ReduxRootStateType } from "../../../../lib/redux/store.redux";

// Templates
import { ContentLoading } from "../../../../templates/loading";

// Functions
import { getAllJasa } from "./_func";

// Style
import "../../../../styles/pages/homepage/user/jasa/user.jasa.main.style.sass";

interface PageInterface {
  data: JasaInterface[];
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
      {data.length < 1 && <p id="Empty-Message">Belum ada jasa</p>}
      {data.map((d: JasaInterface, dx: number) => (
        <p key={dx}>
          {d.nama} | {d.biaya}
        </p>
      ))}
    </div>
  );
}

function Page({ data, isPending }: PageInterface): ReactNode {
  const state = useSelector((state: ReduxRootStateType) => state.user_jasa);
  const dispatch = useDispatch();

  const ready: boolean = !isPending;
  return (
    <div id="Jasa">
      {isPending && (
        <ContentLoading style={{ width: "100%", height: "100vh" }} />
      )}
      {ready && <Item data={data} />}
      {ready && (
        <FiPlus
          className="Add-New-Btn"
          title="Buat jasa baru"
          size={"1.5rem"}
          onClick={() => dispatch(openUserJasaInsertForm())}
        />
      )}
      {ready && state.insert.opened && <UserJasaInsertForm />}
    </div>
  );
}

// Entry Point
export function Jasa(): ReactNode {
  const query = useQuery({
    queryKey: ["user.jasa.getAll"],
    queryFn: getAllJasa,
  });

  return <Page data={query.data ?? []} isPending={query.isPending} />;
}
