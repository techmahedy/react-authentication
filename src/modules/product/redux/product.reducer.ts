import { ProductTypes } from "./product.types";

const INITIAL_STATE = {
  data: "",
  error: "",
  loading: false
};

const productReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case ProductTypes.PRODUCT_ACTION_START:
      return {
        ...state,
        loading: true,
      };
    case ProductTypes.PRODUCT_GET_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: "",
      };
    case ProductTypes.PRODUCT_GET_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case ProductTypes.PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: "",
      };
    case ProductTypes.PRODUCT_CREATE_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case ProductTypes.PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: "",
      };
    case ProductTypes.PRODUCT_DELETE_SUCCESS:
        return {
          ...state,
          data: action.payload,
          error: "",
      };
    case ProductTypes.PRODUCT_UPDATE_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case ProductTypes.PRODUCT_DELETE_FAILED:
      return {
        ...state,
        error: action.payload,
    };
    case ProductTypes.PRODUCT_GET_BY_ID_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case ProductTypes.PRODUCT_GET_BY_ID_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case ProductTypes.PRODUCT_ACTION_END:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default productReducer;
