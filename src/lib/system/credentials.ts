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
|  Updated At: 6-Feb-2026
*/

import { RefreshTokenInterface } from "../interfaces/api.interface";
import { UserInterface } from "../interfaces/database.interface";
import { AUTH_URL } from "../constants/server.constant";
import { AxiosResponse } from "axios";
import { api } from "./api";

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
  const rt: AxiosResponse<RefreshTokenInterface> = await api.post(
    `${AUTH_URL}/refresh`,
    {
      access_token,
      refresh_token,
      tlp: data.tlp,
    },
  );

  // Get user data
  const userData: AxiosResponse<UserInterface> = await api.get(
    `/api/v1/${rt.data.role.toLowerCase()}/${data.tlp}`,
    {
      headers: {
        Authorization: `Bearer ${rt.data.access_token}`,
      },
    },
  );

  // Update credentials on local storage
  setLoginCredentials({ ...rt.data, data: userData.data });
}
