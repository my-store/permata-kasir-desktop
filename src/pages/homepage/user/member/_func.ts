/* ===========================================================
|  FUNCTION UNTUK HALAMAN MEMBER
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 31-Jan-2026
|  Updated At: 19-Feb-2026
*/

// Libraries
import { MemberInterface } from "../../../../lib/interfaces/database.interface";
import { api, fixApiErr, includeToken } from "../../../../lib/system/api";
import { MEMBER_URL } from "../../../../lib/constants/server.constant";
import { AxiosResponse } from "axios";

export async function getAllMember(): Promise<MemberInterface[]> {
  return getWhereMember("");
}

export async function getWhereMember(
  args: string,
): Promise<MemberInterface[] | any> {
  let member: MemberInterface[] = [];
  try {
    const req: AxiosResponse = await api.get(MEMBER_URL + args, includeToken());
    member = req.data;
  } catch (err) {
    // Trying to handle error
    try {
      return fixApiErr(err, getWhereMember, args);
    } catch (unhandledErr) {
      // Failed to handle error
      throw unhandledErr;
    }
  }
  return member;
}

export async function getOneMember(
  args: string,
): Promise<MemberInterface | any> {
  let member: MemberInterface | null = null;
  try {
    const req: AxiosResponse = await api.get(MEMBER_URL + args, includeToken());
    member = req.data;
  } catch (err) {
    // Trying to handle error
    try {
      return fixApiErr(err, getOneMember, args);
    } catch (unhandledErr) {
      // Failed to handle error
      throw unhandledErr;
    }
  }
  return member;
}
