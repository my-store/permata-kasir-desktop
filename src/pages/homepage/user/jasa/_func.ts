/* ===========================================================
|  FUNCTION UNTUK HALAMAN JASA
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 31-Jan-2026
|  Updated At: 19-Feb-2026
*/

// Libraries
import { JasaInterface } from "../../../../lib/interfaces/database.interface";
import { api, fixApiError, includeToken } from "../../../../lib/system/api";
import { JASA_URL } from "../../../../lib/constants/server.constant";
import { AxiosResponse } from "axios";

export async function getAllJasa(): Promise<JasaInterface[]> {
  return getWhereJasa("");
}

export async function getWhereJasa(args: string): Promise<JasaInterface[]> {
  let jasa: JasaInterface[] = [];
  try {
    const req: AxiosResponse = await api.get(JASA_URL + args, includeToken());
    jasa = req.data;
  } catch (err) {
    // Trying to handle error
    try {
      await fixApiError(err);
    } catch (unhandledErr) {
      // Failed to handle error
      throw unhandledErr;
    }
  }
  return jasa;
}

export async function getOneJasa(args: string): Promise<JasaInterface | null> {
  let jasa: JasaInterface | null = null;
  try {
    const req: AxiosResponse = await api.get(JASA_URL + args, includeToken());
    jasa = req.data;
  } catch (err) {
    // Trying to handle error
    try {
      await fixApiError(err);
    } catch (unhandledErr) {
      // Failed to handle error
      throw unhandledErr;
    }
  }
  return jasa;
}
