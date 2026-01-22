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
|  Updated At: 19-Jan-2026
*/

import { SERVER_URL } from "../constants/server.constant";
import { JSONGet, JSONPost } from "./requests";

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

export async function getUserData(tlp: string, loginData: any): Promise<any> {
  let userData: any = null;
  const getProfileURL: string = `${SERVER_URL}/api/v1/${loginData.role.toLowerCase()}/${tlp}`;
  try {
    const getUser = await JSONGet(getProfileURL, {
      headers: { Authorization: `Bearer ${loginData.access_token}` },
    });
    if (
      getUser.nama &&
      getUser.tlp &&
      getUser.foto &&
      getUser.createdAt &&
      getUser.updatedAt
    ) {
      const {
        password, // Remove "Password" from login data
        ...loginData
      }: any = getUser;
      userData = { ...loginData };
    }
  } catch (error) {}
  return userData;
}

export async function getAuthProfile(access_token: string): Promise<any> {
  let profile: any = null;
  try {
    // Melakukan pengecekan ke server apakah token masih aktif
    const getProfile = await JSONGet(`${SERVER_URL}/api/v1/auth`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const { iat, exp, sub, role } = getProfile;
    // Jika token expired, response dari server adalah:
    // message dan statusCode.
    // message = Unauthorized
    // statusCode = 401
    // ----------------------------------------------------
    // Namun jika token masih aktif, response server adalah:
    // [iat, exp, sub, role]
    // iat = Issued At (where the token is created)
    // exp = Expired
    // sub = No Tlp. User/Kasir
    // role = User/Kasir
    if (iat && exp && sub && role) {
      profile = getProfile;
    }
  } catch {}
  return profile;
}

export async function refreshToken(tlp: string): Promise<boolean> {
  let tokenRefreshed: any = false;
  try {
    // Melakukan permintaan ke server untuk dibuatkan token baru
    const rt = await JSONPost(`${SERVER_URL}/api/v1/auth/refresh`, {
      body: JSON.stringify({ tlp }),
    });
    // Jika refresh token berhasil dibuat, maka response dari server
    // adalah sama dengan ketika login yaitu berisi:
    // 1. access_token
    // 2. refresh_token
    // 3. role
    // access_token yang akan digunakan pada headers.Authorization
    // role = Kasir atau User, ini server yang menentukan saat proses login
    // server akan mencari tahu siapa yang sedang login.
    if (!rt.access_token && rt.refresh_token && !rt.role) {
      // Get user data
      const userData = await getUserData(tlp, rt);

      // No user data is found
      if (userData) {
        const newToken = { ...rt, data: userData };
        // Update credentials on local storage
        await setLoginCredentials(newToken);

        /*
        | Token sudah expired, namun berhasil mendapatkan token baru
        | Step selanjutnya adalah membuka halaman default sesuai role:
        | User | Kasir
        */
        tokenRefreshed = true;
      }
    }
  } catch {}
  return tokenRefreshed;
}
