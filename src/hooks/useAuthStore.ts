import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import authApi from "../api/apiAuth";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector(
    (state: any) => state.auth
  );

  const dispatch = useDispatch();

  const startLogin = async ({ email, password }: any) => {
    dispatch(onChecking());

    try {
      const { data } = await authApi.post("/auth", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(onLogin({ ...data }));
    } catch (error: any) {
      console.log("error", error);
      dispatch(onLogout(error.response.data?.msg || "Login error"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 20);
    }
  };

  const startRegister = async ({ name, email, role, password }: any) => {
    try {
      const { data } = await authApi.post("/auth/new", {
        name,
        email,
        role,
        password,
      });
      console.log("response", data);
      setTimeout(() => {
        Swal.fire({
          title: "Usuario Creado Exitosamente",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }, 20);
    } catch (error: any) {
      console.log("error", error);
      dispatch(onLogout(error.response.data?.msg || "Register error"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 20);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout(undefined));

    try {
      const { data } = await authApi.get("/auth/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(onLogin({ ...data }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout("Token expired"));
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout(undefined));
  };

  return {
    // Properties
    errorMessage,
    status,
    user,

    // Methods
    checkAuthToken,
    startLogin,
    startLogout,
    startRegister,
  };
};
