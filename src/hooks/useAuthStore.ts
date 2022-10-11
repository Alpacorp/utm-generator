import { useDispatch, useSelector } from "react-redux";
import authApi from "../api/apiAuth";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector(
    (state: any) => state.auth
  );
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }: any) => {
    console.log({ email, password });

    try {
      const response = await authApi.post("/auth", { email, password });
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    // Properties
    errorMessage,
    status,
    user,

    // Methods
    startLogin,
  };
};
