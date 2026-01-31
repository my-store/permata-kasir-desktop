export interface TokoInterface {
  id: number;
  uuid: string;
  nama: string;
  alamat: string;
  tlp: string;
  createdAt: string;
  updatedAt: string;
}

export interface DiskonInterface {
  id: number;
  uuid: string;
  keterangan: string;
  nilai: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProdukInterface {
  id: number;
  uuid: string;
  nama: string;
  hargaPokok: number;
  hargaJual: number;
  stok: number;
  createdAt: string;
  updatedAt: string;
}

export interface JasaInterface {
  id: number;
  uuid: string;
  nama: string;
  biaya: number;
  createdAt: string;
  updatedAt: string;
}

export interface MemberInterface {
  id: number;
  uuid: string;
  nama: string;
  alamat: string;
  tlp: string;
  createdAt: string;
  updatedAt: string;
}
