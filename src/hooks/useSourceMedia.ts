import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { apiSourceMedia } from "../api/apiSourceMedia";
import {
  clearErrorMessageSourceMedia,
  onCheckingSourceMedia,
  onGetSourceMediaError,
  onGetSourceMediaSuccess,
} from "../store";

export const useSourceMedia = () => {
  const dispatch = useDispatch();

  const sourceMediaStore = async () => {
    dispatch(onCheckingSourceMedia());

    try {
      const { data } = await apiSourceMedia.get("/sourcemedia/sourcemedia");
      dispatch(onGetSourceMediaSuccess(data));
    } catch (error: any) {
      console.log("error", error);
      dispatch(
        onGetSourceMediaError(error.response.data?.msg || "TypeAd error")
      );
      setTimeout(() => {
        dispatch(clearErrorMessageSourceMedia());
      }, 20);
    }
  };

  const createSourceMedia = async ({ name, idchanneltype }: any) => {
    dispatch(onCheckingSourceMedia());

    try {
      await apiSourceMedia.post("/sourcemedia/new", {
        name,
        idchanneltype,
      });
      setTimeout(() => {
        Swal.fire({
          title: "Fuente de Medio creada correctamente",
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
      dispatch(
        onGetSourceMediaError(error.response.data?.msg || "TypeAd error")
      );
      setTimeout(() => {
        dispatch(clearErrorMessageSourceMedia());
      }, 20);
    }
  };

  return {
    sourceMediaStore,
    createSourceMedia,
  };
};
