/* ===========================================================
|  FUNCTION UNTUK HALAMAN PRODUK
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 31-Jan-2026
|  Updated At: 31-Jan-2026
*/

// Libraries
import { ProdukInterface } from "../../../../lib/interfaces/database.interface";
import { getLoginCredentials } from "../../../../lib/system/credentials";
import { PRODUK_URL } from "../../../../lib/constants/server.constant";
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

export async function getAllProduk(): Promise<ProdukInterface[]> {
  return getWhereProduk("");
}

export async function getWhereProduk(args: string): Promise<ProdukInterface[]> {
  const produk: ProdukInterface[] = await get(PRODUK_URL + args, config());
  return produk;
}

export async function getOneProduk(args: string): Promise<ProdukInterface> {
  const produk: ProdukInterface = await get(PRODUK_URL + args, config());
  return produk;
}
