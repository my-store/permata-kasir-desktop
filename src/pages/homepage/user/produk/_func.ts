/* ===========================================================
|  FUNCTION UNTUK HALAMAN PRODUK
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 31-Jan-2026
|  Updated At: 19-Feb-2026
*/

// Libraries
import { ProdukInterface } from "../../../../lib/interfaces/database.interface";
import { api, fixApiErr, includeToken } from "../../../../lib/system/api";
import { PRODUK_URL } from "../../../../lib/constants/server.constant";
import { AxiosResponse } from "axios";

export async function getAllProduk(): Promise<ProdukInterface[]> {
  return getWhereProduk("");
}

export async function getWhereProduk(
  args: string,
): Promise<ProdukInterface[] | any> {
  let produk: ProdukInterface[] = [];
  try {
    const req: AxiosResponse = await api.get(PRODUK_URL + args, includeToken());
    produk = req.data;
  } catch (err) {
    // Trying to handle error
    try {
      return fixApiErr(err, getWhereProduk, args);
    } catch (unhandledErr) {
      // Failed to handle error
      throw unhandledErr;
    }
  }
  return produk;
}

export async function getOneProduk(
  args: string,
): Promise<ProdukInterface | any> {
  let produk: ProdukInterface | null = null;
  try {
    const req: AxiosResponse = await api.get(PRODUK_URL + args, includeToken());
    produk = req.data;
  } catch (err) {
    // Trying to handle error
    try {
      return fixApiErr(err, getOneProduk, args);
    } catch (unhandledErr) {
      // Failed to handle error
      throw unhandledErr;
    }
  }
  return produk;
}
