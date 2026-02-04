/* ===========================================================
|  HALAMAN PRODUK
|  ===========================================================
|  Halaman produk yang berisi ...
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
import { openUserProdukInsertForm } from "../../../../lib/redux/reducers/user/produk.reducer";
import { ProdukInterface } from "../../../../lib/interfaces/database.interface";
import { ReduxRootStateType } from "../../../../lib/redux/store.redux";

// Templates
import { ContentLoading } from "../../../../templates/loading";

// Style
import "../../../../styles/pages/homepage/user/produk/user.produk.main.style.sass";

// Function
import { getAllProduk } from "./_func";

// Forms
import { UserProdukInsertForm } from "./insert";

interface TemplateInterface {
  data: ProdukInterface[];
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
      {data.length < 1 && <p id="Empty-Message">Belum ada produk</p>}
      {data.map((d: ProdukInterface, dx: number) => (
        <p key={dx}>
          {d.nama} | {d.hargaJual}| {d.hargaPokok}
        </p>
      ))}
    </div>
  );
}

function Template({ data, isPending }: TemplateInterface): ReactNode {
  const state = useSelector((state: ReduxRootStateType) => state.user_produk);
  const dispatch = useDispatch();

  const ready: boolean = !isPending;
  return (
    <div id="Produk">
      {isPending && (
        <ContentLoading style={{ width: "100%", height: "100vh" }} />
      )}
      {ready && <Item data={data} />}
      <FiPlus
        className="Add-New-Btn"
        title="Buat produk baru"
        size={"1.5rem"}
        onClick={() => dispatch(openUserProdukInsertForm())}
      />
      {state.insert.opened && <UserProdukInsertForm />}
    </div>
  );
}

// Entry Point
export function Produk(): ReactNode {
  const query = useQuery({
    queryKey: ["user.produk.getAll"],
    queryFn: getAllProduk,
  });

  return (
    <div id="Produk">
      <Template data={query.data ?? []} isPending={query.isPending} />
    </div>
  );
}
