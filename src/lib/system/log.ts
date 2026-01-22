/* ===========================================================
|  LIBRARY - CONSOLE MANAGER
|  ===========================================================
|  Disini berisi sistem manjemen log dengan fitur warna
|  pada background sesuai jenis log.
|   1. Log = Hijau
|   2. Warning = Kuning
|   3. Error = Merah
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 19-Jan-2026
|  Updated At: 19-Jan-2026
*/

export function time(): string {
  const d = new Date();
  const jam = d.getHours();
  const menit = d.getMinutes();
  return `${jam}:${menit} WIB`;
}

export function Log(text: string): void {
  const style = `
        color: white;
        background-color: green;
    `;
  console.log(`%c ${time()} \n ${text} `, style);
}

export function Error(text: string): void {
  const style = `
        color: white;
        background-color: red;
    `;
  console.log(`%c ${time()} \n ${text} `, style);
}

export function Warn(text: string): void {
  const style = `
        color: black;
        background-color: yellow;
    `;
  console.log(`%c ${time()} \n ${text} `, style);
}
