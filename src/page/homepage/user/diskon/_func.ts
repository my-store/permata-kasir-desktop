/* ===========================================================
|  FUNCTION UNTUK HALAMAN DISKON
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 30-Jan-2026
|  Updated At: 2-Feb-2026
*/

// Libraries
import { DiskonInterface } from "../../../../lib/interfaces/database.interface";
import { afterSignedInErrorHandler, get } from "../../../../lib/system/api";
import { getLoginCredentials } from "../../../../lib/system/credentials";
import { DISKON_URL } from "../../../../lib/constants/server.constant";

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

export async function getAllDiskon(): Promise<DiskonInterface[]> {
  return getWhereDiskon("");
}

export async function getWhereDiskon(args: string): Promise<DiskonInterface[]> {
  let diskon: DiskonInterface[] = [];
  try {
    diskon = await get(DISKON_URL + args, config());
  } catch (err) {
    // Trying to handle error
    try {
      await afterSignedInErrorHandler(err, {
        func: getWhereDiskon,
        args: [args],
      });
    } catch {
      // Failed to handle error
    }
  }
  return diskon;
}

export async function getOneDiskon(
  args: string,
): Promise<DiskonInterface | null> {
  let diskon: DiskonInterface | null = null;
  try {
    diskon = await get(DISKON_URL + args, config());
  } catch (err) {
    // Trying to handle error
    try {
      await afterSignedInErrorHandler(err, {
        func: getOneDiskon,
        args: [args],
      });
    } catch {
      // Failed to handle error
    }
  }
  return diskon;
}
