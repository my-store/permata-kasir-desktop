/* ===========================================================
|  LIBRARY - REDUX USER LOGIN DATA STATE
|  ===========================================================
|  State user-login-data.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 28-Jan-2026
|  Updated At: 28-Jan-2026
*/

// Interfaces
import { UserLoginData } from "../../../interfaces/user/login.data.interface";
import { ReduxActionInterface } from "../../../interfaces/redux.interface";

// Node Modules
import { createSlice } from "@reduxjs/toolkit";

interface DefaultLoginDataInterface {
  data: UserLoginData | null;
}

const DefaultLoginDataState: DefaultLoginDataInterface = {
  data: null,
};

function SetDataHandler(
  state: DefaultLoginDataInterface,
  actions: ReduxActionInterface,
) {
  state.data = actions.payload;
}

const UserLoginDataReducer = createSlice({
  name: "user.login.data",
  initialState: DefaultLoginDataState,
  reducers: {
    setUserLoginData: SetDataHandler,
  },
});

export const { setUserLoginData } = UserLoginDataReducer.actions;
export default UserLoginDataReducer.reducer;
