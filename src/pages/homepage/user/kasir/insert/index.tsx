/* ===========================================================
|  INPUT DATA KASIR
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 9-Feb-2026
|  Updated At: 22-Feb-2026
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
import {
  emptyInputCheck,
  getFormFields,
  readImage,
} from "../../../../../lib/dom";
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

    // Empty data checking ...
    const { status, message } = emptyInputCheck("#User-Kasir-Insert-Form");
    // Any empty data is detected
    if (!status) {
      // Terminate task, and display the message
      return failed(message);
    }

    const { nama, alamat, tlp, password, tokoId, foto } = getFormFields(
      "#User-Kasir-Insert-Form",
    );

    // Empty image checking ...
    if (foto.files.length < 1) {
      // Terminate task
      return failed("Harap menambahkan foto!");
    }

    // Set insert-wait state
    dispatch(setWaitUserKasirInsert(true));

    const cred = getLoginCredentials();

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
      // Known error
      try {
        const { message } = err.response.data;
        msg = message;
      } catch {
        // Unknown error
        msg = JSON.stringify(err);
      }
      return failed(msg);
    }
  }

  function closeForm() {
    // Reset insert-wait state
    dispatch(setWaitUserKasirInsert(false));

    // Remove form
    // No need to reset the form, because its component is removed when open-state is off
    dispatch(closeUserKasirInsertForm());
  }

  // First open
  useEffect(() => {
    // Get the nama input
    const { nama } = getFormFields("#User-Kasir-Insert-Form");
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
      const { nama, alamat, tlp, password } = getFormFields(
        "#User-Kasir-Insert-Form",
      );
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
