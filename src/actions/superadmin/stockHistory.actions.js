import axios from 'actions/axios';
import {objectToQuery} from 'src/helpers/helper';

export const stocksHistoryList = (params) => {
    params = objectToQuery(params, true)
    return axios.get(`/superadmin/stock-material-history${params}`)
}

export const stocksHistoryStore = (data) => {
    return axios.post(`/superadmin/stock-material-history/store`, data)
}

export const stocksHistoryStoreByProduct = (data) => {
    return axios.post(`/superadmin/stock-material-history/store-by-product`, data)
}

export const stocksHistoryStatusUpdate = (id, data) => {
    return axios.post(`/superadmin/stock-material-history/status-update/${id}`, data)
}
