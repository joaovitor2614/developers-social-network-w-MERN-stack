import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter, { history } from './router/AppRouter'
import LoadingPage from './components/LoadingPage'
import { firebase } from './firebase/firebase'

import { Provider } from 'react-redux'
import store from './store/configureStore'
import './styles/main.scss'
import 'react-toastify/dist/ReactToastify.css';




const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)




ReactDOM.render(jsx, document.getElementById("app"))



