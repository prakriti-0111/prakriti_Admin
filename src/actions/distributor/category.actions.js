import axios from 'actions/axios';
import {
    DISTRIBUTOR_LIST_CATEGORY
} from '../../actionTypes/distributor/category.types';
import {objectToQuery} from 'src/helpers/helper';

export const categoryList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/distributor/categories${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({  
                    type: DISTRIBUTOR_LIST_CATEGORY,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}