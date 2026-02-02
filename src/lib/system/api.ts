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

import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import { SERVER_URL } from "../constants/server.constant";

// Axios Instance
const api: AxiosInstance = axios.create({ baseURL: SERVER_URL });

// // Error handler
// async function ApiErr(error: any, callback: Function, ...args: any) {
//   // Axios error
//   if (isAxiosError(error)) {
//     const axiosErr = error as AxiosError;
//     // Get message from server
//     const { message }: any = axiosErr.response?.data;
//     // Token expired
//     if (message && message == "Unauthorized") {
//       // Get the login credentials
//       const savedCred = getLoginCredentials();
//       // Make sure the token is exist
//       if (savedCred) {
//         // Refresh token
//         const tokenRefreshed = await refreshToken(savedCred);
//         // Token is refreshed
//         if (tokenRefreshed) {
//           return callback(...args);
//         }
//       }
//     }
//   }
// }

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
