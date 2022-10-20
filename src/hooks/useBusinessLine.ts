import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { apiBusiness } from "../api/apiBusiness";
import {
  clearErrorMessagebusiness,
  onCheckingbusiness,
  onGetbusinessError,
  onGetbusinessSuccess,
} from "../store";

export const useBusinessLine = () => {
  const dispatch = useDispatch();

  const businessLineStore = async () => {
    dispatch(onCheckingbusiness());

    try {
      const { data } = await apiBusiness.get("/businessline/businesslines");
      dispatch(onGetbusinessSuccess(data));
    } catch (error: any) {
      console.log("error", error);
      dispatch(
        onGetbusinessError(error.response.data?.msg || "BusinessLine error")
      );
      setTimeout(() => {
        dispatch(clearErrorMessagebusiness());
      }, 20);
    }
  };

  const createBusinessLine = async ({ name, shortname }: any) => {
    dispatch(onCheckingbusiness());

    try {
      await apiBusiness.post("/businessline/new", {
        name,
        shortname,
      });
      setTimeout(() => {
        Swal.fire({
          title: "Producto creado correctamente",
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
        onGetbusinessError(error.response.data?.msg || "BusinessLine error")
      );
      setTimeout(() => {
        dispatch(clearErrorMessagebusiness());
      }, 20);
    }
  };

  const updateBusinessLineStore = async (id: string, data: any) => {
    dispatch(onCheckingbusiness());

    try {
      await apiBusiness.put(`/businessline/${id}`, data);
    } catch (error: any) {
      console.log("error", error);
      dispatch(
        onGetbusinessError(error.response.data?.msg || "BusinessLine error")
      );
      setTimeout(() => {
        dispatch(clearErrorMessagebusiness());
      }, 20);
    }
  };

  const deleteBusinessLineStore = async (id: string) => {
    dispatch(onCheckingbusiness());

    try {
      await apiBusiness.delete(`/businessline/${id}`);
    } catch (error: any) {
      console.log("error", error);
      dispatch(
        onGetbusinessError(error.response.data?.msg || "BusinessLine error")
      );
      setTimeout(() => {
        dispatch(clearErrorMessagebusiness());
      }, 20);
    }
  };

  return {
    businessLineStore,
    createBusinessLine,
    updateBusinessLineStore,
    deleteBusinessLineStore,
  };
};
