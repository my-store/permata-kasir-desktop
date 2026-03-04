/* ===========================================================
|  HALAMAN KASIR | LIST | ITEM
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 26-Feb-2026
|  Updated At: 4-Mar-2026
*/

// Node Modules
import { CSSProperties, ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import $ from "jquery";

// Libraries
import { KasirInterface } from "../../../../../../lib/interfaces/database.interface";
import { ReduxRootStateType } from "../../../../../../lib/redux/store.redux";
import {
  removeUserKasirListItemSelected,
  addUserKasirListItemSelected,
} from "../../../../../../lib/redux/reducers/user/kasir.reducer";

// Tooltip
import { UserKasirListItemTooltipNama } from "./tooltip/nama";

// Style
import "../../../../../../styles/pages/homepage/user/kasir/user.kasir.list.item.main.style.sass";
import {
  removeConfirm,
  // openConfirm,
} from "../../../../../../lib/redux/reducers/confirm.reducer";

export function UserKasirListItem({ dataKasir }: any): ReactNode {
  const state = useSelector((state: ReduxRootStateType) => state.user_kasir);
  const confirmState = useSelector(
    (state: ReduxRootStateType) => state.confirm,
  );
  const dispatch = useDispatch();

  function select(d: KasirInterface) {
    const alreadySelected: any = state.listSelected.find((s) => s.id == d.id);
    // Already selected
    if (alreadySelected) {
      // Terminate and un-select
      return dispatch(removeUserKasirListItemSelected(d));
    }
    // Select kasir
    dispatch(addUserKasirListItemSelected(d));
  }

  // TO FIX THIS, CREATE A BOX THAT CONTAIN ACTION BUTTON LIKE:
  // UPDATE, DELETE ETC.

  // function pressHandler({ key }: any) {
  //   if (key == "Delete") {
  //     /*
  //     |
  //     | MUST BE FIXED !!!
  //     |
  //     */
  //     const selected = state.listSelected;
  //     /*
  //     |
  //     | THE SELECTED VALUE IS ALWAYS [] | EMPTY ARRAY
  //     |
  //     */
  //     if (selected.length > 0) {
  //       dispatch(
  //         openConfirm({
  //           callbackId: "user.kasir.list.item.action.delete",
  //           title: "Hapus",
  //           body: `Hapus data?`,
  //         }),
  //       );
  //     }
  //   }
  // }

  // // First load Effetc
  // useEffect(() => {
  //   $(document).on("keyup", pressHandler);
  //   return () => {
  //     $(document).off("keyup", pressHandler);
  //   };
  // }, []);

  // Detect confirm callback, this will triggered by yes button inside confirm box
  useEffect(() => {
    // Make sure the callback status is true
    if (confirmState.callback) {
      // Make sure the confirm-box is opened
      if (confirmState.opened) {
        /* DELETE ACTION */
        if (confirmState.callbackId == "user.kasir.list.item.action.delete") {
          // Run delete task ...
          // Remove confirm box
          dispatch(removeConfirm());
        }
        /* UPDATE ACTION */
        if (confirmState.callbackId == "user.kasir.list.item.action.update") {
          // Run update task ...
          // Remove confirm box
          dispatch(removeConfirm());
        }
      }
    }
  }, [confirmState.callback]);

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
      {dataKasir.map((d: KasirInterface, dx: number) => {
        const matched: any = state.listSelected.find((s) => s.id == d.id);
        return (
          <div
            key={dx}
            className={matched ? "Item Item-Selected" : "Item"}
            onClick={() => select(d)}
          >
            {/* Nama */}
            <p data-tooltip-id={d.nama} className="Nama">
              {d.nama}
            </p>
            {/* Nama | Tooltip */}
            {UserKasirListItemTooltipNama(d)}

            {/* Alamat */}
            <p className="Alamat">{d.alamat}</p>

            {/* Status Online */}
            <p className="Online">
              <span className={d.online ? "Yes" : "No"}></span>
            </p>

            {/* No. Tlp */}
            <p className="Tlp">{d.tlp}</p>
          </div>
        );
      })}
    </div>
  );
}
