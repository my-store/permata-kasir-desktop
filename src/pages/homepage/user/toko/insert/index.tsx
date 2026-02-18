/* ===========================================================
|  INPUT DATA TOKO
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 5-Feb-2026
|  Updated At: 18-Feb-2026
*/

// Node Modules
import { useDispatch, useSelector } from "react-redux";
import { ReactNode, useEffect } from "react";
import $ from "jquery";

// Libraries
import { TokoInterface } from "../../../../../lib/interfaces/database.interface";
import { openAlert } from "../../../../../lib/redux/reducers/alert.reducer";
import { getLoginCredentials } from "../../../../../lib/system/credentials";
import { ReduxRootStateType } from "../../../../../lib/redux/store.redux";
import { errorSound } from "../../../../../lib/constants/media.constant";
import {
  closeUserTokoInsertForm,
  setWaitUserTokoInsert,
} from "../../../../../lib/redux/reducers/user/toko.reducer";
import {
  capitalizeFirstChar,
  capitalizeEachWord,
} from "../../../../../lib/system/string";

// Functions
import { insertToko } from "../_func";

// Style
import "../../../../../styles/pages/homepage/user/toko/user.toko.insert.style.sass";

export function UserTokoInsertForm(): ReactNode {
  const alertState = useSelector((state: ReduxRootStateType) => state.alert);
  const userTokoState = useSelector(
    (state: ReduxRootStateType) => state.user_toko,
  );
  const dispatch = useDispatch();

  function getInputs(): any {
    const nama: JQuery<HTMLInputElement | any> = $("input[name='nama']");
    const alamat: JQuery<HTMLInputElement | any> = $("input[name='alamat']");
    const tlp: JQuery<HTMLInputElement | any> = $("input[name='tlp']");
    return { nama, alamat, tlp };
  }

  function failed(msg: string): void {
    // Play error sound
    errorSound.play();

    // Show alert box
    dispatch(openAlert({ type: "Error", title: "Gagal Input", body: msg }));

    // Close from insert-wait state
    dispatch(setWaitUserTokoInsert(false));
  }

  async function save() {
    // If insert is already submit
    if (userTokoState.insert.wait) {
      // Block multiple submiting
      return;
    }

    const cred = getLoginCredentials();
    const { nama, alamat, tlp } = getInputs();

    // Tidak menulis nama
    if (nama.val().length < 1) {
      // Terminate task
      return failed("Mohon isi nama!");
    }

    // Tidak menulis alamat
    if (alamat.val().length < 1) {
      // Terminate task
      return failed("Mohon isi alamat!");
    }

    // Tidak menulis tlp
    if (tlp.val().length < 1) {
      // Terminate task
      return failed("Mohon isi No. Tlp!");
    }

    // Set insert-wait state
    dispatch(setWaitUserTokoInsert(true));

    const data: TokoInterface = {
      nama: capitalizeEachWord(nama.val()),
      alamat: capitalizeFirstChar(alamat.val()),
      tlp: tlp.val(),

      // Parent data
      userId: cred.data.id,
    };

    try {
      const d = await insertToko(data);
      console.log(d);
    } catch (err: any) {
      // Free user error code = 401
      // Paid user hit maximum error code = 200
      const { errMsg /*, errCode */ } = err;
      return failed(errMsg);
    }
  }

  function closeForm() {
    // No need to reset the form, because its component is removed when open-state is off
    dispatch(closeUserTokoInsertForm());
  }

  useEffect(() => {
    // Will focus if:
    // - First load (opened form), set focus to nama input
    // - When alert is closed, after displaying error message,
    //   set to which input is empty.
    const { nama, alamat, tlp } = getInputs();
    switch (true) {
      case nama.val().length < 1:
        nama.focus();
        break;
      case alamat.val().length < 1:
        alamat.focus();
        break;
      case tlp.val().length < 1:
        tlp.focus();
        break;
    }
  }, [alertState.opened]);

  return (
    <div className="User-Toko-Insert-Form-Container User-Toko-Insert-Form-Container-Active">
      <div id="User-Toko-Insert-Form">
        <div id="Form-Header">
          <h3>Buat Toko Baru</h3>
        </div>
        <div className="Form-Group">
          <label>Nama</label>
          <input type="text" autoComplete="off" name="nama" />
        </div>
        <div className="Form-Group">
          <label>Alamat</label>
          <input type="text" autoComplete="off" name="alamat" />
        </div>
        <div className="Form-Group">
          <label>No. Tlp</label>
          <input type="number" autoComplete="off" name="tlp" />
        </div>
        <div id="Form-Button">
          <button onClick={save}>Simpan</button>
          <button onClick={closeForm}>Batal</button>
        </div>
      </div>
    </div>
  );
}
