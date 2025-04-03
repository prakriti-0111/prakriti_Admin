import axios from 'actions/axios';
import {
    DISTRIBUTOR_LIST_SUB_CATEGORY
} from '../../actionTypes/distributor/subCategory.types';
import {objectToQuery} from 'src/helpers/helper';

export const subCategoryList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/distributor/sub-categories${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({  
                    type: DISTRIBUTOR_LIST_SUB_CATEGORY,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}
