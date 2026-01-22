/* ===========================================================
|  LIBRARY - STRING MANAGER
|  ===========================================================
|  Disini berisi metode manipulasi string, di antaranya:
|  1. Menambahkan koma pada angka ribuan atau jutaan
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 19-Jan-2026
|  Updated At: 19-Jan-2026
*/

export function addComma(str: string | number) {
  return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
