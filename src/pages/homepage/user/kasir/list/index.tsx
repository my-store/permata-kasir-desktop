/* ===========================================================
|  HALAMAN KASIR | LIST
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 26-Feb-2026
|  Updated At: 26-Feb-2026
*/

import { useSelector, useDispatch } from "react-redux";
import { FiPlus } from "react-icons/fi";
import { ReactNode } from "react";

// Libraries
import { openAlert } from "../../../../../lib/redux/reducers/alert.reducer";
import { ReduxRootStateType } from "../../../../../lib/redux/store.redux";
import { errorSound } from "../../../../../lib/constants/media.constant";
import {
  setTokoListUserKasirInsert,
  openUserKasirInsertForm,
} from "../../../../../lib/redux/reducers/user/kasir.reducer";
import {
  KasirInterface,
  TokoInterface,
} from "../../../../../lib/interfaces/database.interface";

// Templates
import { ContentLoading } from "../../../../../templates/loading";

// Insert Page
import { UserKasirInsertForm } from "../insert";

// Header
import { UserKasirListHeader } from "./header";

// Item
import { UserKasirListItem } from "./item";

// Style
import "../../../../../styles/pages/homepage/user/kasir/user.kasir.list.main.style.sass";

interface UserKasirListInterface {
  dataKasir: KasirInterface[];
  dataToko: TokoInterface[];
  isPending: boolean;
}

export function UserKasirList({
  isPending,
  dataKasir,
  dataToko,
}: UserKasirListInterface): ReactNode {
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
      {ready && <UserKasirListHeader />}

      {/* Items */}
      {ready && <UserKasirListItem dataKasir={dataKasir} />}

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
