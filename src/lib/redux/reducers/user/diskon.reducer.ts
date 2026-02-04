/* ===========================================================
|  LIBRARY - REDUX USER DISKON STATE
|  ===========================================================
|  State user-diskon.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 4-Feb-2026
|  Updated At: 4-Feb-2026
*/

// Node Modules
import { createSlice } from "@reduxjs/toolkit";

interface UserDiskonInsertInterface {
  opened: boolean;
}

interface UserDiskonInterface {
  insert: UserDiskonInsertInterface;
}

const DefaultDiskonState: UserDiskonInterface = {
  insert: {
    opened: false,
  },
};

function OpenInsertFormHandler(state: UserDiskonInterface) {
  state.insert.opened = true;
}

function CloseInsertFormHandler(state: UserDiskonInterface) {
  state.insert.opened = false;
}

const UserDiskonReducer = createSlice({
  name: "user.diskon",
  initialState: DefaultDiskonState,
  reducers: {
    openUserDiskonInsertForm: OpenInsertFormHandler,
    closeUserDiskonInsertForm: CloseInsertFormHandler,
  },
});

export const { openUserDiskonInsertForm, closeUserDiskonInsertForm } =
  UserDiskonReducer.actions;
export default UserDiskonReducer.reducer;
