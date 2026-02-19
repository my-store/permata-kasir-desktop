/* ===========================================================
|  FUNCTION UNTUK HALAMAN TOKO
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 30-Jan-2026
|  Updated At: 19-Feb-2026
*/

// Node Modules
import { AxiosResponse } from "axios";

// Libraries
import { TokoInterface } from "../../../../lib/interfaces/database.interface";
import { includeToken, fixApiErr, api } from "../../../../lib/system/api";
import { TOKO_URL } from "../../../../lib/constants/server.constant";

export async function getAllToko(): Promise<TokoInterface[]> {
  const select: any = {
    kasir: {
      select: {
        nama: true,
      },
    },
  };
  const args: string = `?select=${JSON.stringify(select)}`;
  return getWhereToko(args);
}

export async function getWhereToko(
  args: string,
): Promise<TokoInterface[] | any> {
  let toko: TokoInterface[] = [];
  try {
    const req: AxiosResponse = await api.get(TOKO_URL + args, includeToken());
    toko = req.data;
  } catch (err) {
    // Trying to handle error
    try {
      return fixApiErr(err, getWhereToko, args);
    } catch (unhandledErr) {
      // Failed to handle error
      throw unhandledErr;
    }
  }
  return toko;
}

export async function getOneToko(args: string): Promise<TokoInterface | any> {
  let toko: TokoInterface | null = null;
  try {
    const req: AxiosResponse = await api.get(TOKO_URL + args, includeToken());
    toko = req.data;
  } catch (err) {
    // Trying to handle error
    try {
      return fixApiErr(err, getOneToko, args);
    } catch (unhandledErr) {
      // Failed to handle error
      throw unhandledErr;
    }
  }
  return toko;
}

export async function insertToko(data: any): Promise<TokoInterface | any> {
  let toko: TokoInterface | null = null;
  try {
    const req: AxiosResponse = await api.post(TOKO_URL, data, includeToken());
    toko = req.data;
  } catch (err) {
    // Trying to handle error
    try {
      return fixApiErr(err, insertToko, data);
    } catch (unhandledErr) {
      // Failed to handle error
      throw unhandledErr;
    }
  }
  return toko;
}
