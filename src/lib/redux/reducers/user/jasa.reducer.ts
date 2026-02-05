/* ===========================================================
|  LIBRARY - REDUX USER JASA STATE
|  ===========================================================
|  State user-jasa.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 5-Feb-2026
|  Updated At: 5-Feb-2026
*/

// Node Modules
import { createSlice } from "@reduxjs/toolkit";

interface UserJasaInsertInterface {
  opened: boolean;
}

interface UserJasaInterface {
  insert: UserJasaInsertInterface;
}

const DefaultJasaState: UserJasaInterface = {
  insert: {
    opened: false,
  },
};

function OpenInsertFormHandler(state: UserJasaInterface) {
  state.insert.opened = true;
}

function CloseInsertFormHandler(state: UserJasaInterface) {
  state.insert.opened = false;
}

const UserJasaReducer = createSlice({
  name: "user.jasa",
  initialState: DefaultJasaState,
  reducers: {
    openUserJasaInsertForm: OpenInsertFormHandler,
    closeUserJasaInsertForm: CloseInsertFormHandler,
  },
});

export const { openUserJasaInsertForm, closeUserJasaInsertForm } =
  UserJasaReducer.actions;
export default UserJasaReducer.reducer;
