// Style
import "../../../../../styles/pages/homepage/user/kasir/user.kasir.insert.style.sass";

// Node Modules
import { useDispatch, useSelector } from "react-redux";
import { ReactNode, useEffect } from "react";
import $ from "jquery";

// Libraries
import { getLoginCredentials } from "../../../../../lib/system/credentials";
import { openAlert } from "../../../../../lib/redux/reducers/alert.reducer";
import { ReduxRootStateType } from "../../../../../lib/redux/store.redux";
import { errorSound } from "../../../../../lib/constants/media.constant";
import {
  closeUserKasirInsertForm,
  setWaitUserKasirInsert,
} from "../../../../../lib/redux/reducers/user/kasir.reducer";
import {
  capitalizeFirstChar,
  capitalizeEachWord,
} from "../../../../../lib/system/string";
import { KasirInterface } from "../../../../../lib/interfaces/database.interface";
import { insertKasir } from "../_func";

export function UserKasirInsertForm(): ReactNode {
  const alertState = useSelector((state: ReduxRootStateType) => state.alert);
  const userKasirState = useSelector(
    (state: ReduxRootStateType) => state.user_kasir,
  );
  const dispatch = useDispatch();

  function getInputs(): any {
    const nama: JQuery<HTMLInputElement | any> = $("input[name='nama']");
    const alamat: JQuery<HTMLInputElement | any> = $("input[name='alamat']");
    const tlp: JQuery<HTMLInputElement | any> = $("input[name='tlp']");
    const password: JQuery<HTMLInputElement | any> = $(
      "input[name='password']",
    );
    return { nama, alamat, tlp, password };
  }

  function failed(msg: string): void {
    // Play error sound
    errorSound.play();

    // Show alert box
    dispatch(openAlert({ type: "Error", title: "Gagal Input", body: msg }));

    // Close from insert-wait state
    dispatch(setWaitUserKasirInsert(false));
  }

  async function save() {
    // Pending ...
    // Harus menambahkan metode untuk menginput ID toko
    return failed("Please add tokoId method!");

    // If insert is already submit
    if (userKasirState.insert.wait) {
      // Block multiple submiting
      return;
    }

    const cred = getLoginCredentials();

    const { nama, alamat, tlp, password } = getInputs();

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

    // Tidak menulis password
    if (password.val().length < 1) {
      // Terminate task
      return failed("Mohon isi No. Password!");
    }

    // Set insert-wait state
    dispatch(setWaitUserKasirInsert(true));

    const data: KasirInterface = {
      nama: capitalizeEachWord(nama.val()),
      alamat: capitalizeFirstChar(alamat.val()),
      tlp: tlp.val(),

      // Parent data
      userId: cred.data.id,
    };

    try {
      const d = await insertKasir(data);
      console.log(d);
    } catch (err: any) {
      // Free user error code = 401
      // Paid user hit maximum error code = 200
      const { errMsg /*, errCode */ } = err;
      return failed(errMsg);
    }
  }

  function closeForm() {
    dispatch(closeUserKasirInsertForm());
  }

  useEffect(() => {
    // Will focus if:
    // - First load (opened form), set focus to nama input
    // - When alert is closed, after displaying error message,
    //   set to which input is empty.
    const { nama, alamat, tlp, password } = getInputs();
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
      case password.val().length < 1:
        password.focus();
        break;
    }
  }, [alertState.opened]);

  return (
    <div id="Insert-Form-Container">
      <div id="Insert-Form">
        {/* Hidden Input */}
        <input type="hidden" name="tokoId" />

        <div id="Form-Header">
          <h3>Buat Kasir Baru</h3>
        </div>
        <div className="Form-Group">
          <label>Nama</label>
          <input type="text" autoComplete="off" name="nama" />
        </div>
        <div className="Form-Group">
          <label>Alamat</label>
          <input type="number" name="alamat" />
        </div>
        <div className="Form-Group">
          <label>No. Tlp</label>
          <input type="number" name="tlp" />
        </div>
        <div className="Form-Group">
          <label>Password</label>
          <input type="number" name="password" />
        </div>
        <div id="Form-Button">
          <button onClick={save}>Simpan</button>
          <button onClick={closeForm}>Batal</button>
        </div>
      </div>
    </div>
  );
}
