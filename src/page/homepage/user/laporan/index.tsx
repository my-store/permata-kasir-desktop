/* ===========================================================
|  HALAMAN LAPORAN
|  ===========================================================
|  Halaman laporan yang berisi laporan bulanan, diantaranya:
|  1. Pendapatan
|  2. Pengeluaran
|  3. Neraca
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
export function Laporan(): ReactNode {
  return (
    <div id="Laporan">
      <h1>Laporan</h1>
      <p>1. Laporan Pendapatan</p>
      <p>2. Laporan Pengeluaran/ Biaya Operasional</p>
    </div>
  );
}
