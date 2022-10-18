import { useDispatch, useSelector } from "react-redux";
import { apiStrategy } from "../api/apiStrategy";
import {
  clearErrorMessageStrategy,
  onCheckingStrategy,
  onGetStrategyError,
  onGetStrategySuccess,
} from "../store";

export const useStrategy = () => {
  const { status, strategy, errorMessage } = useSelector(
    (state: any) => state.strategy
  );

  const dispatch = useDispatch();

  const strategyStore = async () => {
    dispatch(onCheckingStrategy());

    try {
      const { data } = await apiStrategy.get("/strategy/strategy");
      console.log("response", data);
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

  return {
    strategyStore,
  };
};
