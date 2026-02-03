/* ===========================================================
|  FUNCTION UNTUK HALAMAN MEMBER
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 31-Jan-2026
|  Updated At: 2-Feb-2026
*/

// Libraries
import { MemberInterface } from "../../../../lib/interfaces/database.interface";
import { afterSignedInErrorHandler, get } from "../../../../lib/system/api";
import { getLoginCredentials } from "../../../../lib/system/credentials";
import { MEMBER_URL } from "../../../../lib/constants/server.constant";

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
  let member: MemberInterface[] = [];
  try {
    member = await get(MEMBER_URL + args, config());
  } catch (err) {
    // Trying to handle error
    try {
      await afterSignedInErrorHandler(err, {
        func: getWhereMember,
        args: [args],
      });
    } catch {
      // Failed to handle error
    }
  }
  return member;
}

export async function getOneMember(
  args: string,
): Promise<MemberInterface | null> {
  let member: MemberInterface | null = null;
  try {
    member = await get(MEMBER_URL + args, config());
  } catch (err) {
    // Trying to handle error
    try {
      await afterSignedInErrorHandler(err, {
        func: getOneMember,
        args: [args],
      });
    } catch {
      // Failed to handle error
    }
  }
  return member;
}
