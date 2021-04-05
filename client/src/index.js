import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter, { history } from './router/AppRouter'
import LoadingPage from './components/LoadingPage'
import { firebase } from './firebase/firebase'
import { Provider } from 'react-redux'
import store from './store/configureStore'
import './styles/main.scss'
import 'react-toastify/dist/ReactToastify.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const theme = createMuiTheme({

      fontFamily: [
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
   
  });

const jsx = (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <AppRouter />
        </ThemeProvider>
        
    </Provider>
)




ReactDOM.render(jsx, document.getElementById("app"))



