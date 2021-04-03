import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../reducers/auth'
import postReducer from '../reducers/post';
import profileReducer from '../reducers/profile';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            profile: profileReducer,
            post: postReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};

const store = configureStore();

export default store

