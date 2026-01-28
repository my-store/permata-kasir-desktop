/* ===========================================================
|  LIBRARY - REDUX STORAGE
|  ===========================================================
|  Disini berisi penyimpanan dari redux dan seluruh reducer.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 19-Jan-2026
|  Updated At: 19-Jan-2026
*/

// Reducers
import UserLoginDataReducer from "./reducers/user/login.data.reducer";
import AlertReducer from "./reducers/alert.reducer";
import LoginReducer from "./reducers/login.reducer";
import RootReducer from "./reducers/root.reducer";

// Node Modules
import { configureStore } from "@reduxjs/toolkit";

// Main Redux Storage
export const store = configureStore({
  reducer: {
    root: RootReducer,
    login: LoginReducer,
    alert: AlertReducer,

    user_login_data: UserLoginDataReducer,
  },
});

// Root State Type References
export type ReduxRootStateType = ReturnType<typeof store.getState>;
