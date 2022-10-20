import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { apiChannelType } from "../api/apiChannelType";
import {
  clearErrorMessageChannelType,
  onCheckingChannelType,
  onGetChannelTypeError,
  onGetChannelTypeSuccess,
} from "../store";

export const useChannelType = () => {
  const dispatch = useDispatch();

  const channelTypeStore = async () => {
    dispatch(onCheckingChannelType());

    try {
      const { data } = await apiChannelType.get("/channel/channels");
      dispatch(onGetChannelTypeSuccess(data));
    } catch (error: any) {
      console.log("error", error);
      dispatch(
        onGetChannelTypeError(error.response.data?.msg || "TypeAd error")
      );
      setTimeout(() => {
        dispatch(clearErrorMessageChannelType());
      }, 20);
    }
  };

  const createChannelType = async (channel: any) => {
    dispatch(onCheckingChannelType());

    try {
      await apiChannelType.post("/channel/new", channel);
      setTimeout(() => {
        Swal.fire({
          title: "Tipo de canal creado correctamente",
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
        onGetChannelTypeError(error.response.data?.msg || "TypeAd error")
      );
      setTimeout(() => {
        dispatch(clearErrorMessageChannelType());
      }, 20);
    }
  };

  const updateChannelType = async (id: string, data: any) => {
    dispatch(onCheckingChannelType());

    try {
      await apiChannelType.put(`/channel/${id}`, data);
    } catch (error: any) {
      console.log("error", error);
      dispatch(
        onGetChannelTypeError(error.response.data?.msg || "TypeAd error")
      );
      setTimeout(() => {
        dispatch(clearErrorMessageChannelType());
      }, 20);
    }
  };

  const deleteChannelType = async (id: string) => {
    dispatch(onCheckingChannelType());

    try {
      await apiChannelType.delete(`/channel/${id}`);
    } catch (error: any) {
      console.log("error", error);
      dispatch(
        onGetChannelTypeError(error.response.data?.msg || "TypeAd error")
      );
      setTimeout(() => {
        dispatch(clearErrorMessageChannelType());
      }, 20);
    }
  };

  return {
    channelTypeStore,
    createChannelType,
    updateChannelType,
    deleteChannelType,
  };
};
