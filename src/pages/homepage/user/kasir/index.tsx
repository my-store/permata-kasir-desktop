/* ===========================================================
|  HALAMAN KASIR
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 9-Feb-2026
|  Updated At: 22-Feb-2026
*/

// Node Modules
import { CSSProperties, ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { UserKasirInsertForm } from "./insert";
import { FiPlus } from "react-icons/fi";

// Libraries
import { openAlert } from "../../../../lib/redux/reducers/alert.reducer";
import { ReduxRootStateType } from "../../../../lib/redux/store.redux";
import { errorSound } from "../../../../lib/constants/media.constant";
import {
  setTokoListUserKasirInsert,
  openUserKasirInsertForm,
  setUserKasirList,
} from "../../../../lib/redux/reducers/user/kasir.reducer";
import {
  KasirInterface,
  TokoInterface,
} from "../../../../lib/interfaces/database.interface";

// Templates
import { ContentLoading } from "../../../../templates/loading";

// Kasir Functions
import { getAllKasir } from "./_func";

// Toko Functions
import { getAllToko } from "../toko/_func";

// Style
import "../../../../styles/pages/homepage/user/kasir/user.kasir.main.style.sass";

interface PageInterface {
  dataKasir: KasirInterface[];
  dataToko: TokoInterface[];
  isPending: boolean;
}

function ItemHeader(): ReactNode {
  return (
    <div id="Item-Header">
      <p id="Nama">Nama</p>
      <p id="Alamat">Alamat</p>
      <p id="Tlp">No. Tlp</p>
    </div>
  );
}

function Item({ dataKasir }: any): ReactNode {
  let containerStyle: CSSProperties = {};

  // If dataKasir is grather than .., activate scrollbar
  if (dataKasir.length > 0) {
    containerStyle.overflowY = "scroll";
  }

  return (
    <div id="Item-Container" style={containerStyle}>
      {/* Empty Data */}
      {dataKasir.length < 1 && <p id="Empty-Message">Belum ada kasir</p>}

      {/* Data */}
      {dataKasir.map((d: KasirInterface, dx: number) => (
        <div key={dx} className="Item">
          <p className="Nama">{d.nama}</p>
          <p className="Alamat">{d.createdAt}</p>
          <p className="Tlp">{d.tlp}</p>
        </div>
      ))}
    </div>
  );
}

function Page({ dataKasir, dataToko, isPending }: PageInterface): ReactNode {
  const state = useSelector((state: ReduxRootStateType) => state.user_kasir);
  const dispatch = useDispatch();
  const ready: boolean = !isPending;

  return (
    <div id="User-Kasir">
      {/* Loading */}
      {isPending && (
        <ContentLoading style={{ width: "100%", height: "100vh" }} />
      )}

      {/* Header */}
      {ready && <ItemHeader />}

      {/* Items */}
      {ready && <Item dataKasir={dataKasir} />}

      {/* Add Button */}
      {ready && (
        <FiPlus
          className="Add-New-Btn"
          title="Buat kasir baru"
          size={"1.5rem"}
          onClick={() => {
            // Batalkan buka form, jika user belum memiliki toko
            if (dataToko.length < 1) {
              // Play error sound
              errorSound.play();

              // Display warning message
              return dispatch(
                openAlert({
                  type: "Warning",
                  title: "Gagal Membuka Form",
                  body: "Setidaknya anda memiliki satu toko, sebelum menambahkan kasir.",
                }),
              );
            }

            // Open insert form
            dispatch(openUserKasirInsertForm());

            // Set toko list to insert form
            dispatch(setTokoListUserKasirInsert(dataToko));
          }}
        />
      )}
      {ready && state.insert.opened && <UserKasirInsertForm />}
    </div>
  );
}

// Entry Point
export function Kasir(): ReactNode {
  const { list } = useSelector((state: ReduxRootStateType) => state.user_kasir);
  const dispatch = useDispatch();

  const query = {
    getAllKasir: useQuery({
      queryKey: ["user.kasir.getAll"],
      queryFn: getAllKasir,
    }),
    getAllToko: useQuery({
      queryKey: ["user.kasir.getAllToko"],
      queryFn: getAllToko,
    }),
  };

  useEffect(() => {
    if (query.getAllKasir.status == "success" && query.getAllKasir.data) {
      dispatch(setUserKasirList(query.getAllKasir.data));
    }
  }, [query.getAllKasir.status, query.getAllKasir.data]);

  const pending: boolean =
    query.getAllKasir.isPending == true || query.getAllToko.isPending == true;

  return (
    <Page
      dataKasir={list}
      dataToko={query.getAllToko.data ?? []}
      isPending={pending}
    />
  );
}
