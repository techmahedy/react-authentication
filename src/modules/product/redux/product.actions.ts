import { AxiosAuthInstance } from "../../../config/api/auth.axios";
import { store } from "../../../config/redux/store";
import { snackBarAlert } from "../../../redux/alert/alert.action";
import { ProductTypes } from "./product.types";

export const productGetRequestAction = () => async (dispatch: any) => {
  dispatch({
    type: ProductTypes.PRODUCT_ACTION_START,
  });
  await AxiosAuthInstance.get("/products").then(
    (res: any) => {
      dispatch({
        type: ProductTypes.PRODUCT_GET_SUCCESS,
        payload: res?.data,
      });
      dispatch({
        type: ProductTypes.PRODUCT_ACTION_END,
      });
    },
    (error: any) => {
      dispatch({
        type: ProductTypes.PRODUCT_GET_FAILED,
        payload: error,
      });
      dispatch({
        type: ProductTypes.PRODUCT_ACTION_END,
      });
    }
  );
};


export const productDeleteRequestAction = (id: any) => async (
  dispatch: any
) => {
  dispatch({
    type: ProductTypes.PRODUCT_ACTION_START,
  });
  await AxiosAuthInstance.delete(`/product/${id}`).then(
    (res: any) => {
      dispatch({
        type: ProductTypes.PRODUCT_DELETE_SUCCESS,
        payload: res?.data,
      });
      dispatch({
        type: ProductTypes.PRODUCT_ACTION_END,
      });

      //! bad solution start
      localStorage.removeItem("error");
      //! bad solution end

      store.dispatch(
        snackBarAlert(
          res?.data?.message,
          "success",
          ProductTypes.PRODUCT_DELETE_SUCCESS
        )
      );
    },
    (error: any) => {
      dispatch({
        type: ProductTypes.PRODUCT_UPDATE_FAILED,
        payload: true,
      });
      dispatch({
        type: ProductTypes.PRODUCT_ACTION_END,
      });

      //! bad solution start
      localStorage.setItem("error", error);
      //! bad solution end

      store.dispatch(
        snackBarAlert(
          error?.response?.data?.error,
          "danger",
          ProductTypes.PRODUCT_UPDATE_FAILED
        )
      );
    }
  );
};


// export const categoryCreateAction = (formDate: any) => async (
//   dispatch: any
// ) => {
//   dispatch({
//     type: CategoryTypes.CATEGORY_ACTION_START,
//   });
//   await AxiosAuthInstance.post("/category", formDate).then(
//     (res: any) => {
//       dispatch({
//         type: CategoryTypes.CATEGORY_CREATE_SUCCESS,
//         payload: res?.data,
//       });
//       dispatch({
//         type: CategoryTypes.CATEGORY_ACTION_END,
//       });
//       //! bad solution start
//       localStorage.removeItem("error");
//       //! bad solution end
//       store.dispatch(
//         snackBarAlert(
//           res?.data?.message,
//           "success",
//           CategoryTypes.CATEGORY_CREATE_SUCCESS
//         )
//       );
//     },
//     (error: any) => {
//       dispatch({
//         type: CategoryTypes.CATEGORY_CREATE_FAILED,
//         payload: true,
//       });
//       dispatch({
//         type: CategoryTypes.CATEGORY_ACTION_END,
//       });
//       //! bad solution start
//       localStorage.setItem("error", error);
//       //! bad solution end
//       store.dispatch(
//         snackBarAlert(
//           error?.response?.data?.error,
//           "danger",
//           CategoryTypes.CATEGORY_CREATE_FAILED
//         )
//       );
//     }
//   );
// };

// export const categoryGetByIdAction = (id: any) => async (dispatch: any) => {
//   dispatch({
//     type: CategoryTypes.CATEGORY_ACTION_START,
//   });
//   await AxiosAuthInstance.get(`/category/${id}`).then(
//     (res: any) => {
//       dispatch({
//         type: CategoryTypes.CATEGORY_GET_BY_ID_SUCCESS,
//         payload: res?.data,
//       });
//       dispatch({
//         type: CategoryTypes.CATEGORY_ACTION_END,
//       });
//     },
//     (error: any) => {
//       dispatch({
//         type: CategoryTypes.CATEGORY_GET_BY_ID_FAILED,
//         payload: error,
//       });
//       dispatch({
//         type: CategoryTypes.CATEGORY_ACTION_END,
//       });
//     }
//   );
// };

// export const categoryGetByIdForVaultAction = (id: any) => async (dispatch: any) => {
//   dispatch({
//     type: CategoryTypes.CATEGORY_ACTION_START,
//   });
//   await AxiosAuthInstance.get(`/category/${id}`).then(
//     (res: any) => {
//       dispatch({
//         type: CategoryTypes.CATEGORY_GET_BY_ID_FOR_VAULT_SUCCESS,
//         payload: res?.data,
//       });
//       dispatch({
//         type: CategoryTypes.CATEGORY_ACTION_END,
//       });
//     },
//     (error: any) => {
//       dispatch({
//         type: CategoryTypes.CATEGORY_GET_BY_ID_FOR_VAULT_FAILED,
//         payload: error,
//       });
//       dispatch({
//         type: CategoryTypes.CATEGORY_ACTION_END,
//       });
//     }
//   );
// };

// export const categoryUpdateAction = (id: any, formData: any) => async (
//   dispatch: any
// ) => {
//   dispatch({
//     type: CategoryTypes.CATEGORY_ACTION_START,
//   });
//   await AxiosAuthInstance.put(`/category/${id}`, formData).then(
//     (res: any) => {
//       dispatch({
//         type: CategoryTypes.CATEGORY_UPDATE_SUCCESS,
//         payload: res?.data,
//       });
//       dispatch({
//         type: CategoryTypes.CATEGORY_ACTION_END,
//       });

//       //! bad solution start
//       localStorage.removeItem("error");
//       //! bad solution end

//       store.dispatch(
//         snackBarAlert(
//           res?.data?.message,
//           "success",
//           CategoryTypes.CATEGORY_UPDATE_SUCCESS
//         )
//       );
//     },
//     (error: any) => {
//       dispatch({
//         type: CategoryTypes.CATEGORY_UPDATE_FAILED,
//         payload: true,
//       });
//       dispatch({
//         type: CategoryTypes.CATEGORY_ACTION_END,
//       });

//       //! bad solution start
//       localStorage.setItem("error", error);
//       //! bad solution end

//       store.dispatch(
//         snackBarAlert(
//           error?.response?.data?.error,
//           "danger",
//           CategoryTypes.CATEGORY_UPDATE_FAILED
//         )
//       );
//     }
//   );
// };
