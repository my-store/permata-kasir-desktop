/* ===========================================================
|  INPUT DATA KASIR
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 19-Feb-2026
|  Updated At: 19-Feb-2026
*/

// Style
import "../../../../../styles/pages/homepage/user/kasir/user.kasir.insert.style.sass";

// Node Modules
import { OrbitProgress } from "react-loading-indicators";
import { useDispatch, useSelector } from "react-redux";
import { ReactNode, useEffect } from "react";
import $ from "jquery";

// Libraries
import { KasirInterface } from "../../../../../lib/interfaces/database.interface";
import { getLoginCredentials } from "../../../../../lib/system/credentials";
import { openAlert } from "../../../../../lib/redux/reducers/alert.reducer";
import { ReduxRootStateType } from "../../../../../lib/redux/store.redux";
import { errorSound } from "../../../../../lib/constants/media.constant";
import { emptyInputCheck, readImage } from "../../../../../lib/dom";
import {
  closeUserKasirInsertForm,
  addNewUserKasirListItem,
  setWaitUserKasirInsert,
} from "../../../../../lib/redux/reducers/user/kasir.reducer";
import {
  capitalizeFirstChar,
  capitalizeEachWord,
} from "../../../../../lib/system/string";

// Function
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
    const tokoId: JQuery<HTMLSelectElement | any> = $("select[name='tokoId']");
    const foto: JQuery<HTMLInputElement | any> | any =
      $("input[name='foto']")[0];
    return { nama, alamat, tlp, password, tokoId, foto };
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
    // If insert is already submit
    if (userKasirState.insert.wait) {
      // Block multiple submiting
      return;
    }

    const cred = getLoginCredentials();

    const { nama, alamat, tlp, password, tokoId, foto } = getInputs();

    // Empty data checking ...
    const { status, message } = emptyInputCheck("#User-Kasir-Insert-Form");
    // Any empty data is detected
    if (!status) {
      // Terminate task, and display the message
      return failed(message);
    }

    // Empty image checking ...
    if (foto.files.length < 1) {
      // Terminate task
      return failed("Harap menambahkan foto!");
    }

    // Set insert-wait state
    dispatch(setWaitUserKasirInsert(true));

    const data = new FormData();
    data.append("nama", capitalizeEachWord(nama.val()));
    data.append("alamat", capitalizeFirstChar(alamat.val()));
    data.append("tlp", tlp.val());
    data.append("password", password.val());
    data.append("foto", foto.files[0]);

    // Parent data
    data.append("tokoId", tokoId.val());
    data.append("userId", cred.data.id);

    try {
      const newData: KasirInterface | any = await insertKasir(data);

      // Push new inserted data into list
      dispatch(addNewUserKasirListItem(newData));

      // Close form
      closeForm();
    } catch (err: any) {
      let msg: string = "";

      // User Rank error
      // Free user error code = 401
      // Paid user hit maximum error code = 200
      const { errMsg, errCode } = err;
      if (errMsg && errCode) {
        msg = errMsg;
      }

      // Empty field or other error
      const { message } = err;
      if (message) {
        msg = message;
      }

      // console.log(err);

      return failed(msg);
    }
  }

  function closeForm() {
    // Reset insert-wait state
    dispatch(setWaitUserKasirInsert(false));

    // Remove form
    dispatch(closeUserKasirInsertForm());
  }

  // function updateImage(e: ChangeEvent<HTMLInputElement>): any {
  //   readImage(e, (r: any) => {
  //     const foto = $("#Foto-Preview");
  //     foto.css("background-image", `url(${r})`);
  //   });
  // }

  // First open
  useEffect(() => {
    // Get the nama input
    const { nama } = getInputs();
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
    if (!alertState.opened) {
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
    }
  }, [alertState.opened]);

  return (
    <div className="User-Kasir-Insert-Form-Container User-Kasir-Insert-Form-Container-Active">
      <div id="User-Kasir-Insert-Form">
        {/* Header | Title */}
        <div id="Form-Header">
          <h3>Buat Kasir Baru</h3>
        </div>

        {/* Nama */}
        <div className="Form-Group">
          <label>Nama</label>
          <input type="text" autoComplete="off" name="nama" />
        </div>

        {/* Alamat */}
        <div className="Form-Group">
          <label>Alamat</label>
          <input type="text" name="alamat" />
        </div>

        {/* No. Tlp */}
        <div className="Form-Group">
          <label>No. Tlp</label>
          <input type="number" name="tlp" />
        </div>

        {/* Password */}
        <div className="Form-Group">
          <label>Password</label>
          <input type="text" name="password" />
        </div>

        {/* Toko */}
        <div className="Form-Group">
          {/* Loading */}
          {userKasirState.insert.tokoList.length < 1 && (
            <OrbitProgress size="small" variant="spokes" />
          )}

          {/* Toko List */}
          {userKasirState.insert.tokoList.length > 0 && <label>Toko</label>}
          {userKasirState.insert.tokoList.length > 0 && (
            <select
              name="tokoId"
              defaultValue={userKasirState.insert.tokoList[0].id}
            >
              {userKasirState.insert.tokoList.map((tl, tlx) => (
                <option key={tlx} value={tl.id}>
                  {tl.nama}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Foto */}
        <div className="Form-Group Foto-Preview-Container">
          <label>Foto</label>
          <input
            type="file"
            name="foto"
            onChange={(e) => {
              readImage(e, (r: any) => {
                const foto = $("#Foto-Preview");
                foto.css("background-image", `url(${r})`);
              });
            }}
          />
          <div
            id="Foto-Preview"
            onClick={() => {
              // Empty data checking ...
              const { status, message } = emptyInputCheck(
                "#User-Kasir-Insert-Form",
              );
              // Any empty data is detected
              if (!status) {
                // Terminate task, and display the message
                return failed(message);
              }
              // Open file picker
              $("input[name='foto']").trigger("click");
            }}
          ></div>
        </div>

        {/* Buttons */}
        <div id="Form-Button">
          <button onClick={save}>Simpan</button>
          <button onClick={closeForm}>Batal</button>
        </div>
      </div>
    </div>
  );
}
