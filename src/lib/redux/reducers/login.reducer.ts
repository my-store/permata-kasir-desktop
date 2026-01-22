/* ===========================================================
|  LIBRARY - REDUX LOGIN STATE
|  ===========================================================
|  State login.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 19-Jan-2026
|  Updated At: 19-Jan-2026
*/

// Interfaces
import {
  ReduxLoginStateInterface,
  ReduxActionInterface,
} from "../../interfaces/redux.interface";

// Node Modules
import { createSlice } from "@reduxjs/toolkit";

const DefaultLoginState: ReduxLoginStateInterface = {
  isReady: false,
  isLogin: false,
  loginRole: "",
  loginWait: false,
};

function SetLoginReady(
  state: ReduxLoginStateInterface,
  action: ReduxActionInterface,
) {
  state.isReady = action.payload;
}

function Login(state: ReduxLoginStateInterface, action: ReduxActionInterface) {
  state.isLogin = true;
  state.loginRole = action.payload;
}

function Logout(state: ReduxLoginStateInterface) {
  state.isLogin = false;
  state.loginRole = "";

  // Dont for get to remove deep URL first
  window.history.pushState({}, "", "/");
}

function WaitLogin(state: ReduxLoginStateInterface) {
  state.loginWait = true;
}

function FinishWaitLogin(state: ReduxLoginStateInterface) {
  state.loginWait = false;
}

const LoginSlice = createSlice({
  name: "login",
  initialState: DefaultLoginState,
  reducers: {
    login: Login,
    logout: Logout,
    waitLogin: WaitLogin,
    finishWaitLogin: FinishWaitLogin,
    setLoginReady: SetLoginReady,
  },
});

export const { login, logout, waitLogin, finishWaitLogin, setLoginReady } =
  LoginSlice.actions;
export default LoginSlice.reducer;
