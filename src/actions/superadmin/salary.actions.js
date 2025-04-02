import axios from 'actions/axios';
import {objectToQuery} from 'src/helpers/helper';

export const salaryList = (params) => {
    params = objectToQuery(params, true)
    return axios.get(`/superadmin/salary${params}`)
}

export const salaryCreate = (data) => {
    return axios.post("/superadmin/salary/store", data)
}

export const salaryAdvancePay = (data) => {
    return axios.post("/superadmin/salary/advance-store", data)
}

export const salaryHistory = (id) => {
    return axios.get("/superadmin/salary/history/" + id)
}

export const salaryPay = (data) => {
    return axios.post("/superadmin/salary/pay", data)
}

export const salaryDownload = (id) => {
    return axios.post("/superadmin/salary/download/" + id)
}

export const salaryEmployeeList = (params) => {
    params = objectToQuery(params, true)
    return axios.get(`/superadmin/salary-employees${params}`)
}