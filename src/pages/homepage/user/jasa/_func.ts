/* ===========================================================
|  FUNCTION UNTUK HALAMAN JASA
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 31-Jan-2026
|  Updated At: 6-Feb-2026
*/

// Libraries
import { JasaInterface } from "../../../../lib/interfaces/database.interface";
import { errHandler, api, includeToken } from "../../../../lib/system/api";
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
    await errHandler(err, getWhereJasa, [args]);
  }
  return jasa;
}

export async function getOneJasa(args: string): Promise<JasaInterface | null> {
  let jasa: JasaInterface | null = null;
  try {
    const req: AxiosResponse = await api.get(JASA_URL + args, includeToken());
    jasa = req.data;
  } catch (err) {
    await errHandler(err, getOneJasa, [args]);
  }
  return jasa;
}
