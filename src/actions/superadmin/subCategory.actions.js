import axios from "actions/axios";
import {
  LIST_SUB_CATEGORY,
  ADD_SUB_CATEGORY,
  UPDATE_SUB_CATEGORY,
  DELETE_SUB_CATEGORY,
} from "../../actionTypes/superadmin/subCategory.types";
import {
  LIST_SIZE,
  ADD_SIZE,
  GET_SIZE,
  UPDATE_SIZE,
  DELETE_SIZE,
} from "../../actionTypes/superadmin/size.types";
import { objectToQuery } from "src/helpers/helper";

export const subCategoryList = (params) => {
  params = objectToQuery(params, true);
  return (dispatch) => {
    axios
      .get(`/superadmin/sub-categories${params}`)
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: LIST_SUB_CATEGORY,
            payload: response.data.data,
          });
        }
      })
      .catch((error) => {});
  };
};

export const subCategoryCreate = (data) => {
  return (dispatch) => {
    axios
      .post("/superadmin/sub-categories/store", data)
      .then((response) => {
        dispatch({
          type: ADD_SUB_CATEGORY,
          payload: response.data,
        });
      })
      .catch((error) => {});
  };
};

export const subCategoryUpdate = (id, data) => {
  return (dispatch) => {
    axios
      .post(`/superadmin/sub-categories/update/${id}`, data)
      .then((response) => {
        dispatch({
          type: UPDATE_SUB_CATEGORY,
          payload: response.data,
        });
      })
      .catch((error) => {});
  };
};

export const subCategoryDelete = (id, data) => {
  return (dispatch) => {
    axios
      .delete(`/superadmin/sub-categories/delete/${id}`, data)
      .then((response) => {
        dispatch({
          type: DELETE_SUB_CATEGORY,
          payload: response.data,
        });
      })
      .catch((error) => {});
  };
};
export const sizeCreate = (data) => {
  return (dispatch) => {
    axios
      .post("/superadmin/sizes/store", data)
      .then((response) => {
        dispatch({
          type: ADD_SIZE,
          payload: response.data,
        });
      })
      .catch((error) => {});
  };
};

export const sizeFetch = (id) => {
  return (dispatch) => {
    axios
      .get(`/superadmin/sizes/fetch/${id}`)
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: GET_SIZE,
            payload: response.data.data,
          });
        }
      })
      .catch((error) => {});
  };
};

export const sizeUpdate = (id, data) => {
  return (dispatch) => {
    axios
      .post(`/superadmin/sizes/update/${id}`, data)
      .then((response) => {
        dispatch({
          type: UPDATE_SIZE,
          payload: response.data,
        });
      })
      .catch((error) => {});
  };
};

export const sizeDelete = (id, data) => {
  return (dispatch) => {
    axios
      .delete(`/superadmin/sizes/delete/${id}`, data)
      .then((response) => {
        dispatch({
          type: DELETE_SIZE,
          payload: response.data,
        });
      })
      .catch((error) => {});
  };
};
export const sizeListRaw = (params) => {
  params = objectToQuery(params, true);
  return axios.get(`/superadmin/sizes${params}`);
};

export const subCategoryRawList = (params) => {
  params = objectToQuery(params, true);
  return axios.get(`/superadmin/sub-categories${params}`);
};
