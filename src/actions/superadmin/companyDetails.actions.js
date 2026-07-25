import axios from 'actions/axios';
import {
    LIST_COMPANY_DETAILS,
    UPDATE_COMPANY_DETAILS,
} from '../../actionTypes/superadmin/companyDetails.types';

export const companyDetailsList = () => {
    return (dispatch) => {
        axios.get(`/superadmin/company-details`)
            .then(response => {
                dispatch({
                    type: LIST_COMPANY_DETAILS,
                    payload: response.data.success ? response.data.data : {},
                });
            })
            .catch(() => {
                // dispatch empty so spinner stops
                dispatch({ type: LIST_COMPANY_DETAILS, payload: {} });
            });
    };
};

export const companyDetailsUpdate = (data) => {
    return (dispatch) => {
        axios.post(`/superadmin/company-details/update`, data)
            .then(response => {
                dispatch({ type: UPDATE_COMPANY_DETAILS, payload: response.data });
            })
            .catch(() => {
                dispatch({
                    type: UPDATE_COMPANY_DETAILS,
                    payload: { success: false, message: 'Something went wrong. Please try again.' },
                });
            });
    };
};
