/* ===========================================================
|  LIBRARY - API REQUEST - AXIOS INSTANCE
|  ===========================================================
|  Disini berisi instance axios, dapat digunakan dimanapun.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 30-Jan-2026
|  Updated At: 31-Jan-2026
*/

import { getLoginCredentials, refreshToken } from "./credentials";
import { SERVER_URL } from "../constants/server.constant";
import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  isAxiosError,
  AxiosError,
} from "axios";

// Axios Instance
const api: AxiosInstance = axios.create({ baseURL: SERVER_URL });

// Error handler
async function ApiErr(error: any, callback: Function, ...args: any) {
  // Axios error
  if (isAxiosError(error)) {
    const axiosErr = error as AxiosError;
    // Get message from server
    const { message }: any = axiosErr.response?.data;
    // Token expired
    if (message && message == "Unauthorized") {
      // Get the login credentials
      const savedCred = getLoginCredentials();
      // Make sure the token is exist
      if (savedCred) {
        // Refresh token
        const tokenRefreshed = await refreshToken(savedCred);
        // Token is refreshed
        if (tokenRefreshed) {
          return callback(...args);
        }
      }
    }
  }

  // Terminate task, display error to try-catch of caller (that call this function)
  throw error;
}

// Get Request
export async function get(
  url: string,
  config?: AxiosRequestConfig,
): Promise<any> {
  let res: any;
  try {
    const dataReq = await api.get(url, config);
    res = dataReq.data;
  } catch (error) {
    return ApiErr(error, get, url, config);
  }
  return res;
}

// Post Request
export async function post(
  url: string,
  data: any,
  config?: AxiosRequestConfig,
): Promise<any> {
  let res: any;
  try {
    const dataReq = await api.post(url, data, config);
    res = dataReq.data;
  } catch (error) {
    return ApiErr(error, get, url, config);
  }
  return res;
}

// Path Request

// Delete Request
