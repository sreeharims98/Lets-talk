import { store } from "../store";
import { setError } from "../store/common/commonSlice";

export const handleCommonError = (msg: string) => {
  store.dispatch(setError(msg));
};
