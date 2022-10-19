import { useDispatch, useSelector } from "react-redux";
import { apiChannelType } from "../api/apiChannelType";
import {
  clearErrorMessageChannelType,
  onCheckingChannelType,
  onGetChannelTypeError,
  onGetChannelTypeSuccess,
} from "../store";

export const useChannelType = () => {
  const { status, typeAd, errorMessage } = useSelector(
    (state: any) => state.typeAd
  );

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

  return {
    channelTypeStore,
  };
};
