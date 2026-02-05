import { ReactNode } from "react";

// Style
import "../../../../../styles/pages/homepage/user/jasa/user.jasa.insert.style.sass";

// Node Modules
import { useDispatch } from "react-redux";

// Libraries
import { closeUserJasaInsertForm } from "../../../../../lib/redux/reducers/user/jasa.reducer";

export function UserJasaInsertForm(): ReactNode {
  const dispatch = useDispatch();

  async function save() {}

  function closeForm() {
    dispatch(closeUserJasaInsertForm());
  }

  return (
    <div id="Insert-Form-Container">
      <div id="Insert-Form">
        <div id="Form-Header">
          <h3>Buat Jasa Baru</h3>
        </div>
        <div className="Form-Group">
          <label>Nama</label>
          <input type="text" autoComplete="off" name="nama" />
        </div>
        <div className="Form-Group">
          <label>Biaya</label>
          <input type="number" name="biaya" />
        </div>
        <div id="Form-Button">
          <button onClick={save}>Simpan</button>
          <button onClick={closeForm}>Batal</button>
        </div>
      </div>
    </div>
  );
}
