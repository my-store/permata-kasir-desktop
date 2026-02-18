/* ===========================================================
|  LIBRARY - GLOBAL API REQUEST OBJECT - AXIOS INSTANCE
|  ===========================================================
|  Disini berisi instance axios, dapat digunakan dimanapun.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 30-Jan-2026
|  Updated At: 18-Feb-2026
*/

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { getLoginCredentials, refreshToken } from "./credentials";
import { SERVER_URL } from "../constants/server.constant";
import { Error, Warn } from "./log";

// Axios Instance
export const api: AxiosInstance = axios.create({ baseURL: SERVER_URL });

// Authentication Headers (must be signed-in)
export function includeToken(): AxiosRequestConfig {
  return {
    headers: {
      Authorization: `Bearer ${getLoginCredentials().access_token}`,
    },
  };
}

// Api Error Handler
export async function errHandler(
  err: any,
  callback: Function,
  args: any[],
): Promise<void> {
  const axiosErr = err as AxiosError;
  const { message }: any = axiosErr.response?.data;

  // Token expired
  if (message && message == "Unauthorized") {
    // Get old token
    const oldToken = getLoginCredentials();
    // Make sure old token is still exits (not deleted)
    if (oldToken) {
      // Refresh token
      try {
        await refreshToken(oldToken);
      } catch (rtErr) {
        // Display error message in the console
        Error("Gagal memperbarui token.\n-> api.errHandler");
        // Return to the caller try-catch block
        throw rtErr;
      }
      // Recall callback
      return callback(...args);
    }

    // Token is not found, maybe deleted or something unknown error
    else {
      // Display warning message in the console
      Warn(
        "Token (data login) tidak ditemukan, mungkin telah terhapus.\n-> api.errHandler",
      );
    }
  }

  // Unhandled error
  else {
    Warn("Unhandled error\n-> api.errHandler");
  }

  // Display unhandled error
  throw axiosErr.response?.data;
}
