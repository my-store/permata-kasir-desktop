/* ===========================================================
|  HALAMAN LOGIN
|  ===========================================================
|  Sistem login pada aplikasi ini hanya disediakan untuk
|  User dan Kasir.
|  -----------------------------------------------------------
|  Jangan lupa untuk memperbarui dokumen ini
|  jika ada perubahan atau penambahan fitur baru.
|  -----------------------------------------------------------
|  Created At: 19-Jan-2026
|  Updated At: 19-Jan-2026
*/

// Node Modules
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import $ from "jquery";

// Libraries
import { openAlert } from "../../lib/redux/reducers/alert.reducer";
import { ReduxRootStateType } from "../../lib/redux/store.redux";
import { JSONPost } from "../../lib/system/requests";
import { findParams } from "../../lib/system/url";
import {
  finishWaitLogin,
  setLoginReady,
  waitLogin,
  login,
} from "../../lib/redux/reducers/login.reducer";
import {
  rootRemoveLoading,
  rootOpenLoading,
} from "../../lib/redux/reducers/root.reducer";
import {
  setLoginCredentials,
  getLoginCredentials,
  getAuthProfile,
  refreshToken,
  getUserData,
} from "../../lib/system/credentials";

// Login Style
import "../../styles/pages/login.style.sass";

// Sounds
import errorAudio from "../../assets/sounds/error.mp3";

// Images
import ScienceBg from "../../assets/images/science.png";
import { SERVER_URL } from "../../lib/constants/server.constant";

// Entry Point
export function Loginpage() {
  const loginState = useSelector((state: ReduxRootStateType) => state.login);
  const { loginWait } = loginState;

  const dispatch = useDispatch();

  // Initialize error sound
  const errorSound: HTMLAudioElement = new Audio(errorAudio);

  function failed(msg: string): void {
    // Play error sound
    errorSound.play();

    // Show alert box
    dispatch(
      openAlert({
        type: "Error",
        title: "Gagal Masuk",
        body: msg,
      }),
    );

    // Close from login-wait state
    dispatch(finishWaitLogin());
  }

  /* ---------------------------------------------------------------------------
  | PERSIAPAN LOGIN
  | ----------------------------------------------------------------------------
  | Jika login berhasil, response yang diberikan server yaitu:
  | 1. access_token
  |    - Digunakan pada headers.Authorization
  | 2. role
  |    - User atau Kasir, server yang menentukan saat proses login
  |      server akan mencari tahu siapa yang sedang login,
  |      apakah dia User atau Kasir.
  */
  async function prepareLogin() {
    // Block if already wating for login
    if (loginWait) return;

    // Set login wait
    dispatch(waitLogin());

    const tlp: any = $("#Loginpage #tlp").val();
    const password: any = $("#Loginpage #password").val();

    // No data is presented
    if (tlp.length < 1 || password.length < 1) {
      // Terminate task
      return failed("Mohon isi seluruh data");
    }

    // Mengirim request ke API
    let logReq: any;
    try {
      logReq = await JSONPost(`${SERVER_URL}/api/v1/auth`, {
        body: JSON.stringify({ tlp, password }),
      });
    } catch (error) {
      // Terminate task - Terjadi kesalahan saat mengirim request ke server
      return failed(`${error}`);
    }

    // Tlp atau password salah, akun belum di aktivasi atau mungkin di banned.
    if (logReq.message) {
      // Terminate task - Tampilkan pesan error dari server
      return failed(logReq.message);
    }

    // Get login profile
    const userData = await getUserData(tlp, logReq);

    // No user data is founded
    if (!userData) {
      // Terminate task and display the error message
      return failed("Data user tidak ditemukan");
    }

    // Re-open loading animation
    dispatch(rootOpenLoading());

    // Create login credentials on local storage
    const loginData = { ...logReq, data: userData };
    setLoginCredentials(loginData);

    // Set login data
    dispatch(login(logReq.role));

    // Close from login-wait state
    dispatch(finishWaitLogin());

    // Reset ready state
    dispatch(setLoginReady(false));
  }

  function redirectToHomepage(role: string) {
    dispatch(login(role));
  }

  async function load() {
    // Login token checking ...
    const savedCred = getLoginCredentials();
    // Login data is founded in local storage
    if (savedCred) {
      // Check login-profile
      const profile = await getAuthProfile(savedCred.access_token);

      // Token still active
      if (profile) {
        // Terminate process, and force to open home-page (user | kasir)
        return redirectToHomepage(savedCred.role);
      }

      // Token expired
      else {
        // Refresh token
        const tokenRefreshed = await refreshToken(savedCred.data.tlp);

        // Token is refreshed
        if (tokenRefreshed) {
          // Ambil token yang barusaja direfresh
          // Metode ini dilakukan untuk mengantisipasi jika data login
          // sebelumnya adalah user berubah menjadi kasir atau sebaliknya.
          // Jadi ambil role terbaru berdasarkan yang diberikan oleh server.
          // Untuk menentukan halaman mana yang harus diberikan.
          const newToken = getLoginCredentials();

          // Terminate process, and force to open home-page (user | kasir)
          return redirectToHomepage(newToken.role);
        }
      }
    }

    // Everything's ok - Set login ready = true
    dispatch(setLoginReady(true));

    // Remove loading animation after 3 second
    setTimeout(() => dispatch(rootRemoveLoading()), 3000);
  }

  useEffect(() => {
    load();
  }, []);

  // Still not ready (isReady=false), but isLogin=true,
  // redirect to home-page (user | kasir) and also deep URL/ sub url:
  // Example: /user/sub-url/?parameters
  if (loginState.isLogin) {
    const urlRole = loginState.loginRole.toLowerCase();
    let landing_url: string = `/${urlRole}`;
    // Redirect\ deep URL is presented
    const redirect: string = findParams("redirect");
    if (redirect.length > 0 && redirect != "/") {
      // Only if redirect URL (root) is match with the role,
      // If not, keep landing_url as default (redirect to current role)
      const redMatch = new RegExp(urlRole, "g").test(urlRole);
      if (redMatch) {
        // Continue with requested/ redirect URL
        landing_url = redirect;
      }
    }
    return <Navigate to={landing_url} replace />;
  }

  // Wait logic to finish (both signed-in or not)
  if (!loginState.isReady) return null;

  return (
    <div id="Loginpage">
      <div id="Banner" style={{ backgroundImage: `url(${ScienceBg})` }}></div>
      <div id="Form-Container">
        <div id="Form-Header">
          <h1 id="Form-Title">Masuk Dulu</h1>
        </div>
        <form id="Form" onSubmit={(e) => e.preventDefault()}>
          <div className="Form-Group">
            <label>No. Tlp</label>
            <input type="text" id="tlp" autoComplete="off" />
          </div>
          <div className="Form-Group">
            <label>Password</label>
            <input type="password" id="password" />
          </div>
          {/* Form buttons */}
          <div id="Form-Buttons">
            <button onClick={prepareLogin}>Masuk</button>
          </div>

          {/* Forgot password */}
          <p id="Forgot-Password-Text">
            Lupa password? <span id="Forgot-Password-Link">Ubah</span>
          </p>
        </form>
      </div>
    </div>
  );
}
