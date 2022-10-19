import { useDispatch, useSelector } from "react-redux";
import { apiSourceMedia } from "../api/apiSourceMedia";
import {
  clearErrorMessageSourceMedia,
  onCheckingSourceMedia,
  onGetSourceMediaError,
  onGetSourceMediaSuccess,
} from "../store";

export const useSourceMedia = () => {
  const { status, typeAd, errorMessage } = useSelector(
    (state: any) => state.typeAd
  );

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

  return {
    sourceMediaStore,
  };
};
