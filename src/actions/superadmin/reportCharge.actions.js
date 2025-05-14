import axios from 'actions/axios';
import {
    GET_REPORT_CHARGE,
    UPDATE_REPORT_CHARGE,
} from '../../actionTypes/superadmin/reportCharge.types';
import {objectToQuery} from 'src/helpers/helper';

export const reportChargeFetch = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/report-charge${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: GET_REPORT_CHARGE,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const reportChargeFetchRaw = (params) => {
    params = objectToQuery(params, true);
    return axios.get(`/superadmin/report-charge${params}`);
}

export const reportChargeUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/superadmin/report-charge/update/${id}`, data)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: UPDATE_REPORT_CHARGE,
                    payload: response.data
                });
            }
        })
        .catch(error => {
        })
    }
}