/* ===========================================================
|  FUNCTION UNTUK HALAMAN MEMBER
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 31-Jan-2026
|  Updated At: 31-Jan-2026
*/

// Libraries
import { MemberInterface } from "../../../../lib/interfaces/database.interface";
import { getLoginCredentials } from "../../../../lib/system/credentials";
import { MEMBER_URL } from "../../../../lib/constants/server.constant";
import { get } from "../../../../lib/system/api";

// Node Modules
import { AxiosRequestConfig } from "axios";

// Api Request Configurations
function config(): AxiosRequestConfig {
  return {
    headers: {
      Authorization: `Bearer ${getLoginCredentials().access_token}`,
    },
  };
}

export async function getAllMember(): Promise<MemberInterface[]> {
  return getWhereMember("");
}

export async function getWhereMember(args: string): Promise<MemberInterface[]> {
  const member: MemberInterface[] = await get(MEMBER_URL + args, config());
  return member;
}

export async function getOneMember(args: string): Promise<MemberInterface> {
  const member: MemberInterface = await get(MEMBER_URL + args, config());
  return member;
}
