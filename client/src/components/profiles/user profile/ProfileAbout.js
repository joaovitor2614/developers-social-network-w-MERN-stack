import React, { Fragment } from 'react'
import { Grid, Paper, Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({

    divCenter: {
        backgroundColor: '#f4f4f4',
        border: '#cccccc',
        marginTop: '35px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
     childDiv: {
         display: 'flex',
         
         flexDirection: 'column',
         alignItems: 'center',
        justifyContent: 'center',
     },
     skillsDiv: {
         display: 'flex',
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'space-between',
         padding: '0 15px',
         "@media (max-width: 900px)": {
            flexDirection: 'column',
            padding: '5px 0'
         }
      
      
     }
  }))
  


const ProfileAbout = ({ profile: { bio, skills }}) => {
    const { divCenter, childDiv, skillsDiv } = useStyles();
    return (
        <Grid  className={divCenter} container spacing={1}>
            <Grid className={childDiv} item xs={12}>
                <h1>Habilidades</h1>
                {skills.length > 0 && (
                    <div className={skillsDiv}>
                        
                        {skills.map((skill, index) => (
                            <div className={skillsDiv} key={index}>
                                <CheckIcon />
                                <h3 >{skill}</h3>
                            </div>
                            
                        ))}
                    </div>
                )}
            </Grid>
           
        </Grid>
    )
}

export default ProfileAbout
