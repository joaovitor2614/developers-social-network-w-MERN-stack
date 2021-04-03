
import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Box } from '@material-ui/core'
import landing from '../../assets/landing.png'

const useStyles = makeStyles(() => ({
 
   fullGrid: {
       backgroundImage: `url(${landing})`,
       width: '100vw',
       height: '100vh',
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center'
   },
   landingBox: {
       backgroundColor: '#161b22',
       display: 'flex',
       textAlign: 'center',
       width: '500px',
       height: '290px',
       paddding: '20px',
       "@media (max-width: 900px)": {
        width: '300px',
        height: '350px'
      },
   },
   boxGrid: {
    display: 'flex',
    color: "white",
    borderRadius: '30px',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px',
    fontFamily: "Open Sans, sans-serif",
    
   },
   gridBtn: {
       marginTop: '10px'
   }
   
   
  }))

export const LandingPage = () => {
    const { fullGrid, boxGrid, gridBtn, landingBox } = useStyles();
    const history = useHistory();
    const goLogin = () => {
        history.push('/login')
    }
    const goRegister = () => {
        history.push('/register')
    }
    return (
        <Grid className={fullGrid}>
             <Box className={landingBox}>
                <Box m="auto">
                    <Grid className={boxGrid}>
                        <h1>DevNet</h1>
                        <p style={{ marginBottom: '25px' }} >Crie seu perfil e intereja com outros desenvolvedores</p>
                         
                        <Button onClick={() => goLogin()} style={{ marginLeft: '10px', marginBottom: '25px'}} 
                            variant="contained" color="primary">
                            Login
                        </Button>
                        <Button onClick={() => goRegister()} variant="contained" color="secondary">Registar</Button>
                        
                        
                    </Grid>
                    
                    
                </Box>
                
             </Box>
            
        </Grid>
    )
}

export default LandingPage

