/* ===========================================================
|  INPUT DATA TOKO
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 5-Feb-2026
|  Updated At: 22-Feb-2026
*/

// Node Modules
import { useDispatch, useSelector } from "react-redux";
import { ReactNode, useEffect } from "react";

// Libraries
import { TokoInterface } from "../../../../../lib/interfaces/database.interface";
import { openAlert } from "../../../../../lib/redux/reducers/alert.reducer";
import { getLoginCredentials } from "../../../../../lib/system/credentials";
import { ReduxRootStateType } from "../../../../../lib/redux/store.redux";
import { errorSound } from "../../../../../lib/constants/media.constant";
import {
  addNewUserTokoListItem,
  closeUserTokoInsertForm,
  setWaitUserTokoInsert,
} from "../../../../../lib/redux/reducers/user/toko.reducer";
import { getFormFields } from "../../../../../lib/dom";
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
    const { nama, alamat, tlp } = getFormFields("#User-Toko-Insert-Form");

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
      const newData: TokoInterface | any = await insertToko(data);

      // Push new inserted data into list
      dispatch(addNewUserTokoListItem(newData));

      // Close form
      closeForm();
    } catch (err: any) {
      let msg: string = "";
      // Known error
      try {
        const { errMsg } = err.response.data;
        msg = errMsg;
      } catch {
        // Unknown error
        msg = JSON.stringify(err);
      }
      return failed(msg);
    }
  }

  function closeForm() {
    // Close from insert-wait state
    dispatch(setWaitUserTokoInsert(false));

    // Remove form
    // No need to reset the form, because its component is removed when open-state is off
    dispatch(closeUserTokoInsertForm());
  }

  // First open
  useEffect(() => {
    // Get the nama input
    const { nama } = getFormFields("#User-Toko-Insert-Form");
    // Wait until nama input is found
    setTimeout(() => {
      // Make sure nama uinput is founded
      if (nama) {
        // Set focus into it
        nama.focus();
      }
    }, 1000);
  }, []);

  // Input focus | Alert listener
  useEffect(() => {
    // Will focus if:
    // - First load (opened form), set focus to nama input
    // - When alert is closed, after displaying error message,
    //   set to which input is empty.
    const { nama, alamat, tlp } = getFormFields("#User-Toko-Insert-Form");
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
