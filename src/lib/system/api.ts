/* ===========================================================
|  LIBRARY - API REQUEST - AXIOS INSTANCE
|  ===========================================================
|  Disini berisi instance axios, dapat digunakan dimanapun.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 30-Jan-2026
|  Updated At: 30-Jan-2026
*/

import axios, { AxiosInstance } from "axios";
import { SERVER_URL } from "../constants/server.constant";
const api: AxiosInstance = axios.create({ baseURL: SERVER_URL });
export default api;
