import axios from 'actions/axios';
import {
    ADMIN_LIST_CATEGORY
} from '../../actionTypes/admin/category.types';
import {objectToQuery} from 'src/helpers/helper';

export const categoryList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/admin/categories${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({  
                    type: ADMIN_LIST_CATEGORY,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}