/* ===========================================================
|  FUNCTION UNTUK HALAMAN JASA
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 31-Jan-2026
|  Updated At: 31-Jan-2026
*/

// Libraries
import { JasaInterface } from "../../../../lib/interfaces/database.interface";
import { getLoginCredentials } from "../../../../lib/system/credentials";
import { JASA_URL } from "../../../../lib/constants/server.constant";
import { get } from "../../../../lib/system/api";

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
  const jasa: JasaInterface[] = await get(JASA_URL + args, config());
  return jasa;
}

export async function getOneJasa(args: string): Promise<JasaInterface> {
  const jasa: JasaInterface = await get(JASA_URL + args, config());
  return jasa;
}
