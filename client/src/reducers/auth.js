
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
}


const authReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case 'USER_LOADED': 
            return {
                ...state,
                loading: false,
                user: payload,
                isAuthenticated: true
            }
        case 'REGISTER_SUCESS':
        case 'LOGIN_SUCESS':
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            }
        case 'LOGOUT':
        case 'AUTH_ERROR':
        case 'REGISTER_FAIL':
        case 'LOGIN_FAIL':
            localStorage.removeItem('token')
            return {
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }

        default:
            return state;
    }
}
export default authReducer