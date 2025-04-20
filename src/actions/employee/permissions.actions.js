import axios from 'actions/axios';
import {
    EMPLOYEE_PERMISSIONS
} from '../../actionTypes/employee/permissions.types';

export const getPermissions = () => {
    return (dispatch) => {
        axios.get(`/employee/permissions`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: EMPLOYEE_PERMISSIONS,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}