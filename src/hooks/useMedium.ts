import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { apiMedium } from "../api/apiMedium";
import {
  clearErrorMessageMedium,
  onCheckingMedium,
  onGetMediumError,
  onGetMediumSuccess,
} from "../store";

export const useMedium = () => {
  const dispatch = useDispatch();

  const mediumStore = async () => {
    dispatch(onCheckingMedium());

    try {
      const { data } = await apiMedium.get("/medium/mediums");
      dispatch(onGetMediumSuccess(data));
    } catch (error: any) {
      console.log("error", error);
      dispatch(onGetMediumError(error.response.data?.msg || "TypeAd error"));
      setTimeout(() => {
        dispatch(clearErrorMessageMedium());
      }, 20);
    }
  };

  const createMedium = async ({ name, idchanneltype }: any) => {
    dispatch(onCheckingMedium());

    try {
      await apiMedium.post("/medium/new", {
        name,
        idchanneltype,
      });
      setTimeout(() => {
        Swal.fire({
          title: "Medio creado correctamente",
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
      dispatch(onGetMediumError(error.response.data?.msg || "TypeAd error"));
      setTimeout(() => {
        dispatch(clearErrorMessageMedium());
      }, 20);
    }
  };

  return {
    mediumStore,
    createMedium,
  };
};
