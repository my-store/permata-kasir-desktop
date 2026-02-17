/* ===========================================================
|  FUNCTION UNTUK HALAMAN KASIR
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 9-Feb-2026
|  Updated At: 13-Feb-2026
*/

// Libraries
import { KasirInterface } from "../../../../lib/interfaces/database.interface";
import { errHandler, api, includeToken } from "../../../../lib/system/api";
import { KASIR_URL } from "../../../../lib/constants/server.constant";
import { AxiosResponse } from "axios";

export async function getAllKasir(): Promise<KasirInterface[]> {
  return getWhereKasir("");
}

export async function getWhereKasir(args: string): Promise<KasirInterface[]> {
  let kasir: KasirInterface[] = [];
  try {
    const req: AxiosResponse = await api.get(KASIR_URL + args, includeToken());
    kasir = req.data;
  } catch (err) {
    await errHandler(err, getWhereKasir, [args]);
  }
  return kasir;
}

export async function getOneKasir(
  args: string,
): Promise<KasirInterface | null> {
  let kasir: KasirInterface | null = null;
  try {
    const req: AxiosResponse = await api.get(KASIR_URL + args, includeToken());
    kasir = req.data;
  } catch (err) {
    await errHandler(err, getOneKasir, [args]);
  }
  return kasir;
}

export async function insertKasir(data: any): Promise<KasirInterface | null> {
  let kasir: KasirInterface | null = null;
  try {
    const req: AxiosResponse = await api.postForm(
      KASIR_URL,
      data,
      includeToken(),
    );
    kasir = req.data;
  } catch (err: any) {
    // Trying to handle error
    try {
      await errHandler(err, insertKasir, [data]);
    } catch (unhandledErr) {
      // Handle error inside save function in insert/index.tsx file
      throw unhandledErr;
    }
  }
  return kasir;
}
