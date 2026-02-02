/* ===========================================================
|  LIBRARY - LOGIN CREDENTIALS MANAGER
|  ===========================================================
|  Disini berisi data credentials yang akan selalu digunakan
|  pada headers setiap kali menghubungi server.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 19-Jan-2026
|  Updated At: 2-Feb-2026
*/

import { RefreshTokenInterface } from "../interfaces/api.interface";
import { AUTH_URL } from "../constants/server.constant";
import { get, post } from "./api";
import { Warn } from "./log";

export const cred_name: string = "permata.kasir.login.credentials";

export function setLoginCredentials(data: any): void {
  localStorage.setItem(cred_name, JSON.stringify(data));
}

export function getLoginCredentials(): any {
  let jsonData: any = localStorage.getItem(cred_name);
  if (jsonData) {
    try {
      jsonData = JSON.parse(jsonData);
    } catch {}
  }
  return jsonData;
}

export function removeLoginCredentials(): void {
  Warn(`Menghapus: LocalStorage(${cred_name})`);
  localStorage.removeItem(cred_name);
}

export async function refreshToken(params: {
  access_token: string;
  refresh_token: string;
  data: {
    tlp: string;
  };
}): Promise<void> {
  const { access_token, refresh_token, data } = params;

  // Melakukan permintaan ke server untuk dibuatkan token baru
  const rt: RefreshTokenInterface = await post(`${AUTH_URL}/refresh`, {
    access_token,
    refresh_token,
    tlp: data.tlp,
  });

  // Get user data
  const userData = await get(`/api/v1/${rt.role.toLowerCase()}/${data.tlp}`, {
    headers: {
      Authorization: `Bearer ${rt.access_token}`,
    },
  });

  // Update credentials on local storage
  setLoginCredentials({ ...rt, data: userData });
}
