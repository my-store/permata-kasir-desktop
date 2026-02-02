/* ===========================================================
|  FUNCTION UNTUK HALAMAN PRODUK
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 31-Jan-2026
|  Updated At: 2-Feb-2026
*/

// Libraries
import { ProdukInterface } from "../../../../lib/interfaces/database.interface";
import { afterSignedInErrorHandler, get } from "../../../../lib/system/api";
import { getLoginCredentials } from "../../../../lib/system/credentials";
import { PRODUK_URL } from "../../../../lib/constants/server.constant";

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
  let produk: ProdukInterface[] = [];
  try {
    produk = await get(PRODUK_URL + args, config());
  } catch (err) {
    // Trying to handle error
    try {
      await afterSignedInErrorHandler(err, {
        func: getWhereProduk,
        args: [args],
      });
    } catch {
      // Failed to handle error
    }
  }
  return produk;
}

export async function getOneProduk(
  args: string,
): Promise<ProdukInterface | null> {
  let produk: ProdukInterface | null = null;
  try {
    produk = await get(PRODUK_URL + args, config());
  } catch (err) {
    // Trying to handle error
    try {
      await afterSignedInErrorHandler(err, {
        func: getOneProduk,
        args: [args],
      });
    } catch {
      // Failed to handle error
    }
  }
  return produk;
}
