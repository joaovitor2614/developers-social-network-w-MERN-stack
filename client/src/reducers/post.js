

const initialState = {
    post: null,
    posts: [],
    loading: true,
    error: {}
}

const postReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case 'GET_POST':
        
            return {
                ...state,
                post: payload,
                loading: false,
            }
        case 'GET_POSTS':
                return {
                    ...state,
                    posts: payload,
                    loading: false,
                }
        case 'ADD_POST':
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            }
        case 'UPDATE_LIKES':
            return {
                ...state,
                posts: state.posts.map((post) => post._id === payload.postId ? { ...post, likes: payload.likes }: post),
                loading: false
            }
        case 'UPDATE_COMMENT':
            return {
        
                ...state,
              posts: state.posts.map((post) => {
                if (post._id === payload.postId) {
                    return {
                        ...post,
                        comments: payload.comments
                    }
                } else {
                    return post
                }
            }),
            loading: false
        }
        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload.postId),
                loading: false
            }
        /*case 'ADD_COMMENT': 
            return {
                ...state,
                posts: state.posts.map((post) => post._id === payload.postId ? {...post, comments[ ...payload.comment, ...rest ]} : post)
            }
            */

        
        case 'POST_ERROR': 
            return {
                ...state,
                error: payload,
                loading: false,
            }

    
        default:
            return state
        }
}

export default postReducer