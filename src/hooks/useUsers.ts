import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { apiUsers } from "../api/apiUsers";
import {
  clearErrorMessageUsers,
  onCheckingUsers,
  onGetUsersError,
  onGetUsersSuccess,
} from "../store";

export const useUsers = () => {
  const dispatch = useDispatch();

  const usersStore = async () => {
    dispatch(onCheckingUsers());

    try {
      const { data } = await apiUsers.get("/auth/users");
      dispatch(onGetUsersSuccess(data));
    } catch (error: any) {
      console.log("error", error);
      dispatch(onGetUsersError(error.response.data?.msg || "Users error"));
      setTimeout(() => {
        dispatch(clearErrorMessageUsers());
      }, 20);
    }
  };

  const createUser = async ({ name, email, role, password }: any) => {
    dispatch(onCheckingUsers());

    try {
      await apiUsers.post("/auth/new", {
        name,
        email,
        role,
        password,
      });
      setTimeout(() => {
        Swal.fire({
          title: "Usuario creado correctamente",
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
      dispatch(onGetUsersError(error.response.data?.msg || "Users error"));
      Swal.fire({
        title: error.response.data?.msg || "Users error",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      setTimeout(() => {
        dispatch(clearErrorMessageUsers());
      }, 20);
    }
  };

  const updateUser = async (id: string, data: any) => {
    dispatch(onCheckingUsers());

    try {
      await apiUsers.put(`/auth/user/${id}`, data);
    } catch (error: any) {
      console.log("error", error);
      dispatch(onGetUsersError(error.response.data?.msg || "Users error"));
      Swal.fire({
        title: error.response.data?.msg || "Users error",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      setTimeout(() => {
        dispatch(clearErrorMessageUsers());
      }, 20);
    }
  };

  const deleteUser = async (id: string) => {
    dispatch(onCheckingUsers());

    try {
      await apiUsers.delete(`/auth/user/${id}`);
    } catch (error: any) {
      console.log("error", error);
      dispatch(onGetUsersError(error.response.data?.msg || "Users error"));
      Swal.fire({
        title: error.response.data?.msg || "Users error",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      setTimeout(() => {
        dispatch(clearErrorMessageUsers());
      }, 20);
    }
  };

  return {
    usersStore,
    createUser,
    updateUser,
    deleteUser,
  };
};
