/* ===========================================================
|  LIBRARY - REDUX USER TOKO STATE
|  ===========================================================
|  State user-toko.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 4-Feb-2026
|  Updated At: 6-Feb-2026
*/

// Node Modules
import { createSlice } from "@reduxjs/toolkit";

// Libraries
import { ReduxActionInterface } from "../../../interfaces/redux.interface";
import { TokoInterface } from "../../../interfaces/database.interface";

interface UserTokoInsertInterface {
  opened: boolean;
  wait: boolean;
}

interface UserTokoInterface {
  list: TokoInterface[];
  insert: UserTokoInsertInterface;
}

const DefaultTokoState: UserTokoInterface = {
  list: [],
  insert: {
    opened: false,
    wait: false,
  },
};

function SetListHandler(
  state: UserTokoInterface,
  action: ReduxActionInterface,
) {
  state.list = action.payload;
}

function AddNewListItemHandler(
  state: UserTokoInterface,
  action: ReduxActionInterface,
) {
  state.list = [...state.list, action.payload];
}

function OpenInsertFormHandler(state: UserTokoInterface) {
  state.insert.opened = true;
}

function CloseInsertFormHandler(state: UserTokoInterface) {
  state.insert.opened = false;
}

function SetInsertWaitHandler(
  state: UserTokoInterface,
  action: ReduxActionInterface,
) {
  state.insert.wait = action.payload;
}

const UserTokoReducer = createSlice({
  name: "user.toko",
  initialState: DefaultTokoState,
  reducers: {
    // List
    setUserTokoList: SetListHandler,
    addNewUserTokoListItem: AddNewListItemHandler,

    // Insert Form
    openUserTokoInsertForm: OpenInsertFormHandler,
    closeUserTokoInsertForm: CloseInsertFormHandler,
    setWaitUserTokoInsert: SetInsertWaitHandler,
  },
});

export const {
  setUserTokoList,
  addNewUserTokoListItem,

  // Insert Form
  openUserTokoInsertForm,
  closeUserTokoInsertForm,
  setWaitUserTokoInsert,
} = UserTokoReducer.actions;
export default UserTokoReducer.reducer;
