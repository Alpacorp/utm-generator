import { useDispatch, useSelector } from "react-redux";
import { apiBusiness } from "../api/apiBusiness";
import {
  clearErrorMessagebusiness,
  onCheckingbusiness,
  onGetbusinessError,
  onGetbusinessSuccess,
} from "../store";

export const useBusinessLine = () => {
  const { status, businessLine, errorMessage } = useSelector(
    (state: any) => state.businessLine
  );

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

  return {
    businessLineStore,
  };
};
