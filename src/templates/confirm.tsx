/* ===========================================================
|  CONFIRM WINDOW
|  ===========================================================
|  Disini berisi jendela peringatan.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 19-Jan-2026
|  Updated At: 22-Feb-2026
*/

import {
  confirmTriggerCallback,
  removeConfirm,
} from "../lib/redux/reducers/confirm.reducer";
import { ReduxRootStateType } from "../lib/redux/store.redux";
import { useDispatch, useSelector } from "react-redux";
import "../styles/templates/confirm.style.sass";

export default function Confirm() {
  const confirmState = useSelector(
    (state: ReduxRootStateType) => state.confirm,
  );
  const dispatch = useDispatch();
  const { opened, title, body } = confirmState;

  // Dynamic classes
  const containerClass = opened ? "Confirm Confirm-Active" : "Confirm";

  return (
    <div className={containerClass}>
      <div className="Confirm-Box">
        {/* Title */}
        <p className="Confirm-Title">{title}</p>

        {/* Body */}
        <p className="Confirm-Body">{body}</p>

        {/* Button */}
        <div className="Confirm-Button-Container">
          <button
            className="Confirm-Close-Btn"
            onClick={() => {
              dispatch(confirmTriggerCallback());
            }}
          >
            Ya
          </button>
          <button
            className="Confirm-Close-Btn"
            onClick={() => dispatch(removeConfirm())}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
