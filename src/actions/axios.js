import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { getAuthData } from "src/helpers/helper";

const access_token = getAuthData("access_token");
const instance = axios.create({
  baseURL: process.env.API_URL + "api",
  headers: {
    Authorization: access_token ? "Bearer " + access_token : "",
  },
});

/**
 * Global auth handling: when the API rejects a request with 401 (the token has
 * expired — e.g. team/employee tokens expire at 9 AM — or is otherwise invalid),
 * clear the stored session and reload. The route guards then send the user to the
 * login page for their panel. Login failures return HTTP 200, so a 401 always
 * means an invalid/expired token here. The `auth` guard avoids a reload loop on
 * pages where the user is already logged out.
 */
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error && error.response && error.response.status === 401) {
      try {
        const hasAuth = secureLocalStorage.getItem("auth");
        if (hasAuth) {
          secureLocalStorage.removeItem("auth");
          window.location.reload();
        }
      } catch (e) {}
    }
    return Promise.reject(error);
  },
);

export default instance;
