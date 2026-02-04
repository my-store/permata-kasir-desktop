/* ===========================================================
|  LIBRARY - REDUX USER TOKO STATE
|  ===========================================================
|  State user-toko.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 4-Feb-2026
|  Updated At: 4-Feb-2026
*/

// Node Modules
import { createSlice } from "@reduxjs/toolkit";

interface UserTokoInsertInterface {
  opened: boolean;
}

interface UserTokoInterface {
  insert: UserTokoInsertInterface;
}

const DefaultTokoState: UserTokoInterface = {
  insert: {
    opened: false,
  },
};

function OpenInsertFormHandler(state: UserTokoInterface) {
  state.insert.opened = true;
}

function CloseInsertFormHandler(state: UserTokoInterface) {
  state.insert.opened = false;
}

const UserTokoReducer = createSlice({
  name: "user.toko",
  initialState: DefaultTokoState,
  reducers: {
    openUserTokoInsertForm: OpenInsertFormHandler,
    closeUserTokoInsertForm: CloseInsertFormHandler,
  },
});

export const { openUserTokoInsertForm, closeUserTokoInsertForm } =
  UserTokoReducer.actions;
export default UserTokoReducer.reducer;
