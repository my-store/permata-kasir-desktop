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
|  Updated At: 7-Feb-2026
*/

// Node Modules
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import $ from "jquery";

// Libraries
import { UserInterface } from "../../lib/interfaces/database.interface";
import { TokenInterface } from "../../lib/interfaces/api.interface";
import { openAlert } from "../../lib/redux/reducers/alert.reducer";
import { ReduxRootStateType } from "../../lib/redux/store.redux";
import { errorSound } from "../../lib/constants/media.constant";
import { AUTH_URL } from "../../lib/constants/server.constant";
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
import { api } from "../../lib/system/api";
import {
  APP_PAGE_LOADING_DELAY,
  APP_CLIENT_NAME,
} from "../../lib/constants/app.constant";
import {
  removeLoginCredentials,
  setLoginCredentials,
  getLoginCredentials,
  refreshToken,
} from "../../lib/system/credentials";

// Login Style
import "../../styles/pages/login.style.sass";

// Images
import ScienceBg from "../../assets/images/science.png";

// Entry Point
export function Loginpage() {
  const loginState = useSelector((state: ReduxRootStateType) => state.login);
  const { loginWait } = loginState;

  const dispatch = useDispatch();

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

    // Extra data (security update 27-Jan-2026)
    const app_name: string = APP_CLIENT_NAME;

    // No data is presented
    if (tlp.length < 1 || password.length < 1) {
      // Terminate task
      return failed("Mohon isi seluruh data");
    }

    // Send login request and get the user data
    let loginData: TokenInterface;
    let userData: UserInterface;
    try {
      // Send login request
      const loginReq: AxiosResponse = await api.post(AUTH_URL, {
        tlp,
        password,
        app_name,
      });
      loginData = loginReq.data;

      // Get user data
      const selectArgs: any = {
        userRank: {
          select: {
            uuid: true,
            maxToko: true,
            maxProduk: true,
            maxJasa: true,
          },
        },
      };
      const args: string = `?select=${JSON.stringify(selectArgs)}`;
      const userReq: AxiosResponse = await api.get(
        `/api/v1/${loginData.role.toLowerCase()}/${tlp}/${args}`,
        {
          headers: {
            Authorization: `Bearer ${loginData.access_token}`,
          },
        },
      );
      userData = userReq.data;
      /*
      |
      | Login success, everything's OK
      |
      */
    } catch (error) {
      // Axios error
      if (isAxiosError(error)) {
        const axiosErr = error as AxiosError;
        // Get message from server
        const { message }: any = axiosErr.response?.data;
        if (message) {
          // Display message from server
          return failed(`${message}`); // Terminate task
        }
      }

      // Display other error
      return failed(`${error}`); // Terminate task
    }

    // Re-open loading animation
    dispatch(rootOpenLoading());

    // Create login credentials on local storage
    setLoginCredentials({ ...loginData, data: userData });

    // Set login data
    dispatch(login(loginData.role));

    // Close from login-wait state
    dispatch(finishWaitLogin());

    // Reset ready state
    dispatch(setLoginReady(false));
  }

  function redirectToHomepage(role: string) {
    dispatch(login(role));
  }

  async function tokenCheck(): Promise<any> {
    let token: any = null;

    // Login token checking ...
    const savedCred = getLoginCredentials();

    // Login data is founded in local storage
    if (savedCred) {
      // Jika token expired, response dari server adalah:
      // message dan statusCode.
      // message = Unauthorized
      // statusCode = 401
      // ----------------------------------------------------
      // Namun jika token masih aktif, response server adalah:
      // [iat, exp, sub, role]
      // iat = Issued At (where the token is created)
      // exp = Expired
      // sub = No Tlp. User/Kasir
      // role = User/Kasir
      try {
        await api.get(AUTH_URL, {
          headers: {
            Authorization: `Bearer ${savedCred.access_token}`,
          },
        });
        // Token still alive
        token = savedCred;
      } catch {
        // Token expired, refreshing ...
        try {
          await refreshToken(savedCred);
          // Token is successfully refreshed
          token = getLoginCredentials(); // Get refreshed login credentials
        } catch {
          // Error while refreshing token
          // Remove saved token (IMPORTANT to remove the old token)
          removeLoginCredentials();
        }
      }
    }

    return token;
  }

  const { status, data } = useQuery({
    queryKey: ["login.token.checking"],
    queryFn: tokenCheck,
  });

  useEffect(() => {
    if (status == "success" && data) {
      // Token still active or refreshed, redirect to homepage (user | kasir)
      return redirectToHomepage(data.role);
    }

    // Token expired, or no token exist
    else {
      // Set login ready = true, to display login page.
      dispatch(setLoginReady(true));

      // Remove loading animation after 3 second
      setTimeout(() => dispatch(rootRemoveLoading()), APP_PAGE_LOADING_DELAY);
    }
  }, [status, data]);

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
