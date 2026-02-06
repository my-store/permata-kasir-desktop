/* ===========================================================
|  FUNCTION UNTUK HALAMAN PRODUK
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 31-Jan-2026
|  Updated At: 6-Feb-2026
*/

// Libraries
import { ProdukInterface } from "../../../../lib/interfaces/database.interface";
import { api, errHandler, includeToken } from "../../../../lib/system/api";
import { PRODUK_URL } from "../../../../lib/constants/server.constant";
import { AxiosResponse } from "axios";

export async function getAllProduk(): Promise<ProdukInterface[]> {
  return getWhereProduk("");
}

export async function getWhereProduk(args: string): Promise<ProdukInterface[]> {
  let produk: ProdukInterface[] = [];
  try {
    const req: AxiosResponse = await api.get(PRODUK_URL + args, includeToken());
    produk = req.data;
  } catch (err) {
    await errHandler(err, getWhereProduk, [args]);
  }
  return produk;
}

export async function getOneProduk(
  args: string,
): Promise<ProdukInterface | null> {
  let produk: ProdukInterface | null = null;
  try {
    const req: AxiosResponse = await api.get(PRODUK_URL + args, includeToken());
    produk = req.data;
  } catch (err) {
    await errHandler(err, getOneProduk, [args]);
  }
  return produk;
}
