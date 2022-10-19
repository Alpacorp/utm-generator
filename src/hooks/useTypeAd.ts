import { useDispatch, useSelector } from "react-redux";
import { apiTypeAd } from "../api/apiTypeAd";
import {
  clearErrorMessageTypeAd,
  onCheckingTypeAd,
  onGetTypeAdError,
  onGetTypeAdSuccess,
} from "../store";

export const useTypeAd = () => {
  const { status, typeAd, errorMessage } = useSelector(
    (state: any) => state.typeAd
  );

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

  return {
    typeAdStore,
  };
};
