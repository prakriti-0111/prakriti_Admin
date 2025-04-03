import axios from 'actions/axios';
import {
    SUPERADMIN_MY_PERFORMANCE_GET
} from '../../actionTypes/superadmin/my_performance.types';
import {objectToQuery} from 'src/helpers/helper';


export const getMyPerformance = (params) => {
    params = objectToQuery(params, true);
    return axios.get(`/superadmin/my-performance${params}`)
}