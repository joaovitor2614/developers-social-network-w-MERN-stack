import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Divider, Drawer, IconButton, MenuItem, Toolbar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { headersAuth, headersGuest } from './data'
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink} from 'react-router-dom'
import AppLogo from './logo';
import { logout } from '../../actions/auth';
const useStyles = makeStyles(() => ({

    drawer: {
        color: '#161b22'
    },
    paper: {
        background: '#161b22',
        color: 'white',
        paddingTop: '30px',
        paddingLeft: '10px',
        paddingRight: '10px'
      }
     
  }))



const DisplayMobile = ({ isAuthenticated }) => {
    const dispatch = useDispatch()
    const [drawerOpen, setDrawerOpen] = useState(false);
    const handleDrawerOpen = () => setDrawerOpen(true);
    const handleDrawerClose = () => setDrawerOpen(false);
    const { drawer, paper } = useStyles();


    const getDrawerChoices = (headersData) => {
     
        return headersData.map(({ label, href }) => {
          return (
         <Button
           onClick={handleDrawerClose}
          {...{
            component: RouterLink,
            to: href,
            color: "inherit",
            style: { textDecoration: "none" },
            key: label
          }}
          >
             <Divider />
                <MenuItem>{label}</MenuItem>
             <Divider />
          </Button>
        )
        })
    }



    return (<Toolbar>
               <IconButton
                    {...{
                    edge: "start",
                    color: "inherit",
                    "aria-label": "menu",
                    "aria-haspopup": "true",
                    onClick: handleDrawerOpen
                    }}>
                    <MenuIcon />
                </IconButton>
                <Drawer classes={{ paper }}
                    {...{
                        anchor: "left",
                        open: drawerOpen,
                        onClose: handleDrawerClose,
                        
                    }}
                >
                  
                  {isAuthenticated ? 
                    (<Fragment>
                    {getDrawerChoices(headersAuth)}
                    <Button 
                          onClick={() => dispatch(logout())}
                            {...{
                            key: 'logout',
                            color: 'inherit',
                            component: RouterLink,
                            style: { textDecoration: "none" }
                            }}
                          >
                          <Divider />
                            <MenuItem>Logout</MenuItem>
                          <Divider />
                        </Button>
                    </Fragment>)
                  : getDrawerChoices(headersGuest)}
                </Drawer>
                <div>
                    <AppLogo />
                </div>
            </Toolbar>)
                    }
export default DisplayMobile
  