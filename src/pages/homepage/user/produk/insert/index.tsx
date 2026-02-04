import { ReactNode } from "react";

// Style
import "../../../../../styles/pages/homepage/user/produk/user.produk.insert.style.sass";

// Node Modules
import { useDispatch } from "react-redux";

// Libraries
import { closeUserProdukInsertForm } from "../../../../../lib/redux/reducers/user/produk.reducer";

export function UserProdukInsertForm(): ReactNode {
  const dispatch = useDispatch();

  async function save() {}

  function closeForm() {
    dispatch(closeUserProdukInsertForm());
  }

  return (
    <div id="Insert-Form-Container">
      <div id="Insert-Form">
        <div id="Form-Header">
          <h3>Buat Produk Baru</h3>
        </div>
        <div className="Form-Group">
          <label>Nama</label>
          <input type="text" autoComplete="off" name="nama" />
        </div>
        <div className="Form-Group">
          <label>Harga Pokok</label>
          <input type="number" name="hargaPokok" />
        </div>
        <div className="Form-Group">
          <label>Harga Jual</label>
          <input type="number" name="hargaJual" />
        </div>
        <div id="Form-Button">
          <button onClick={save}>Simpan</button>
          <button onClick={closeForm}>Batal</button>
        </div>
      </div>
    </div>
  );
}
