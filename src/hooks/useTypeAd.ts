import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { apiTypeAd } from "../api/apiTypeAd";
import {
  clearErrorMessageTypeAd,
  onCheckingTypeAd,
  onGetTypeAdError,
  onGetTypeAdSuccess,
} from "../store";

export const useTypeAd = () => {
  const dispatch = useDispatch();

  const typeAdStore = async () => {
    dispatch(onCheckingTypeAd());

    try {
      const { data } = await apiTypeAd.get("/typead/typead");
      dispatch(onGetTypeAdSuccess(data));
    } catch (error: any) {
      console.log("error", error);
      dispatch(onGetTypeAdError(error.response.data?.msg || "TypeAd error"));
      setTimeout(() => {
        dispatch(clearErrorMessageTypeAd());
      }, 20);
    }
  };

  const createTypeAd = async ({ name, shortname }: any) => {
    dispatch(onCheckingTypeAd());

    try {
      await apiTypeAd.post("/typead/new", {
        name,
        shortname,
      });
      setTimeout(() => {
        Swal.fire({
          title: "Tipo de Inversión creado correctamente",
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
      dispatch(onGetTypeAdError(error.response.data?.msg || "TypeAd error"));
      Swal.fire({
        title: error.response.data?.msg || "TypeAd error",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      setTimeout(() => {
        dispatch(clearErrorMessageTypeAd());
      }, 20);
    }
  };

  const updateTypeAd = async (id: string, data: any) => {
    dispatch(onCheckingTypeAd());

    try {
      await apiTypeAd.put(`/typead/${id}`, data);
    } catch (error: any) {
      console.log("error", error);
      dispatch(onGetTypeAdError(error.response.data?.msg || "TypeAd error"));
      Swal.fire({
        title: error.response.data?.msg || "TypeAd error",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      setTimeout(() => {
        dispatch(clearErrorMessageTypeAd());
      }, 20);
    }
  };

  const deleteTypeAd = async (id: string) => {
    dispatch(onCheckingTypeAd());

    try {
      await apiTypeAd.delete(`/typead/${id}`);
    } catch (error: any) {
      console.log("error", error);
      dispatch(onGetTypeAdError(error.response.data?.msg || "TypeAd error"));
      setTimeout(() => {
        dispatch(clearErrorMessageTypeAd());
      }, 20);
    }
  };

  return {
    typeAdStore,
    createTypeAd,
    updateTypeAd,
    deleteTypeAd,
  };
};
