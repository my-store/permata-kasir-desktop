/* ===========================================================
|  FUNCTION UNTUK HALAMAN JASA
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 31-Jan-2026
|  Updated At: 2-Feb-2026
*/

// Libraries
import { JasaInterface } from "../../../../lib/interfaces/database.interface";
import { afterSignedInErrorHandler, get } from "../../../../lib/system/api";
import { getLoginCredentials } from "../../../../lib/system/credentials";
import { JASA_URL } from "../../../../lib/constants/server.constant";

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

export async function getAllJasa(): Promise<JasaInterface[]> {
  return getWhereJasa("");
}

export async function getWhereJasa(args: string): Promise<JasaInterface[]> {
  let jasa: JasaInterface[] = [];
  try {
    jasa = await get(JASA_URL + args, config());
  } catch (err) {
    // Trying to handle error
    try {
      await afterSignedInErrorHandler(err, {
        func: getWhereJasa,
        args: [args],
      });
    } catch {
      // Failed to handle error
    }
  }
  return jasa;
}

export async function getOneJasa(args: string): Promise<JasaInterface | null> {
  let jasa: JasaInterface | null = null;
  try {
    jasa = await get(JASA_URL + args, config());
  } catch (err) {
    // Trying to handle error
    try {
      await afterSignedInErrorHandler(err, {
        func: getOneJasa,
        args: [args],
      });
    } catch {
      // Failed to handle error
    }
  }
  return jasa;
}
