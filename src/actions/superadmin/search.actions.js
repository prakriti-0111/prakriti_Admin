import axios from 'actions/axios';
import {objectToQuery} from 'src/helpers/helper';

export const getSearchResult = (params) => {
    params = objectToQuery(params, true)
    return axios.get(`/superadmin/search${params}`)
}
