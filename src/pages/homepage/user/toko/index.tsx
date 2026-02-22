/* ===========================================================
|  HALAMAN TOKO
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 28-Jan-2026
|  Updated At: 22-Feb-2026
*/

// Node Modules
import { CSSProperties, ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { FiPlus } from "react-icons/fi";
import { Tooltip } from "react-tooltip";

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
import { extractTimestamp, getAllToko } from "./_func";

// Forms
import { UserTokoInsertForm } from "./insert";
import { openAlert } from "../../../../lib/redux/reducers/alert.reducer";

interface PageInterface {
  data: TokoInterface[];
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

function ItemTooltip(data: TokoInterface): ReactNode {
  const jmlPrd: any = data._count?.produk;
  const jmlJasa: any = data._count?.jasa;
  const jmlKasir: any = data._count?.kasir;
  const jmlTrsPmb: any = data._count?.transaksiPembelian;
  const jmlTrsPnj: any = data._count?.transaksiPenjualan;
  const jmlMnt: any = data._count?.monitorToko;
  const createdAt: string = extractTimestamp(data.createdAt || "");
  const updatedAt: string = extractTimestamp(data.updatedAt || "");

  return (
    <Tooltip id={data.nama} place="bottom-start" className="Tooltip">
      {/* Jumlah Produk */}
      <div className="Tootip-Item">
        <p className="Key">Jml. Produk</p>
        <p className="Val">: {jmlPrd > 0 ? jmlPrd : "-"}</p>
      </div>

      {/* Jumlah Jasa */}
      <div className="Tootip-Item">
        <p className="Key">Jml. Jasa</p>
        <p className="Val">: {jmlJasa > 0 ? jmlJasa : "-"}</p>
      </div>

      {/* Jumlah Kasir */}
      <div className="Tootip-Item">
        <p className="Key">Jml. Kasir</p>
        <p className="Val">: {jmlKasir > 0 ? jmlKasir : "-"}</p>
      </div>

      {/* Jumlah Transaksi Penjualan */}
      <div className="Tootip-Item">
        <p className="Key">Jml. Trs. Penjualan</p>
        <p className="Val">: {jmlTrsPnj > 0 ? jmlTrsPnj : "-"}</p>
      </div>

      {/* Jumlah Transaksi Pembelian */}
      <div className="Tootip-Item">
        <p className="Key">Jml. Trs. Pembelian</p>
        <p className="Val">: {jmlTrsPmb > 0 ? jmlTrsPmb : "-"}</p>
      </div>

      {/* Jumlah Akun Monitor */}
      <div className="Tootip-Item">
        <p className="Key">Jml. Akun Monitor</p>
        <p className="Val">: {jmlMnt > 0 ? jmlMnt : "-"}</p>
      </div>

      {/* Created | Registered At */}
      <div className="Tootip-Item">
        <p className="Key">Terdaftar</p>
        <p className="Val">: {createdAt}</p>
      </div>

      {/* Updated At | Only show if trully updated */}
      {createdAt != updatedAt && (
        <div className="Tootip-Item">
          <p className="Key">Terakhir Diubah</p>
          <p className="Val">: {updatedAt}</p>
        </div>
      )}
    </Tooltip>
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
      {data.map((d: TokoInterface, dx: number) => (
        <div key={dx} className="Item">
          <p data-tooltip-id={d.nama} className="Nama">
            {dx + 1}. {d.nama}
          </p>
          {ItemTooltip(d)}
          <p className="Alamat">{d.alamat}</p>
          <p className="Tlp">{d.tlp}</p>
        </div>
      ))}
    </div>
  );
}

function Page({ data, isPending }: PageInterface): ReactNode {
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
    <div id="User-Toko">
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

  const { status, data, isPending } = useQuery({
    queryKey: ["user.toko.getAll"],
    queryFn: getAllToko,
  });

  useEffect(() => {
    if (status == "success" && data) {
      dispatch(setUserTokoList(data));
    }
  }, [status, data]);

  return <Page data={list} isPending={isPending} />;
}
