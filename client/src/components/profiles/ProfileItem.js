import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Grid, Paper, Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
  root: {
 
      backgroundColor: '#f4f4f4',
      color: '#8b949e',
      margin: '20px',
      fontFamily: 'Roboto',
      "@media (max-width: 900px)": {
          padding: '20px'
      }

   
  },
  imgAvatar: {
      width: '230px',
      height: '180px',
      "@media (max-width: 900px)": {
        width: '150px',
        height: '110px'
      }
  },
  nameItem: {
      color: '#58a6ff'
  },
  itemGroup: {
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
  },
  skillStyle: {
    
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemFlex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
}))

const ProfileItem = ({ profile: { user: { _id, name, avatar}, company, skills, location }}) => {
    const history = useHistory();
    const goProfile = () => {
      history.push(`/user-profile/${_id}`)
    }
    const { root, imgAvatar, itemGroup, skillStyle, nameItem, itemFlex } = useStyles();
    return (
        <div className={root}>
            <Grid container spacing={1}>
                <Grid className={itemGroup} item xs={12}>
                    <h1 className={nameItem}>{name}</h1>
                </Grid>
                <Grid className={itemGroup} item xs={6}>
                    <Avatar className={imgAvatar} src={avatar} alt="profile pic" />
                    
                </Grid>
                <Grid  className={itemFlex} item xs={6}>
                    {company && <h2>Atua em {company}</h2>}
                    {location && <h2>Em {location}</h2>}
                    <div style={{ color: '#17a2b8'}}>
                        {skills.slice(0, 4).map((skill, index) => (
                            <div className={skillStyle}key={index}>
                                <CheckIcon />
                                <p>{skill}</p>
                            </div>
                        ))} 
                    </div>
                    <Button variant="contained" style={{ backgroundColor: '#17a2b8 '}} onClick={() => goProfile()}>
                        Ver perfil
                    </Button>
                    
                </Grid>
                <Grid className={itemGroup} item xs={3}>
                    <Link style={{ textDecoration: 'none', color: 'white' }}  to={`/user-profile/${_id}`}>
                        Ver perfil
                    </Link>
                </Grid>
           
                
                
                
            </Grid>
        </div>
      
    )
}

export default ProfileItem
