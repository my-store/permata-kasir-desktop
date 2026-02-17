/* ===========================================================
|  LIBRARY - REDUX USER KASIR STATE
|  ===========================================================
|  State user-kasir.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 9-Feb-2026
|  Updated At: 13-Feb-2026
*/

// Node Modules
import { createSlice } from "@reduxjs/toolkit";

// Interfaces
import {
  KasirInterface,
  TokoInterface,
} from "../../../interfaces/database.interface";
import { ReduxActionInterface } from "../../../interfaces/redux.interface";

interface UserKasirInsertInterface {
  opened: boolean;
  tokoList: TokoInterface[];
  wait: boolean;
}

interface UserKasirInterface {
  list: KasirInterface[];
  insert: UserKasirInsertInterface;
}

const DefaultKasirState: UserKasirInterface = {
  list: [],
  insert: {
    opened: false,
    tokoList: [],
    wait: false,
  },
};

function SetListHandler(
  state: UserKasirInterface,
  action: ReduxActionInterface,
) {
  state.list = action.payload;
}

function AddNewListItemHandler(
  state: UserKasirInterface,
  action: ReduxActionInterface,
) {
  state.list = [...state.list, action.payload];
}

function OpenInsertFormHandler(state: UserKasirInterface) {
  state.insert.opened = true;
}

function CloseInsertFormHandler(state: UserKasirInterface) {
  state.insert.opened = false;
}

function SetInsertTokoListHandler(
  state: UserKasirInterface,
  action: ReduxActionInterface,
) {
  state.insert.tokoList = action.payload;
}

function SetInsertWaitHandler(
  state: UserKasirInterface,
  action: ReduxActionInterface,
) {
  state.insert.wait = action.payload;
}

const UserKasirReducer = createSlice({
  name: "user.kasir",
  initialState: DefaultKasirState,
  reducers: {
    // List
    setUserKasirList: SetListHandler,
    addNewUserKasirListItem: AddNewListItemHandler,

    // Insert Form
    openUserKasirInsertForm: OpenInsertFormHandler,
    closeUserKasirInsertForm: CloseInsertFormHandler,
    setTokoListUserKasirInsert: SetInsertTokoListHandler,
    setWaitUserKasirInsert: SetInsertWaitHandler,
  },
});

export const {
  // List
  setUserKasirList,
  addNewUserKasirListItem,

  // Insert Form
  openUserKasirInsertForm,
  closeUserKasirInsertForm,
  setTokoListUserKasirInsert,
  setWaitUserKasirInsert,
} = UserKasirReducer.actions;
export default UserKasirReducer.reducer;
