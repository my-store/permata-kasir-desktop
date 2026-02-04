import { ReactNode } from "react";

// Style
import "../../../../../styles/pages/homepage/user/member/user.member.insert.style.sass";

// Node Modules
import { useDispatch } from "react-redux";

// Libraries
import { closeUserMemberInsertForm } from "../../../../../lib/redux/reducers/user/member.reducer";

export function UserMemberInsertForm(): ReactNode {
  const dispatch = useDispatch();

  async function save() {}

  function closeForm() {
    dispatch(closeUserMemberInsertForm());
  }

  return (
    <div id="Insert-Form-Container">
      <div id="Insert-Form">
        <div id="Form-Header">
          <h3>Buat Member Baru</h3>
        </div>
        <div className="Form-Group">
          <label>Nama</label>
          <input type="text" autoComplete="off" name="keterangan" />
        </div>
        <div className="Form-Group">
          <label>Alamat</label>
          <input type="text" autoComplete="off" name="alamat" />
        </div>
        <div id="Form-Button">
          <button onClick={save}>Simpan</button>
          <button onClick={closeForm}>Batal</button>
        </div>
      </div>
    </div>
  );
}
