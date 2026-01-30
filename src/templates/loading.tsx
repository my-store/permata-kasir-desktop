/* ===========================================================
|  LOADING WINDOW
|  ===========================================================
|  Disini berisi jendela animasi loading.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 19-Jan-2026
|  Updated At: 30-Jan-2026
*/

import { ReduxRootStateType } from "../lib/redux/store.redux";
import { Mosaic, Atom } from "react-loading-indicators";
import "../styles/templates/loading.style.sass";
import { useSelector } from "react-redux";
import { CSSProperties } from "react";

type Easing =
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "linear"
  | "cubic-bezier(0.25, 0.1, 0.25, 1.0)"
  | "cubic-bezier(0.42, 0.0, 1.0, 1.0)"
  | "cubic-bezier(0.0, 0.0, 0.58, 1.0)"
  | "cubic-bezier(0.42, 0.0, 0.58, 1.0)"
  | "linear(0, 1)"
  | "steps(4, end)"
  | (string & {});

interface LoadingInterface {
  color?: string;
  text?: string;
  textColor?: string;
  size?: any;
  easing?: Easing;
}

interface ContentLoadingInterface extends LoadingInterface {
  style?: CSSProperties;
}

function setDefaultLoadingConfig(props: LoadingInterface): LoadingInterface {
  let { color, size, text, textColor, easing } = props;

  if (!color) color = "#72dac3";
  if (!size) size = "medium";
  if (!textColor) textColor = color;
  // if (!text) text = "Mohon tungu";
  if (!easing) easing = "ease-in-out";

  return { color, size, text, textColor, easing };
}

export function ContentLoading(props: ContentLoadingInterface) {
  const { color, size, textColor } = setDefaultLoadingConfig(props);
  return (
    <div id="Content-Loading-Container" style={props.style}>
      <Mosaic color={color} size={size} textColor={textColor} />
    </div>
  );
}

export function PageLoading(props: LoadingInterface) {
  let { color, size, text, textColor, easing } = setDefaultLoadingConfig(props);

  const rootState = useSelector((state: ReduxRootStateType) => state.root);

  const containerClass = rootState.isLoading
    ? `Page-Loading-Container Page-Loading-Container-Active`
    : "Page-Loading-Container";

  return (
    <div className={containerClass}>
      <div id="Page-Loading-Box">
        <Atom
          color={color}
          easing={easing}
          size={size}
          text={text}
          textColor={textColor}
        />
      </div>
    </div>
  );
}
