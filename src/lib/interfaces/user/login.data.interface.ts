export interface UserLoginData {
  id: number;
  adminId: number;
  uuid: string;
  nama: string;
  alamat: string;
  tlp: string;
  userRankId: number;
  active: boolean;
  deactivatedAt: string | null;
  deactivatedReason: string | null;
  online: boolean;
  lastOnline: string;
  foto: string;
  createdAt: string;
  updatedAt: string;
}
