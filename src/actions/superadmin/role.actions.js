import axios from 'actions/axios';
import {
    SUPERADMIN_LIST_ROLE,
    SUPERADMIN_ADD_ROLE,
    SUPERADMIN_GET_ROLE,
    SUPERADMIN_UPDATE_ROLE,
    SUPERADMIN_DELETE_ROLE,
} from '../../actionTypes/superadmin/role.types';
import {objectToQuery} from 'src/helpers/helper';

export const roleList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/roles${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({  
                    type: SUPERADMIN_LIST_ROLE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const roleCreate = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/roles/store", data)
        .then(response => {
            dispatch({
                type: SUPERADMIN_ADD_ROLE,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }

}


export const roleFetch = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/roles/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_GET_ROLE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const roleUpdate = (id, data) => { 
    return (dispatch) => {
        axios.post(`/superadmin/roles/update/${id}`, data)
        .then(response => { 
            dispatch({
                type: SUPERADMIN_UPDATE_ROLE,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const roleDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/roles/delete/${id}`, data)
        .then(response => {
            dispatch({
                type: SUPERADMIN_DELETE_ROLE,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const rolePermission = (id) => {
    return axios.get(`/superadmin/permissions?role_id=${id}`)
}

export const rolePermissionUpdate = (data) => {
    return axios.post(`/superadmin/permissions/update`, data)
}