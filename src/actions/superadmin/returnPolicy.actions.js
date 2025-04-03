import axios from 'actions/axios';
import {
    LIST_RETURN_POLICY,
    ADD_RETURN_POLICY,
    UPDATE_RETURN_POLICY,
    DELETE_RETURN_POLICY,
} from '../../actionTypes/superadmin/returnPolicy.types';
import {objectToQuery} from 'src/helpers/helper';

export const returnPolicyList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/return-policy${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({  
                    type: LIST_RETURN_POLICY,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const returnPolicyCreate = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/return-policy/store", data)
        .then(response => {
            dispatch({
                type: ADD_RETURN_POLICY,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const returnPolicyUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/superadmin/return-policy/update/${id}`, data)
        .then(response => { 
            dispatch({
                type: UPDATE_RETURN_POLICY,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const returnPolicyDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/return-policy/delete/${id}`, data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: DELETE_RETURN_POLICY,
                    payload: response.data
                });
            }
        })
        .catch(error => {
        })
    }
}