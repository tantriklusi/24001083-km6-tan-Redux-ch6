import axios from "axios";
import { setIsLoggedIn, setToken } from "../reducers/authReducers";

export const loginUser = (data, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(`https://shy-cloud-3319.fly.dev/api/v1/auth/login`, data, { "Content-Type": "application/json" });
    const { token } = response?.data?.data;

    dispatch(setToken(token));
    dispatch(setIsLoggedIn(true));
    return response;
    navigate("/");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error?.response?.data?.message);
      return;
    }
    console.error(error.message);
  }
};

export const register = (data, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(`https://shy-cloud-3319.fly.dev/api/v1/auth/register`, data, { "Content-Type": "application/json" });
    const { token } = response?.data?.data;

    dispatch(setToken(token));
    dispatch(setIsLoggedIn(true));
    navigate("/login");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error?.response?.data?.message);
      return;
    }
    console.error(error.message);
  }
};

export const registerLoginWithGoogleAction = (accessToken, navigate) => async (dispatch) => {
  // Mengirim permintaan untuk login dengan Google ke server
  try {
    const response = await axios.post("https://shy-cloud-3319.fly.dev/api/v1/auth/google", { access_token: accessToken }, { headers: { "Content-Type": "application/json" } });
    // Mendapatkan token dari respons
    const { token } = response.data.data;
    // Menyimpan token ke dalam store Redux menggunakan action creator setToken
    dispatch(setToken(token));
    // Mengarahkan pengguna ke halaman utama
    navigate("/");
    // Menangani kesalahan jika permintaan gagal
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    console.error("Error registering/login with Google:", error);
    alert(error.message);
  }
};

// export const logout = (navigate) => async (dispatch) => {
//   dispatch(setToken(null));
//   dispatch(setIsLoggedIn(false));
//   dispatch(setUser(null));
//   navigate("/login");
// };
