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
|  Updated At: 28-Jan-2026
*/

import { SERVER_URL } from "../constants/server.constant";
import { JSONGet, JSONPost } from "./requests";
import { Error, Warn } from "./log";
import { UserLoginData } from "../interfaces/user/login.data.interface";

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

export async function getUserData(tlp: string, loginData: any): Promise<any> {
  let userData: any = null;
  const getProfileURL: string = `${SERVER_URL}/api/v1/${loginData.role.toLowerCase()}/${tlp}`;
  try {
    const getUser: UserLoginData = await JSONGet(getProfileURL, {
      headers: { Authorization: `Bearer ${loginData.access_token}` },
    });
    if (
      getUser.nama &&
      getUser.tlp &&
      getUser.foto &&
      getUser.createdAt &&
      getUser.updatedAt
    ) {
      // Simpan data login <User | Kasir>
      const {
        password, // Remove "Password" from login data
        ...loginData
      }: any = getUser;
      userData = { ...loginData };
    } else {
      Warn(
        `Data ${loginData.role} tidak valid:\nField yang dibutuhkan: [nama, tlp, foto, createdAt, updatedAt]\nField dari server: ${JSON.stringify(getUser)}`,
      );
    }
  } catch (error) {
    Error(`Gagal mengambil data ${loginData.role}:\n${getProfileURL}`);
  }

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

    // Invalid login profile
    else {
      Warn(
        `Profile login tidak valid:\nField yang dibutuhkan: [iat, exp, sub, role]\nField dari server: ${JSON.stringify(getProfile)}`,
      );
    }
  } catch (error) {
    Error(`Gagal mengambil profile login:\n${error}`);
  }

  return profile;
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
  try {
    // Melakukan permintaan ke server untuk dibuatkan token baru
    const rt = await JSONPost(`${SERVER_URL}/api/v1/auth/refresh`, {
      body: JSON.stringify({
        access_token,
        refresh_token,
        tlp: data.tlp,
      }),
    });
    // Jika refresh token berhasil dibuat, maka response dari server
    // adalah sama dengan ketika login yaitu berisi:
    // 1. access_token
    // 2. refresh_token
    // 3. role
    // access_token yang akan digunakan pada headers.Authorization
    // role = Kasir atau User, ini server yang menentukan saat proses login
    // server akan mencari tahu siapa yang sedang login.
    if (rt.access_token && rt.refresh_token && rt.role) {
      // Get user data
      const userData = await getUserData(data.tlp, rt);

      // User is still exists (not deleted)
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

      // User not found, maybe deleted by admin
      else {
        Warn("Data user tidak ditemukan");
      }
    }

    // Invalid token field from server
    else {
      Warn(
        `Login token tidak valid:\nField yang dibutuhkan [access_token, refresh_token, role]\nField yang diberikan server: [${JSON.stringify(rt)}]`,
      );
    }
  } catch (error) {
    Error(`Gagal memperbarui token login:\n${error}`);
  }

  return tokenRefreshed;
}
