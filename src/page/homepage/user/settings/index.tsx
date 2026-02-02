/* ===========================================================
|  USER SETTINGS
|  ===========================================================
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 2-Feb-2026
|  Updated At: 2-Feb-2026
*/

// Node Modules
import { useDispatch /*, useSelector */ } from "react-redux";
import { ReactNode, useState } from "react";

// Libraries
import { closeUserSettings } from "../../../../lib/redux/reducers/user/settings.reducer";
// import { ReduxRootStateType } from "../../../../lib/redux/store.redux";

// User Settings Style
import "../../../../styles/pages/homepage/user/settings/user.settings.main.style.sass";

// Icons
import { IoClose } from "react-icons/io5";

const tabs: any[] = [
  {
    name: "Tema",
    component: <p>Tema</p>,
  },
  {
    name: "Loading",
    component: <p>Loading</p>,
  },
  {
    name: "Tampilkan",
    component: <p>Tampilkan</p>,
  },
];

export function UserSettings(): ReactNode {
  // const state = useSelector((state: ReduxRootStateType) => state.user_settings);
  const [pageIndex, setPageIndex] = useState(0);
  const dispatch = useDispatch();

  return (
    <div className={"Settings"}>
      <div id="Box">
        <div id="Header">
          <p id="Label">Pengaturan</p>
          <IoClose
            id="Close-Btn"
            title="Tutup"
            onClick={() => dispatch(closeUserSettings())}
          />
        </div>
        <div id="Body">
          <div id="Tab">
            <div id="Buttons-Container">
              {tabs.map((t, tx) => (
                <p
                  key={tx}
                  className={tx == pageIndex ? "Btn Active" : "Btn"}
                  onClick={() => {
                    setPageIndex(tx);
                  }}
                >
                  {t.name}
                </p>
              ))}
            </div>
            <div id="Contents">{tabs[pageIndex].component}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
