import {
    LIST_MATERIAL,
    ADD_MATERIAL,
    UPDATE_MATERIAL,
    DELETE_MATERIAL,
    RESET_MATERIAL_LIST,
    RESET_MATERIAL,
    SET_MATERIAL
} from '../../actionTypes/superadmin/material.types';

const initialState = {
    categories: [],
    units: [],
    purities: [],
    items: [],
    total: 0,
    actionCalled: false,
    createSuccess: false,
    deleteSuccess: false,
    editSuccess: false,
    successMessage: null,
    errorMessage: null,
    material: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LIST_MATERIAL:
            return {
                ...state,
                ...payload
            }
        case ADD_MATERIAL:
            return {
                ...state,
                actionCalled: true,
                createSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
                material: payload.data
            }
        case UPDATE_MATERIAL:
            return {
                ...state,
                actionCalled: true,
                editSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case DELETE_MATERIAL:
            return {
                ...state,
                actionCalled: true,
                deleteSuccess: payload.success,
                successMessage: payload.success ? payload.message : null,
                errorMessage: !payload.success ? payload.message : null,
            }
        case RESET_MATERIAL_LIST:
            return {
                ...state,
                items: [],
                total: 0
            }
        case RESET_MATERIAL:
            return {
                ...state,
                actionCalled: false,
                createSuccess: false,
                deleteSuccess: false,
                editSuccess: false,
                successMessage: null,
                errorMessage: null
            }
        case SET_MATERIAL:
            return {
                ...state,
                material: payload
            }
        default:
            return state;
    }
}