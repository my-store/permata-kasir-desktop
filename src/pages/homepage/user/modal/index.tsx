/* ===========================================================
|  HALAMAN MODAL
|  ===========================================================
|  Halaman modal perusahaan:
|  1. Ditambahkan secara manual
|  2. Ditambahkan otomatis saat input produk baru[harga-pokok]
|  4. Dll
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 28-Jan-2026
|  Updated At: 28-Jan-2026
*/

// Node Modules
import { ReactNode } from "react";

// Entry Point
export function Modal(): ReactNode {
  return (
    <div id="Modal">
      <h1>Modal</h1>
      <p>Daftar Modal</p>
      <p>1. Otomatis = Dari input produk[hargaPokok]</p>
      <p>2. Manual = Modal Awal Dll</p>
    </div>
  );
}
