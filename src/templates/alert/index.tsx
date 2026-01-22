/* ===========================================================
|  ALERT WINDOW
|  ===========================================================
|  Disini berisi jendela peringatan.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 19-Jan-2026
|  Updated At: 19-Jan-2026
*/

import { removeAlert } from "../../lib/redux/reducers/alert.reducer";
import { ReduxRootStateType } from "../../lib/redux/store.redux";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/templates/alert.style.sass";

export default function Alert() {
  const alertState = useSelector((state: ReduxRootStateType) => state.alert);
  const dispatch = useDispatch();

  const { opened, type, title, body } = alertState;

  // Dynamic classes
  const containerClass = opened ? "Alert Alert-Active" : "Alert";
  const boxClass = opened
    ? `Alert-Box Alert-Box-Active ${type}`
    : `Alert-Box ${type}`;

  return (
    <div className={containerClass}>
      <div className={boxClass}>
        {/* Title */}
        <p className={`Alert-Title ${type}`}>{title}</p>

        {/* Body */}
        <p className="Alert-Body">{body}</p>

        {/* Button */}
        <div className="Alert-Button-Container">
          <button
            className="Alert-Close-Btn"
            onClick={() => dispatch(removeAlert())}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
