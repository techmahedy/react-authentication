
import AxiosWithOutAuthInstance from "../../../../config/api/withoutauth.axios";
import { store } from "../../../../config/redux/store";
import { snackBarAlert } from "../../../../redux/alert/alert.action";
import { LoginTypes } from "./login.types";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const loginAction = (formData: any) => async (dispatch: any) => {
  dispatch({
    type: LoginTypes.ACTION_START,
  });

  AxiosWithOutAuthInstance.post(`/signin`, formData).subscribe(
    (res: any) => {
      localStorage.setItem("token", res.data.headers.token);
      dispatch({
        type: LoginTypes.LOGIN_SUCCESS,
        payload: res.data,
      });
      toast(res?.data?.message);
      dispatch({
        type: LoginTypes.ACTION_END,
      });
    },
    (error: any) => {
      dispatch({
        type: LoginTypes.LOGIN_FAILED,
        payload: error,
      });
      dispatch({
        type: LoginTypes.ACTION_END,
      });
      toast(error?.response?.data?.error);
        
    }
  );
};
