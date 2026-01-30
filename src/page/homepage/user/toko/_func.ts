/* ===========================================================
|  FUNCTION UNTUK HALAMAN TOKO
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 30-Jan-2026
|  Updated At: 30-Jan-2026
*/

// Libraries
import { TokoInterface } from "../../../../lib/interfaces/database.interface";
import { TOKO_URL } from "../../../../lib/constants/server.constant";
import api from "../../../../lib/system/api";
import {
  getLoginCredentials,
  refreshToken,
} from "../../../../lib/system/credentials";

// Node Modules
import { isAxiosError, AxiosError } from "axios";

async function get(args: string = "", defaultVal: any = null): Promise<any> {
  // Placeholder
  let toko: any = defaultVal;

  // Get the login credentials
  const savedCred = getLoginCredentials();

  // Make sure the login credentials is exist
  if (savedCred) {
    try {
      const tokoReq = await api.get(`${TOKO_URL}/${args}`, {
        headers: {
          Authorization: `Bearer ${savedCred.access_token}`,
        },
      });
      toko = tokoReq.data;
    } catch (error) {
      // Axios error
      if (isAxiosError(error)) {
        const axiosErr = error as AxiosError;
        // Get message from server
        const { message }: any = axiosErr.response?.data;
        // Token expired
        if (message && message == "Unauthorized") {
          // Refresh token
          const tokenRefreshed = await refreshToken(savedCred);
          // Token is refreshed
          if (tokenRefreshed) {
            return get(args, defaultVal);
          }
        }
      }
    }
  }

  return toko;
}

export async function getAllToko(): Promise<TokoInterface[]> {
  return getWhereToko("");
}

export async function getWhereToko(args: string): Promise<TokoInterface[]> {
  const toko: TokoInterface[] = await get(args, []);
  return toko;
}

export async function getOneToko(args: string): Promise<TokoInterface> {
  const toko: TokoInterface = await get(args, null);
  return toko;
}
