/* ===========================================================
|  LIBRARY - REDUX USER SIDEBAR STATE
|  ===========================================================
|  State user-sidebar.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 5-Feb-2026
|  Updated At: 5-Feb-2026
*/

// Node Modules
import { createSlice } from "@reduxjs/toolkit";

// Libraries
import { ReduxActionInterface } from "../../../interfaces/redux.interface";

interface UserSidebarInterface {
  name: string;
}

const DefaultSidebarState: UserSidebarInterface = {
  name: "",
};

function SetPageHandler(
  state: UserSidebarInterface,
  action: ReduxActionInterface,
) {
  state.name = action.payload;
}

const UserSidebarReducer = createSlice({
  name: "user.sidebar",
  initialState: DefaultSidebarState,
  reducers: {
    sidebarSetPage: SetPageHandler,
  },
});

export const { sidebarSetPage } = UserSidebarReducer.actions;
export default UserSidebarReducer.reducer;
