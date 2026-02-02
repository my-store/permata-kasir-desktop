/* ===========================================================
|  FUNCTION UNTUK HALAMAN TOKO
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 30-Jan-2026
|  Updated At: 2-Feb-2026
*/

// Libraries
import { TokoInterface } from "../../../../lib/interfaces/database.interface";
import { afterSignedInErrorHandler, get } from "../../../../lib/system/api";
import { getLoginCredentials } from "../../../../lib/system/credentials";
import { TOKO_URL } from "../../../../lib/constants/server.constant";

// Node Modules
import { AxiosRequestConfig } from "axios";

// Api Request Configurations
function config(): AxiosRequestConfig {
  return {
    headers: {
      Authorization: `Bearer ${getLoginCredentials().access_token}`,
    },
  };
}

export async function getAllToko(): Promise<TokoInterface[]> {
  return getWhereToko("");
}

export async function getWhereToko(args: string): Promise<TokoInterface[]> {
  let toko: TokoInterface[] = [];
  try {
    toko = await get(TOKO_URL + args, config());
  } catch (err) {
    // Trying to handle error
    try {
      await afterSignedInErrorHandler(err, {
        func: getWhereToko,
        args: [args],
      });
    } catch {
      // Failed to handle error
    }
  }
  return toko;
}

export async function getOneToko(args: string): Promise<TokoInterface | null> {
  let toko: TokoInterface | null = null;
  try {
    toko = await get(TOKO_URL + args, config());
  } catch (err) {
    // Trying to handle error
    try {
      await afterSignedInErrorHandler(err, {
        func: getOneToko,
        args: [args],
      });
    } catch {
      // Failed to handle error
    }
  }
  return toko;
}
