import axios from 'actions/axios';
import {
    ADMIN_LIST_SUB_CATEGORY
} from '../../actionTypes/admin/subCategory.types';
import {objectToQuery} from 'src/helpers/helper';

export const subCategoryList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/admin/sub-categories${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({  
                    type: ADMIN_LIST_SUB_CATEGORY,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}
