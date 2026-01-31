/* ===========================================================
|  FUNCTION UNTUK HALAMAN DISKON
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 30-Jan-2026
|  Updated At: 31-Jan-2026
*/

// Libraries
import { DiskonInterface } from "../../../../lib/interfaces/database.interface";
import { getLoginCredentials } from "../../../../lib/system/credentials";
import { DISKON_URL } from "../../../../lib/constants/server.constant";
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

export async function getAllDiskon(): Promise<DiskonInterface[]> {
  return getWhereDiskon("");
}

export async function getWhereDiskon(args: string): Promise<DiskonInterface[]> {
  const diskon: DiskonInterface[] = await get(DISKON_URL + args, config());
  return diskon;
}

export async function getOneDiskon(args: string): Promise<DiskonInterface> {
  const diskon: DiskonInterface = await get(DISKON_URL + args, config());
  return diskon;
}
