/* ===========================================================
|  LIBRARY - REDUX USER PRODUK STATE
|  ===========================================================
|  State user-produk.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 4-Feb-2026
|  Updated At: 4-Feb-2026
*/

// Node Modules
import { createSlice } from "@reduxjs/toolkit";

interface UserProdukInsertInterface {
  opened: boolean;
}

interface UserProdukInterface {
  insert: UserProdukInsertInterface;
}

const DefaultProdukState: UserProdukInterface = {
  insert: {
    opened: false,
  },
};

function OpenInsertFormHandler(state: UserProdukInterface) {
  state.insert.opened = true;
}

function CloseInsertFormHandler(state: UserProdukInterface) {
  state.insert.opened = false;
}

const UserProdukReducer = createSlice({
  name: "user.produk",
  initialState: DefaultProdukState,
  reducers: {
    openUserProdukInsertForm: OpenInsertFormHandler,
    closeUserProdukInsertForm: CloseInsertFormHandler,
  },
});

export const { openUserProdukInsertForm, closeUserProdukInsertForm } =
  UserProdukReducer.actions;
export default UserProdukReducer.reducer;
