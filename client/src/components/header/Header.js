import { AppBar, Button, Toolbar } from '@material-ui/core'
import { Link as RouterLink} from 'react-router-dom'
import React, { Fragment, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logout } from '../../actions/auth'

import DisplayDesktop from './displayDesktop'
import DisplayMobile from './displayMobile';


const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: '#161b22',
    paddingRight: '79px',
    paddingLeft: '118px',
    marginBottom: '200px',
    "@media (max-width: 900px)": {
      paddingLeft: 0,
      marginBottom: 0
    },
  }
}))


const Header = () => {
  const [state, setState] = useState({
    mobileView: false
    
  });
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const { loading, isAuthenticated } = auth;
  const { mobileView } = state;
  console.log(mobileView)
  const { menuButton, header } = useStyles();

  const handleLogout = () => {
    dispatch(logout())
    toast.dark('Logout efetuado com sucesso, até a próxima 🖐', {
      position: "top-center",
      autoClose: 1800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
  const authLinks = (
    <Fragment>
      <a onClick={handleLogout}href="#!">
          Logout
      </a>
      <NavLink to='/dashboard'>Dashboard</NavLink>
      <NavLink to='/profiles'>Devs</NavLink>   
      <NavLink to='/profile'>Meu perfil</NavLink>
    </Fragment>
    
  );
  const guestLinks = (
    <Fragment>
      <NavLink to='/login'>Login</NavLink>
      <NavLink to='/register'>Registrar</NavLink>
    </Fragment>
  )

    const getMenuButtons = (headersData) => {
         return headersData.map(({ label, href }) => {
           return (
          <Button
           {...{
             key: label,
             color: "inherit",
             to: href,
             component: RouterLink,
             className: menuButton
           }}
           >
              {label}
           </Button>
         )
         })
    }
 
   
  


  
  useEffect(() => {
    const setResponsive = () => {
      return window.innerWidth < 900 
      ? setState((prevState) => ({ ...prevState, mobileView: true }))
      : setState((prevState) => ({ ...prevState, mobileView: false }))
    }
    setResponsive();
    window.addEventListener("resize", () => setResponsive());
    return () => setResponsive
  }, [])
  return (
    <header>
      <AppBar className={header}>{mobileView 
        ? <DisplayMobile isAuthenticated={isAuthenticated} /> 
        : <DisplayDesktop isAuthenticated={isAuthenticated} />}</AppBar>
    </header>
  )
}

export default Header
