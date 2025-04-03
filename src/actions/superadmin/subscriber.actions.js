import axios from 'actions/axios';
import {objectToQuery} from 'src/helpers/helper';

export const subscriberList = (params) => {
    params = objectToQuery(params, true)
    return axios.get(`/superadmin/subscribers${params}`);
}
