import _, { isArray } from 'lodash';
import secureLocalStorage from "react-secure-storage";

/**
 * get auth token
 */
const getAuthData = (key, fromUser) => {
    let data = '';
    try {
        let auth = secureLocalStorage.getItem('auth');
        if (auth) {
            auth = JSON.parse(auth);
            if (fromUser) {
                const user = auth.user;
                data = key in user ? user[key] : '';
            } else {
                data = key in auth ? auth[key] : '';
            }

        }
    } catch (err) { }
    return data;
}

/**
 * get query params from object
 */
const objectToQuery = (obj, addQuestion) => {
    return obj ? (addQuestion ? '?' : '') + Object.keys(obj).map(key => key + '=' + obj[key]).join('&') : '';
}

/**
 * Get dashboard page route by role name
 */
const getUserDashboardRoute = (roleName) => {
    if (roleName == 'Super Admin') {
        return '/super-admin';
    } else if (roleName == 'Distributor') {
        return '/distributor';
    } else if (roleName == 'Admin') {
        return '/admin';
    } else if (roleName == 'Sales Executive') {
        return '/sales-executive';
    } else if (!isEmpty(roleName)) {
        return '/employee';
    }

    return '/';
}

/**
 * convert obj to formdata
 */
const convertToFormData = (data, formData, parentKey) => {
    if (data === null || data === undefined) return null;
    formData = formData || new FormData();
    if (typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
        Object.keys(data).forEach(key =>
            convertToFormData(data[key], formData, (!parentKey ? key : (data[key] instanceof File ? parentKey : `${parentKey}[${key}]`)))
        );
    } else {
        formData.append(parentKey, data);
    }

    return formData;
}

/**
 * Convert file to base64
 */
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

/**
 * get only values from array by specefic column
 */
const getValuesFromKey = (arr, col) => {
    let a = [];
    for (let i = 0; i < arr.length; i++) {
        a.push(arr[i][col]);
    }
    return a;
}

const isEmpty = (value) => {
    return (
        // null or undefined
        (value == null) ||

        // 0 value
        //(value == 0) || 

        // has length and it's zero
        (value.hasOwnProperty('length') && value.length === 0) ||

        // is an Object and has no keys
        (value.constructor === Object && Object.keys(value).length === 0)
    )
}

const getNewlineText = (text) => {
    return text.split('\n').map((str, i) => <p className={"mb-0" + (i == 0 ? " mt-0" : " mt-3")} key={i} dangerouslySetInnerHTML={{ __html: str }}></p>);
}

const priceFormat = (p, removeBlankZero) => {
    if (typeof p !== 'undefined' && p !== null && p != '') {
        p = parseFloat(p).toFixed(2);
        p = parseFloat(p);
    } else {
        p = 0.00;
    }
    if (removeBlankZero) {
        p = (p).toFixed(2).replace(/[.,]00$/, "");
        p = parseFloat(p);
    }
    return isNaN(p) ? 0 : p;
}
const weightFormat = (p) => {
    if (typeof p !== 'undefined' && p !== null) {
        p = parseFloat(p).toFixed(3);
        p = parseFloat(p);
    } else {
        p = 0.00;
    }
    p = (p).toFixed(3).replace(/[.,]000$/, "");
    p = parseFloat(p);
    return isNaN(p) ? 0 : p;
}

const calculateAdminProductPrice = (priceInfo, materials) => {
    let sub_total = 0, making_charge = 0;
    if (isEmpty(priceInfo)) {
        return null;
    }

    let materialPice = [], total_quantity = 0, total_weight = 0;
    for (let i = 0; i < materials.length; i++) {
        let m = _.filter(priceInfo.material_prices, { material_id: materials[i].material_id });
        if (m.length) {
            let p = _.filter(m[0].purities, { purity_id: materials[i].purity_id });
            if (p.length) {
                let total_gram = convertUnitToGram(materials[i].unit_name, materials[i].weight);
                materialPice.push({
                    rate: p[0].rate,
                    amount: priceFormat(p[0].discounted_price * total_gram, true)
                });
                sub_total += (p[0].discounted_price * total_gram);
                total_weight += total_gram;
                total_quantity += materials[i].quantity;
            }
        }
    }
    if (priceInfo.making_charge_type == "per_piece") {
        making_charge = priceFormat(priceInfo.making_charge, true);
    } else if (priceInfo.making_charge_type == "per_gram") {
        making_charge = priceFormat(total_weight * priceFormat(priceInfo.making_charge), true);
    }
    let result = {
        sub_total: priceFormat(sub_total, true),
        making_charge: priceFormat(making_charge, true),
        total_amount: priceFormat((sub_total + making_charge), true),
        materials_price: materialPice,
        total_weight: weightFormat(total_weight, true)
    };
    return result;
}

const convertToString = (x) => {
    return x.toString();
}

const calculateProductPrice = (weight, price, unit) => {
    if (isEmpty(weight) || isEmpty(price) || isEmpty(unit)) {
        return 0;
    }
    unit = unit.toLowerCase();
    let per_price = price;
    if (unit == "carat" || unit == "carats" || unit == "ct") {
        weight = parseFloat(weight) * 5; //convert to gram
        //per_price = parseFloat(price) / 5;
    } else if (unit == "ratti" || unit == "rati") {
        weight = parseFloat(weight) / 0.182; //convert to gram
        //per_price = parseFloat(price) * 0.182;
    } else if (unit == "cent") {
        weight = parseFloat(weight) * 500; //convert to gram
        //per_price = parseFloat(price) / 500;
    } else if (unit == "gram") {
        //per_price = parseFloat(price);
    }
    return priceFormat(parseFloat(weight) * parseFloat(per_price));

}

const convertPerGramPriceToPerUnit = (price, unit) => {
    if (isEmpty(price) || isEmpty(unit)) {
        return 0;
    }
    unit = unit.toLowerCase();
    if (unit == "carat" || unit == "carats" || unit == "ct") {
        price = parseFloat(price) / 5;
    } else if (unit == "ratti" || unit == "rati") {
        price = parseFloat(price) * 0.182;
    } else if (unit == "cent") {
        price = parseFloat(price) / 500;
    } else if (unit == "gram") {
        price = parseFloat(price);
    }
    return priceFormat(price);
}

const convertUnitToGram = (unit, weight) => {
    if (isEmpty(weight)) {
        return 0;
    }
    unit = unit.toLowerCase();
    if (unit == "carat" || unit == "carats" || unit == "ct") {
        return parseFloat(weight) / 5;
    } else if (unit == "ratti" || unit == "rati") {
        return parseFloat(weight) * 0.182;
    } else if (unit == "cent") {
        return parseFloat(weight) / 500;
    } else {
        return parseFloat(weight);
    }
}

const convertGramToUnit = (unit, weight) => {
    if (isEmpty(weight)) {
        return 0;
    }
    unit = unit.toLowerCase();
    if (unit == "carat" || unit == "carats" || unit == "ct") {
        return parseFloat(weight) * 5;
    } else if (unit == "ratti" || unit == "rati") {
        return parseFloat(weight) / 0.182;
    } else if (unit == "cent") {
        return parseFloat(weight) * 500;
    } else {
        return parseFloat(weight);
    }
}

const calculateGST = (taxinfo, amount, gst_no) => {
    if (isEmpty(taxinfo) || isEmpty(amount)) {
        return null;
    }

    let gst_type = "igst";
    if (!isEmpty(gst_no)) {
        let startingWith = gst_no.substring(0, 2);
        if (startingWith == "19") {
            gst_type = "cgst_sgst";
        }
    }

    if (gst_type == "igst") {
        let igst = (!isEmpty(taxinfo.igst)) ? priceFormat(amount * parseFloat(taxinfo.igst) / 100, true) : 0;
        return {
            igst: igst,
            cgst: 0,
            sgst: 0,
            total: igst,
            type: gst_type
        }
    } else {
        let cgst = (!isEmpty(taxinfo.cgst)) ? priceFormat(amount * parseFloat(taxinfo.cgst) / 100, true) : 0;
        let sgst = (!isEmpty(taxinfo.sgst)) ? priceFormat(amount * parseFloat(taxinfo.sgst) / 100, true) : 0;
        return {
            igst: 0,
            cgst: cgst,
            sgst: sgst,
            total: priceFormat((cgst + sgst), true),
            type: gst_type
        }
    }
}

const shortDescription = (str) => {
    if (!str) return str;
    return str.length > 60 ? str.substr(0, 60) + '...' : str;
}

const getRoleName = (auth) => {
    return ('user' in auth && auth.user && 'role_name' in auth.user) ? auth.user.role_name : '';
}

const displayAmount = (amount, currencyText, showCurrency) => {
    amount = amount === null ? 0 : amount;
    currencyText = currencyText === true ? 'Rs. ' : '₹ ';
    currencyText = showCurrency === false ? '' : currencyText;
    return currencyText + priceFormat(amount, true).toFixed(2);
}

const isSuperAdmin = () => {
    let role = getAuthData('role_name', true);
    return (role == "Super Admin" || (!isDistributor() && !isAdmin() && !isSalesExecutive()));
}

const isMainSuperAdmin = () => {
    let role = getAuthData('role_name', true);
    return (role == "Super Admin");
}
const isManager = () => {
    let role = getAuthData('role_name', true);
    return (role == "Manager");
}

const isEmployee = () => {
    return (isSuperAdmin() && !isMainSuperAdmin())
}

const isDistributor = () => {
    let role = getAuthData('role_name', true);
    return role == "Distributor";
}

const isAdmin = () => {
    let role = getAuthData('role_name', true);
    return role == "Admin";
}

const isSalesExecutive = () => {
    let role = getAuthData('role_name', true);
    return role == "Sales Executive";
}

const getApprovalColor = (status) => {
    if (status == 1 || status == 4) {
        return 'success';
    } else if (status == 2) {
        return 'error';
    } else {
        return 'warning';
    }
}

const getStatusColor = (status) => {
    if (status == 'Pending') {
        return 'warning';
    } else if (status == 'Cancelled' || status == 'superadmin_declined') {
        return 'error';
    } else {
        return 'success';
    }
}

const checkIsTokenExpired = (auth) => {
    try {
        let user = (auth && 'user' in auth && auth.user) ? auth.user : null;
        if (user && user.role_name == "Sales Executive") {
            if (!('expiresOn' in auth)) {
                return true;
            } else {
                if ('loginOn' in auth && auth.loginOn <= moment(moment().format('YYYY-MM-DD 10:59:59'), 'YYYY-MM-DD HH:mm:ss').toDate().getTime() && Date.now() > auth.expiresOn) {
                    return true;
                }
            }
        }
    } catch (error) { }
    return false;
}

const hasPermission = (permissions, name, key, checkSuperAdmin) => {
    if (checkSuperAdmin !== false) {
        if ((isMainSuperAdmin() || !isSuperAdmin()) && (!isDistributor() || (!['expense'].includes(name)))) {
            return true;
        } else if (isManager() && (['workers', 'stock_history'].includes(name))) {
            return true;
        }
    }
    if ((isEmpty(permissions) || !isArray(permissions))) {
        if (checkSuperAdmin !== false && (!isDistributor() || (!['expense'].includes(name)))) {
            return true;
        } else {
            return false;
        }
    } else {
        if (isArray(name)) {
            let _all = true;
            for (let i of name) {
                let p = _.filter(permissions, { name: i });
                if (!p.length) {
                    _all = false;
                    break;
                } else {
                    if (isArray(key)) {
                        for (let x of key) {
                            if (!p[0][x]) {
                                _all = false;
                            }
                        }
                    } else {
                        if (!p[0][key]) {
                            _all = false;
                        }
                    }
                }
            }
            return _all;
        } else {
            let p = _.filter(permissions, { name: name });
            if (!p.length) {
                return false;
            } else {
                let _all = true;
                if (isArray(key)) {
                    for (let x of key) {
                        if (!p[0][x]) {
                            _all = false;
                        }
                    }
                } else {
                    if (!p[0][key]) {
                        _all = false;
                    }
                }
                return _all;
            }
        }
    }
}

const ucWords = (text) => {
    return !text ? '' : text.replace(/(^\w|\s\w)(\S*)/g, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase());
}


export {
    getAuthData,
    objectToQuery,
    getUserDashboardRoute,
    convertToFormData,
    toBase64,
    getValuesFromKey,
    isEmpty,
    getNewlineText,
    calculateAdminProductPrice,
    priceFormat,
    convertToString,
    calculateProductPrice,
    convertUnitToGram,
    convertGramToUnit,
    calculateGST,
    shortDescription,
    getRoleName,
    displayAmount,
    weightFormat,
    convertPerGramPriceToPerUnit,
    isSuperAdmin,
    isDistributor,
    isAdmin,
    isSalesExecutive,
    checkIsTokenExpired,
    getApprovalColor,
    getStatusColor,
    hasPermission,
    isMainSuperAdmin,
    isEmployee,
    isManager,
    ucWords
}