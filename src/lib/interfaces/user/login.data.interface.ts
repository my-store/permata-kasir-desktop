import { UserRankInterface } from "../database.interface";

export interface UserLoginDataInterface {
  id?: number;
  adminId?: number;
  uuid?: string;
  nama?: string;
  alamat?: string;
  tlp?: string;
  userRankId?: number;
  userRank?: UserRankInterface;
  active?: boolean;
  deactivatedAt?: string | null;
  deactivatedReason?: string | null;
  online?: boolean;
  lastOnline?: string;
  foto?: string;
  createdAt?: string;
  updatedAt?: string;
}
