/* ===========================================================
|  LIBRARY - REDUX STORAGE
|  ===========================================================
|  Disini berisi penyimpanan dari redux dan seluruh reducer.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 19-Jan-2026
|  Updated At: 5-Feb-2026
*/

// Reducers
import UserLoginDataReducer from "./reducers/user/login.data.reducer";
import UserSettingsReducer from "./reducers/user/settings.reducer";
import UserSidebarReducer from "./reducers/user/sidebar.reducer";
import UserProdukReducer from "./reducers/user/produk.reducer";
import UserDiskonReducer from "./reducers/user/diskon.reducer";
import UserMemberReducer from "./reducers/user/member.reducer";
import UserJasaReducer from "./reducers/user/jasa.reducer";
import UserTokoReducer from "./reducers/user/toko.reducer";
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

    // User states
    user_login_data: UserLoginDataReducer,
    user_settings: UserSettingsReducer,
    user_sidebar: UserSidebarReducer,
    user_toko: UserTokoReducer,
    user_produk: UserProdukReducer,
    user_diskon: UserDiskonReducer,
    user_member: UserMemberReducer,
    user_jasa: UserJasaReducer,
  },
});

// Root State Type References
export type ReduxRootStateType = ReturnType<typeof store.getState>;
