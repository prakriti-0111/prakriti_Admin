import axios from "actions/axios";
import {
  SUPERADMIN_LIST_ADMIN,
  SUPERADMIN_ADD_ADMIN,
  SUPERADMIN_GET_ADMIN,
  SUPERADMIN_UPDATE_ADMIN,
  SUPERADMIN_DELETE_ADMIN,
} from "../../actionTypes/superadmin/admin.types";
import { objectToQuery, isAdmin } from "src/helpers/helper";

const getApiPrefix = () => {
  return isAdmin() ? "/admin" : "/superadmin";
};

export const adminList = (params) => {
  params = objectToQuery(params, true);
  return (dispatch) => {
    axios
      .get(`${getApiPrefix()}/admin${params}`)
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: SUPERADMIN_LIST_ADMIN,
            payload: response.data.data,
          });
        }
      })
      .catch((error) => {});
  };
};

export const adminCreate = (data) => {
  return (dispatch) => {
    axios
      .post(`${getApiPrefix()}/admin/store`, data)
      .then((response) => {
        dispatch({
          type: SUPERADMIN_ADD_ADMIN,
          payload: response.data,
        });
      })
      .catch((error) => {});
  };
};

export const adminFetch = (id) => {
  return (dispatch) => {
    axios
      .get(`${getApiPrefix()}/admin/fetch/${id}`)
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: SUPERADMIN_GET_ADMIN,
            payload: response.data.data,
          });
        }
      })
      .catch((error) => {});
  };
};

export const adminUpdate = (id, data) => {
  return (dispatch) => {
    axios
      .post(`${getApiPrefix()}/admin/update/${id}`, data)
      .then((response) => {
        dispatch({
          type: SUPERADMIN_UPDATE_ADMIN,
          payload: response.data,
        });
      })
      .catch((error) => {});
  };
};

export const adminDelete = (id, data) => {
  return (dispatch) => {
    axios
      .delete(`${getApiPrefix()}/admin/delete/${id}`, data)
      .then((response) => {
        dispatch({
          type: SUPERADMIN_DELETE_ADMIN,
          payload: response.data,
        });
      })
      .catch((error) => {});
  };
};
