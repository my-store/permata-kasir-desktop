/* ===========================================================
|  FUNCTION UNTUK HALAMAN DISKON
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 30-Jan-2026
|  Updated At: 19-Feb-2026
*/

// Libraries
import { DiskonInterface } from "../../../../lib/interfaces/database.interface";
import { api, fixApiError, includeToken } from "../../../../lib/system/api";
import { DISKON_URL } from "../../../../lib/constants/server.constant";
import { AxiosResponse } from "axios";

export async function getAllDiskon(): Promise<DiskonInterface[]> {
  return getWhereDiskon("");
}

export async function getWhereDiskon(args: string): Promise<DiskonInterface[]> {
  let diskon: DiskonInterface[] = [];
  try {
    const req: AxiosResponse = await api.get(DISKON_URL + args, includeToken());
    diskon = req.data;
  } catch (err) {
    // Trying to handle error
    try {
      await fixApiError(err);
    } catch (unhandledErr) {
      // Failed to handle error
      throw unhandledErr;
    }
  }
  return diskon;
}

export async function getOneDiskon(
  args: string,
): Promise<DiskonInterface | null> {
  let diskon: DiskonInterface | null = null;
  try {
    const req: AxiosResponse = await api.get(DISKON_URL + args, includeToken());
    diskon = req.data;
  } catch (err) {
    // Trying to handle error
    try {
      await fixApiError(err);
    } catch (unhandledErr) {
      // Failed to handle error
      throw unhandledErr;
    }
  }
  return diskon;
}
