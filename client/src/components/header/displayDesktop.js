import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Toolbar } from '@material-ui/core'
import { headersAuth, headersGuest } from './data'
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink} from 'react-router-dom'
import AppLogo from './logo';
import { logout } from '../../actions/auth';
const useStyles = makeStyles(() => ({
 
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
  
    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        font: '18px',
        marginLeft: '38px'
      }
     
   
  }))

  const getMenuButtons = (headersData) => {
      const { menuButton } = useStyles();
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

const DisplayDesktop = ({ isAuthenticated }) => {
  const dispatch = useDispatch();
    const { toolbar, menuButton } = useStyles();
    return (<Toolbar className={toolbar}>
                  <AppLogo />
                  <div>
                    {isAuthenticated ? (
                      <Fragment>
                        {getMenuButtons(headersAuth)}
                        <Button 
                          onClick={() => dispatch(logout())}
                            {...{
                            key: 'logout',
                            color: 'inherit',
                            component: RouterLink,
                            className: menuButton
                            }}
                          >
                           Logout
                        </Button>
                      </Fragment>
                      )
                      : getMenuButtons(headersGuest)} 
                  </div>

            </Toolbar>)
                    }
export default DisplayDesktop
  