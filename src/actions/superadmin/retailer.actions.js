import axios from 'actions/axios';
import {
    SUPERADMIN_LIST_RETAILER,
    SUPERADMIN_ADD_RETAILER,
    SUPERADMIN_GET_RETAILER,
    SUPERADMIN_UPDATE_RETAILER,
    SUPERADMIN_DELETE_RETAILER,
    SUPERADMIN_LIST_RETAILER_REVIEW
} from '../../actionTypes/superadmin/retailer.types';
import {objectToQuery} from 'src/helpers/helper';

export const retailerList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/retailers${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_LIST_RETAILER,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const retailerCreate = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/retailers/store", data)
        .then(response => {
                dispatch({
                    type: SUPERADMIN_ADD_RETAILER,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}

export const retailerFetch = (id) => {
    return (dispatch) => {
        axios.get(`/superadmin/retailers/fetch/${id}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_GET_RETAILER,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const retailerUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/superadmin/retailers/update/${id}`, data)
        .then(response => {
                dispatch({
                    type: SUPERADMIN_UPDATE_RETAILER,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}

export const retailerDelete = (id, data) => {
    return (dispatch) => {
        axios.delete(`/superadmin/retailers/delete/${id}`, data)
        .then(response => {
                dispatch({
                    type: SUPERADMIN_DELETE_RETAILER,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}

export const retailerReviewStore = (data) => {
    return (dispatch) => {
        axios.post("/superadmin/retailers/reviews/store", data)
        .then(response => {
                dispatch({
                    type: SUPERADMIN_ADD_RETAILER,
                    payload: response.data
                });
        })
        .catch(error => {
        })
    }
}

export const retailerReviewList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/retailers/reviews${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_LIST_RETAILER_REVIEW,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const retailerReviewUpdate = (id, data) => {
    return (dispatch) => {
        axios.post(`/superadmin/retailers/review/update/${id}`, data)
        .then(response => {
            dispatch({
                type: SUPERADMIN_UPDATE_RETAILER,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}


export const retailerMyReview = (id, data) => {
    return axios.get(`/superadmin/retailers/my-review/${id}`);
}