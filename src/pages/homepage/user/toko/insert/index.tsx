import { ReactNode } from "react";

// Style
import "../../../../../styles/pages/homepage/user/toko/user.toko.insert.style.sass";

// Node Modules
import { useDispatch } from "react-redux";

// Libraries
import { closeUserTokoInsertForm } from "../../../../../lib/redux/reducers/user/toko.reducer";

export function UserTokoInsertForm(): ReactNode {
  const dispatch = useDispatch();

  async function save() {}

  function closeForm() {
    dispatch(closeUserTokoInsertForm());
  }

  return (
    <div id="Insert-Form-Container">
      <div id="Insert-Form">
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
          <input type="text" autoComplete="off" name="tlp" />
        </div>
        <div id="Form-Button">
          <button onClick={save}>Simpan</button>
          <button onClick={closeForm}>Batal</button>
        </div>
      </div>
    </div>
  );
}
