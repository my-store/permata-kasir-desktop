/* ===========================================================
|  LIBRARY - REDUX ROOT STATE
|  ===========================================================
|  State utama pada aplikasi.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 19-Jan-2026
|  Updated At: 19-Jan-2026
*/

// Interfaces
import {
  ReduxRootStateInterface,
  ReduxActionInterface,
} from "../../interfaces/redux.interface";

// Node Modules
import { createSlice } from "@reduxjs/toolkit";

const DefaultRootState: ReduxRootStateInterface = {
  isReady: false,
  isLoading: true,
};

function OpenLoading(state: ReduxRootStateInterface) {
  state.isLoading = true;
}

function RemoveLoading(state: ReduxRootStateInterface) {
  state.isLoading = false;
}

function SetReady(
  state: ReduxRootStateInterface,
  action: ReduxActionInterface,
) {
  state.isReady = action.payload;
}

const RootSlice = createSlice({
  name: "root",
  initialState: DefaultRootState,
  reducers: {
    rootOpenLoading: OpenLoading,
    rootRemoveLoading: RemoveLoading,
    rootSetReady: SetReady,
  },
});

export const { rootOpenLoading, rootRemoveLoading, rootSetReady } =
  RootSlice.actions;
export default RootSlice.reducer;
