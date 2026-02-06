/* ===========================================================
|  FUNCTION UNTUK HALAMAN MEMBER
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 31-Jan-2026
|  Updated At: 6-Feb-2026
*/

// Libraries
import { MemberInterface } from "../../../../lib/interfaces/database.interface";
import { errHandler, api, includeToken } from "../../../../lib/system/api";
import { MEMBER_URL } from "../../../../lib/constants/server.constant";
import { AxiosResponse } from "axios";

export async function getAllMember(): Promise<MemberInterface[]> {
  return getWhereMember("");
}

export async function getWhereMember(args: string): Promise<MemberInterface[]> {
  let member: MemberInterface[] = [];
  try {
    const req: AxiosResponse = await api.get(MEMBER_URL + args, includeToken());
    member = req.data;
  } catch (err) {
    await errHandler(err, getWhereMember, [args]);
  }
  return member;
}

export async function getOneMember(
  args: string,
): Promise<MemberInterface | null> {
  let member: MemberInterface | null = null;
  try {
    const req: AxiosResponse = await api.get(MEMBER_URL + args, includeToken());
    member = req.data;
  } catch (err) {
    await errHandler(err, getOneMember, [args]);
  }
  return member;
}
