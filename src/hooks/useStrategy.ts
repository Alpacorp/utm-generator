import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { apiStrategy } from "../api/apiStrategy";
import {
  clearErrorMessageStrategy,
  onCheckingStrategy,
  onGetStrategyError,
  onGetStrategySuccess,
} from "../store";

export const useStrategy = () => {
  const dispatch = useDispatch();

  const strategyStore = async () => {
    dispatch(onCheckingStrategy());

    try {
      const { data } = await apiStrategy.get("/strategy/strategy");
      dispatch(onGetStrategySuccess(data));
    } catch (error: any) {
      console.log("error", error);
      dispatch(
        onGetStrategyError(error.response.data?.msg || "Strategy error")
      );
      setTimeout(() => {
        dispatch(clearErrorMessageStrategy());
      }, 20);
    }
  };

  const createStrategy = async ({ name, shortname }: any) => {
    dispatch(onCheckingStrategy());

    try {
      await apiStrategy.post("/strategy/new", {
        name,
        shortname,
      });
      setTimeout(() => {
        Swal.fire({
          title: "Estrategia creada correctamente",
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
        onGetStrategyError(error.response.data?.msg || "Strategy error")
      );
      Swal.fire({
        title: error.response.data?.msg || "Strategy error",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      setTimeout(() => {
        dispatch(clearErrorMessageStrategy());
      }, 20);
    }
  };

  const updateStrategy = async (id: string, data: any) => {
    dispatch(onCheckingStrategy());

    try {
      await apiStrategy.put(`/strategy/${id}`, data);
    } catch (error: any) {
      console.log("error", error);
      dispatch(
        onGetStrategyError(error.response.data?.msg || "Strategy error")
      );
      Swal.fire({
        title: error.response.data?.msg || "Strategy error",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      setTimeout(() => {
        dispatch(clearErrorMessageStrategy());
      }, 20);
    }
  };

  const deleteStrategy = async (id: string) => {
    dispatch(onCheckingStrategy());

    try {
      await apiStrategy.delete(`/strategy/${id}`);
    } catch (error: any) {
      console.log("error", error);
      dispatch(
        onGetStrategyError(error.response.data?.msg || "Strategy error")
      );
      setTimeout(() => {
        dispatch(clearErrorMessageStrategy());
      }, 20);
    }
  };

  return {
    strategyStore,
    createStrategy,
    updateStrategy,
    deleteStrategy,
  };
};
