/* ===========================================================
|  LIBRARY - API REQUEST - AXIOS INSTANCE
|  ===========================================================
|  Disini berisi instance axios, dapat digunakan dimanapun.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 30-Jan-2026
|  Updated At: 2-Feb-2026
*/

import axios, { AxiosRequestConfig, AxiosInstance, AxiosError } from "axios";
import { getLoginCredentials, refreshToken } from "./credentials";
import { SERVER_URL } from "../constants/server.constant";
import { Error } from "./log";

// Axios Instance
const api: AxiosInstance = axios.create({ baseURL: SERVER_URL });

interface cbInterface {
  func: Function;
  args: any[];
}

export function afterSignedInErrorHandler(err: any, cb: cbInterface): any {
  const axiosErr = err as AxiosError;
  const { message }: any = axiosErr.response?.data;

  // Token expired
  if (message == "Unauthorized") {
    // Return to callback and their args
    // Call unauthorized handler, and pass cb with their args
    return unauthorizedHandler(cb.func, cb.args);
  }

  // Display other error (non-axios error)
  Error("Unknown-Error:\n" + axiosErr.message);
}

export async function unauthorizedHandler(cb: Function, args: any[]) {
  // Refresh token
  try {
    const oldCred: any = getLoginCredentials();
    await refreshToken(oldCred);
    cb(...args);
  } catch (err) {
    Error(`Gagal melakukan pembaruan token:\n${err}`);
  }
}

// Get Request
export async function get(
  url: string,
  config?: AxiosRequestConfig,
): Promise<any> {
  let req: any = await api.get(url, config);
  return req.data;
}

// Post Request
export async function post(
  url: string,
  data: any,
  config?: AxiosRequestConfig,
): Promise<any> {
  let req: any = await api.post(url, data, config);
  return req.data;
}

// Path Request

// Delete Request
