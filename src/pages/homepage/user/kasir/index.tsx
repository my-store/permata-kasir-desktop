/* ===========================================================
|  HALAMAN KASIR
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 9-Feb-2026
|  Updated At: 26-Feb-2026
*/

// Node Modules
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";

// Libraries
import { ReduxRootStateType } from "../../../../lib/redux/store.redux";
import { setUserKasirList } from "../../../../lib/redux/reducers/user/kasir.reducer";

// Kasir Functions
import { getAllKasir } from "./_func";

// Toko Functions
import { getAllToko } from "../toko/_func";

// List and its Header, Item etc.
import { UserKasirList } from "./list";

// Entry Point
export function Kasir(): ReactNode {
  const { list } = useSelector((state: ReduxRootStateType) => state.user_kasir);
  const dispatch = useDispatch();

  const query = {
    getAllKasir: useQuery({
      queryKey: ["user.kasir.getAll"],
      queryFn: getAllKasir,
    }),
    getAllToko: useQuery({
      queryKey: ["user.kasir.getAllToko"],
      queryFn: getAllToko,
    }),
  };

  useEffect(() => {
    if (query.getAllKasir.status == "success" && query.getAllKasir.data) {
      dispatch(setUserKasirList(query.getAllKasir.data));
    }
  }, [query.getAllKasir.status, query.getAllKasir.data]);

  const pending: boolean =
    query.getAllKasir.isPending == true || query.getAllToko.isPending == true;

  return (
    <UserKasirList
      dataKasir={list}
      dataToko={query.getAllToko.data ?? []}
      isPending={pending}
    />
  );
}
