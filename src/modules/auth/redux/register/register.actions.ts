import AxiosWithOutAuthInstance from "../../../../config/api/withoutauth.axios";
import { RegisterTypes } from "./register.types";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const registerAction = (formData: any) => async (dispatch: any) => {

  dispatch({
    type: RegisterTypes.ACTION_START,
  });
  AxiosWithOutAuthInstance.post("/signup", formData).subscribe(
    (res: any) => {
      dispatch({
        type: RegisterTypes.REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: RegisterTypes.ACTION_END,
      });
      toast(res?.data?.message);
    },
    (error: any) => {
      dispatch({
        type: RegisterTypes.REGISTER_FAILED,
        payload: error,
      });
      dispatch({
        type: RegisterTypes.ACTION_END,
      });
      toast(error?.response?.data?.error);
    }
  );
};
