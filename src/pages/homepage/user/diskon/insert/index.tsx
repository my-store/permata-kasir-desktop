import { ReactNode } from "react";

// Style
import "../../../../../styles/pages/homepage/user/diskon/user.diskon.insert.style.sass";

// Node Modules
import { useDispatch } from "react-redux";

// Libraries
import { closeUserDiskonInsertForm } from "../../../../../lib/redux/reducers/user/diskon.reducer";

export function UserDiskonInsertForm(): ReactNode {
  const dispatch = useDispatch();

  async function save() {}

  function closeForm() {
    dispatch(closeUserDiskonInsertForm());
  }

  return (
    <div id="Insert-Form-Container">
      <div id="Insert-Form">
        <div id="Form-Header">
          <h3>Buat Diskon Baru</h3>
        </div>
        <div className="Form-Group">
          <label>Keterangan</label>
          <input type="text" autoComplete="off" name="keterangan" />
        </div>
        <div className="Form-Group">
          <label>Nilai</label>
          <input type="number" name="nilai" />
        </div>
        <div id="Form-Button">
          <button onClick={save}>Simpan</button>
          <button onClick={closeForm}>Batal</button>
        </div>
      </div>
    </div>
  );
}
