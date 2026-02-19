/* ===========================================================
|  LIBRARY - GLOBAL API REQUEST OBJECT - AXIOS INSTANCE
|  ===========================================================
|  Disini berisi instance axios, dapat digunakan dimanapun.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 30-Jan-2026
|  Updated At: 19-Feb-2026
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
export async function fixApiError(err: any): Promise<void> {
  const axiosErr = err as AxiosError;
  const { message }: any = axiosErr.response?.data;

  // Fix error by the message given from server
  if (message) {
    // Token expired
    if (message == "Unauthorized") {
      // Get the token from local storage
      const token = getLoginCredentials();

      if (!token) {
        // Display warning message in the console
        Warn(
          "Token (data login) tidak ditemukan, mungkin telah terhapus.\n-> api.errHandler",
        );

        // Return to the caller catch block
        throw err;
      }

      try {
        // Refresh token
        await refreshToken(token);
        /*
        |
        */
      } catch (refrestTokenError) {
        // Display error message in the console
        Error("Gagal memperbarui token.\n-> api.fixApiError");

        // Return to the caller catch block
        throw refrestTokenError;
      }
    }

    /* Another error handler by message */
  }

  /* Another method of error handler */
}
