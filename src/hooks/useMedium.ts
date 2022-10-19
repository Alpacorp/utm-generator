import { useDispatch, useSelector } from "react-redux";
import { apiMedium } from "../api/apiMedium";
import {
  clearErrorMessageMedium,
  onCheckingMedium,
  onGetMediumError,
  onGetMediumSuccess,
} from "../store";

export const useMedium = () => {
  const { status, typeAd, errorMessage } = useSelector(
    (state: any) => state.typeAd
  );

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

  return {
    mediumStore,
  };
};
