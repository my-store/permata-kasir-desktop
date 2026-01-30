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
|  Updated At: 30-Jan-2026
*/

import { AUTH_URL } from "../constants/server.constant";
import { Error, Warn } from "./log";
import api from "./api";

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
}): Promise<boolean> {
  const { access_token, refresh_token, data } = params;

  let tokenRefreshed: any = false;
  let rt: any = null;

  try {
    // Melakukan permintaan ke server untuk dibuatkan token baru
    const refreshReq = await api.post(`${AUTH_URL}/refresh`, {
      access_token,
      refresh_token,
      tlp: data.tlp,
    });
    rt = refreshReq.data;
  } catch (error) {
    Error(`Gagal memperbarui token login:\n${JSON.stringify(error)}`);
  }

  // Jika refresh token berhasil dibuat, maka response dari server
  // adalah sama dengan ketika login yaitu berisi:
  // 1. access_token
  // 2. refresh_token
  // 3. role
  // access_token yang akan digunakan pada headers.Authorization
  // role = Kasir atau User, ini server yang menentukan saat proses login
  // server akan mencari tahu siapa yang sedang login.
  if (rt) {
    if (rt.access_token && rt.refresh_token && rt.role) {
      // Get user data
      try {
        const userDataReq = await api.get(
          `/api/v1/${rt.role.toLowerCase()}/${data.tlp}`,
          {
            headers: {
              Authorization: `Bearer ${rt.access_token}`,
            },
          },
        );
        const userData = userDataReq.data;

        // Update credentials on local storage
        setLoginCredentials({ ...rt, data: userData });

        /*
        | Token sudah expired, namun berhasil mendapatkan token baru
        | Step selanjutnya adalah membuka halaman default sesuai role:
        | User | Kasir
        */
        tokenRefreshed = true;
      } catch (error) {
        // User not found, maybe deleted by admin
        Warn(`Gagal mengambil data user:\n${JSON.stringify(error)}`);
      }
    }

    // Invalid token field from server
    else {
      Warn(
        `Login token tidak valid:\nField yang dibutuhkan [access_token, refresh_token, role]\nField yang diberikan server: [${JSON.stringify(rt)}]`,
      );
    }
  }

  return tokenRefreshed;
}
