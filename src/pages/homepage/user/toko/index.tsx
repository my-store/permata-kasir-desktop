/* ===========================================================
|  HALAMAN TOKO
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 28-Jan-2026
|  Updated At: 7-Feb-2026
*/

// Node Modules
import { CSSProperties, ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { FiPlus } from "react-icons/fi";

// Libraries
import { TokoInterface } from "../../../../lib/interfaces/database.interface";
import { ReduxRootStateType } from "../../../../lib/redux/store.redux";
import { errorSound } from "../../../../lib/constants/media.constant";
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
import { openAlert } from "../../../../lib/redux/reducers/alert.reducer";

interface TemplateInterface {
  data: TokoInterface[];
  isPending: boolean;
}

function ItemHeader(): ReactNode {
  return (
    <div id="Item-Header">
      <p id="Nama">Nama</p>
      <p id="Alamat">Alamat</p>
      <p id="Tlp">No. Tlp</p>
      <p id="Jumlah-Kasir">Jumlah Kasir</p>
    </div>
  );
}

function Item({ data }: any): ReactNode {
  let containerStyle: CSSProperties = {};

  // If data is grather than .., activate scrollbar
  if (data.length > 0) {
    containerStyle.overflowY = "scroll";
  }

  return (
    <div id="Item-Container" style={containerStyle}>
      {data.length < 1 && <p id="Empty-Message">Belum ada toko</p>}
      {data.map((d: TokoInterface, dx: number) => {
        const jumlahKasir: any = d.kasir?.length;
        return (
          <div key={dx} className="Item">
            <p className="Nama">{d.nama}</p>
            <p className="Alamat">{d.alamat}</p>
            <p className="Tlp">{d.tlp}</p>
            <p className="Jumlah-Kasir">{jumlahKasir}</p>
          </div>
        );
      })}
    </div>
  );
}

function Page({ data, isPending }: TemplateInterface): ReactNode {
  const loginState = useSelector(
    (state: ReduxRootStateType) => state.user_login_data,
  );
  const state = useSelector((state: ReduxRootStateType) => state.user_toko);
  const dispatch = useDispatch();

  async function openInsertForm() {
    // Check for limited user
    const { maxToko }: any = loginState.data?.userRank;

    const limit: boolean = maxToko == state.list.length;

    // User telah mencapai batas pembuatan Toko
    if (limit) {
      // Play error sound
      errorSound.play();

      // Pesan error
      let bodyMsg: string = "Silahkan ";

      // Free user
      if (maxToko == 1) {
        bodyMsg += "membeli paket premium untuk membuat toko baru.";
      }

      // Paid user
      else {
        bodyMsg += `upgrade paket premium anda agar dapat membuat lebih dari ${maxToko} toko.`;
      }

      return dispatch(
        openAlert({
          type: "Warning",
          title: "Permintaan Ditolak",
          body: bodyMsg,
        }),
      );
    }

    // Open insert form
    dispatch(openUserTokoInsertForm());
  }

  const ready: boolean = !isPending;
  return (
    <div id="Toko">
      {/* Loading */}
      {isPending && (
        <ContentLoading style={{ width: "100%", height: "100vh" }} />
      )}
      {/* Header */}
      {ready && <ItemHeader />}

      {/* Items */}
      {ready && <Item data={data} />}

      {/* Insert Form Trigger */}
      {ready && (
        <FiPlus
          className="Add-New-Btn"
          title="Buat toko baru"
          size={"1.5rem"}
          onClick={openInsertForm}
        />
      )}

      {/* Inser Form */}
      {ready && state.insert.opened && <UserTokoInsertForm />}
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
