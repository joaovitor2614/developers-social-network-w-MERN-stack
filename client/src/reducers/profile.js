

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
    
}

const profileReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case 'GET_PROFILE':
        case 'UPDATE_PROFILE':
            return {
                ...state,
                profile: payload,
                loading: false,
            }
        case 'GET_PROFILES':
                return {
                    ...state,
                    profiles: payload,
                    loading: false,
                }
        case 'PROFILE_ERROR': 
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null
            }
        case 'GET_REPOS': {
            return {
                ...state,
                repos: payload,
                loading: false
            }
        }
        case 'CLEAR_PROFILE':
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false,
            }

    
        default:
            return state
    }
}

export default profileReducer