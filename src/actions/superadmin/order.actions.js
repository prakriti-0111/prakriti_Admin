import axios from 'actions/axios';
import {
    SUPERADMIN_LIST_ORDERS,
    SUPERADMIN_ADD_ORDERS,
    SUPERADMIN_GET_ORDERS,
    SUPERADMIN_CANCEL_ORDER
} from '../../actionTypes/superadmin/orders.types';
import {objectToQuery, isAdmin, isSalesExecutive} from 'src/helpers/helper';

/* stock requests live under each role's own prefix */
const stockRequestBase = () => isAdmin() ? '/admin' : isSalesExecutive() ? '/sales-executive' : '/superadmin';

/* an admin handles its own orders through its own routes (the API checks the
   order is that admin's); everyone else uses the super admin's */
const orderFetchUrl = (id) => isAdmin() ? `/admin/orders/view/${id}` : `/superadmin/orders/fetch/${id}`;
const orderActionBase = () => isAdmin() ? '/admin/orders' : '/superadmin/orders';

export const orderList = (params) => {
    params = objectToQuery(params, true)
    return (dispatch) => {
        axios.get(`/superadmin/orders${params}`)
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_LIST_ORDERS,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}


export const orderView = (id) => {
    return (dispatch) => {
        axios.get(orderFetchUrl(id))
        .then(response => {
            if(response.data.success){
                dispatch({
                    type: SUPERADMIN_GET_ORDERS,
                    payload: response.data.data
                });
            }
        })
        .catch(error => {
        })
    }
}

export const orderViewRaw = (id) => {
    return axios.get(orderFetchUrl(id))
}

export const orderCancel = (id) => {
    return (dispatch) => {
        axios.post(`/admin/superadmin/cancel-order/${id}`)
        .then(response => {
            dispatch({
                type: SUPERADMIN_CANCEL_ORDER,
                payload: response.data
            });
        })
        .catch(error => {
        })
    }
}

export const getAllUsers = (params) => {
    params = objectToQuery(params, true);
    return axios.get(`/superadmin/user-list${params}`);
}

export const orderUpdateStatus = (id, data) => {
    return axios.post(`${orderActionBase()}/update-status/${id}`, data)
}

export const orderSaleProceed = (id, data) => {
    return axios.post(`${orderActionBase()}/sale-proceed/${id}`, data)
}

export const updateOrderProducts = (data) => {
    return axios.post(`${orderActionBase()}/update-products`, data)
}

/* assign an order to an SE - by whoever handles it (the API checks) */
export const orderAssign = (id, data) => {
    return axios.post(`${orderActionBase()}/assign/${id}`, data)
}

/* SEs this user may assign to (the list is scoped by role on the API) */
export const assignableSalesExecutives = () => {
    return axios.get(`/superadmin/employees?all=1&role_id=4`)
}

/* admin: an SE's stock transfer request on this order */
export const orderStockRequestForAdmin = (id) => {
    return axios.get(`${stockRequestBase()}/orders/${id}/stock-request`)
}

/* admin: put the requested pieces in its cart, to sell them to the SE */
export const stockRequestAddToCart = (requestId) => {
    return axios.post(`${stockRequestBase()}/stock-requests/${requestId}/add-to-cart`)
}

/* admin: the stock requests its SEs sent it */
export const stockRequestList = (params) => {
    return axios.get(`${stockRequestBase()}/stock-requests${objectToQuery(params, true)}`)
}

/* admin: ask another admin, or the super admin, for selected items they hold */
export const stockRequestFromHolder = (orderId, holderId, orderProductIds) => {
    return axios.post(`${stockRequestBase()}/orders/${orderId}/stock-request/holder`, { holder_id: holderId, order_product_ids: orderProductIds })
}
