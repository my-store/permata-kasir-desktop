/* ===========================================================
|  LIBRARY - REDUX INTERFACE
|  ===========================================================
|  Disini berisi seluruh interface redux/ reducer.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 19-Jan-2026
|  Updated At: 19-Jan-2026
*/

export interface ReduxActionInterface {
  payload: any;
  type: string;
}

export interface ReduxRootStateInterface {
  isReady: boolean;
  isLoading: boolean;
}

export interface ReduxLoginStateInterface {
  isReady: boolean;
  isLogin: boolean;
  loginRole: string;
  loginWait: boolean;
}
