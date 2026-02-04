/* ===========================================================
|  LIBRARY - REDUX USER MEMBER STATE
|  ===========================================================
|  State user-member.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 4-Feb-2026
|  Updated At: 4-Feb-2026
*/

// Node Modules
import { createSlice } from "@reduxjs/toolkit";

interface UserMemberInsertInterface {
  opened: boolean;
}

interface UserMemberInterface {
  insert: UserMemberInsertInterface;
}

const DefaultMemberState: UserMemberInterface = {
  insert: {
    opened: false,
  },
};

function OpenInsertFormHandler(state: UserMemberInterface) {
  state.insert.opened = true;
}

function CloseInsertFormHandler(state: UserMemberInterface) {
  state.insert.opened = false;
}

const UserMemberReducer = createSlice({
  name: "user.member",
  initialState: DefaultMemberState,
  reducers: {
    openUserMemberInsertForm: OpenInsertFormHandler,
    closeUserMemberInsertForm: CloseInsertFormHandler,
  },
});

export const { openUserMemberInsertForm, closeUserMemberInsertForm } =
  UserMemberReducer.actions;
export default UserMemberReducer.reducer;
