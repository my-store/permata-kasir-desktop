/* ===========================================================
|  LIBRARY - REDUX USER SETTING STATE
|  ===========================================================
|  State user-setting.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 2-Feb-2026
|  Updated At: 2-Feb-2026
*/

// Node Modules
import { createSlice } from "@reduxjs/toolkit";

interface DefaultUserSettingsInterface {
  opened: boolean;
}

const DefaultSettingsState: DefaultUserSettingsInterface = {
  opened: false,
};

function OpenHandler(state: DefaultUserSettingsInterface) {
  state.opened = true;
}

function CloseHandler(state: DefaultUserSettingsInterface) {
  state.opened = false;
}

const UserSettingsReducer = createSlice({
  name: "user.settings",
  initialState: DefaultSettingsState,
  reducers: {
    openUserSettings: OpenHandler,
    closeUserSettings: CloseHandler,
  },
});

export const { openUserSettings, closeUserSettings } =
  UserSettingsReducer.actions;
export default UserSettingsReducer.reducer;
