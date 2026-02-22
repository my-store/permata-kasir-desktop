/* ===========================================================
|  LIBRARY - REDUX CONFIRM STATE
|  ===========================================================
|  State confirm.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 22-Feb-2026
|  Updated At: 22-Feb-2026
*/

import { ReduxActionInterface } from "../../interfaces/redux.interface";
import { createSlice } from "@reduxjs/toolkit";

interface DefaultConfirmInterface {
  opened: boolean;
  callback: boolean;
  callbackId: string;
  title: string;
  body: string;
}

const DefaultConfirmState: DefaultConfirmInterface = {
  opened: false,
  callback: false,
  callbackId: "",
  title: "",
  body: "",
};

function OpenConfirmHandler(
  state: DefaultConfirmInterface,
  actions: ReduxActionInterface,
) {
  state.opened = true;
  state.callbackId = actions.payload.callbackId;
  state.title = actions.payload.title;
  state.body = actions.payload.body;
}

function TriggerCallbackHandler(state: DefaultConfirmInterface) {
  state.callback = true;
}

function RemoveConfirmHandler(state: DefaultConfirmInterface) {
  state.opened = false;
  state.callback = false;
  state.callbackId = "";
  state.title = "";
  state.body = "";
}

const ConfirmSlice = createSlice({
  name: "component.confirm",
  initialState: DefaultConfirmState,
  reducers: {
    openConfirm: OpenConfirmHandler,
    removeConfirm: RemoveConfirmHandler,
    confirmTriggerCallback: TriggerCallbackHandler,
  },
});

export const { openConfirm, removeConfirm, confirmTriggerCallback } =
  ConfirmSlice.actions;
export default ConfirmSlice.reducer;
