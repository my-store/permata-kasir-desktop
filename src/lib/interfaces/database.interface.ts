interface TokoChildTableCountInterface {
  monitorToko?: number;
  produk?: number;
  jasa?: number;
  kasir?: number;
  diskon?: number;
  member?: number;
  memberRank?: number;
  transaksiPembelian?: number;
  transaksiPenjualan?: number;
}

export interface UserInterface {
  id?: number;
  uuid?: string;
  nama?: string;
  alamat?: string;
  tlp?: string;
  foto?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserRankInterface {
  id?: number;
  uuid?: string;
  nama?: string;
  maxToko?: number;
  maxProduk?: number;
  maxJasa?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface KasirInterface {
  id?: number;
  uuid?: string;
  nama?: string;
  alamat?: string;
  tlp?: string;
  password?: string;
  foto?: string;
  tokoId?: number;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface TokoInterface {
  id?: number;
  uuid?: string;
  nama?: string;
  alamat?: string;
  tlp?: string;
  user?: UserInterface;
  userId?: number;
  _count?: TokoChildTableCountInterface;
  createdAt?: string;
  updatedAt?: string;
}

export interface MonitorTokoInterface {
  id?: number;
  uuid?: string;
  username?: string;
  password?: string;
  toko?: TokoInterface[];
  tokoId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface DiskonInterface {
  id?: number;
  uuid?: string;
  keterangan?: string;
  nilai?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProdukInterface {
  id?: number;
  uuid?: string;
  nama?: string;
  hargaPokok?: number;
  hargaJual?: number;
  stok?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface JasaInterface {
  id?: number;
  uuid?: string;
  nama?: string;
  biaya?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface MemberInterface {
  id?: number;
  uuid?: string;
  nama?: string;
  alamat?: string;
  tlp?: string;
  createdAt?: string;
  updatedAt?: string;
}
