import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(() => ({
   logo: {
       fontFamily: "Work Sans, sans-serif",
       fontWeight: 600,
       color: "#f0f6fc",
       textAlign: "left",
       cursor: "pointer"
   }
}))



const AppLogo = () => {
    const history = useHistory();
    const { logo } = useStyles();
    const goLandingPage = () => {
        history.push('/')
    }
    return (
    <Typography onClick={goLandingPage} variant="h6" component="h1" className={logo}>
       DevNet
    </Typography>
    )
}

export default AppLogo