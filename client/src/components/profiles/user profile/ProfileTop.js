import React from 'react'
import { Grid, Paper, Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import LanguageIcon from '@material-ui/icons/Language';

const useStyles = makeStyles((theme) => ({
    socialFields: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
    },
    topField: {
            display: 'flex',
            backgroundColor: '#17a2b8',
           
            color: 'white',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '30px',
            fontFamily: 'Work Sans, sans-serif',
            "@media (max-width: 900px)": {
                padding: '15px',
            },
                },
    avatarStyles: {
        height: '250px',
        width: '230px',
        "@media (max-width: 900px)": {
            height: '150px',
            width: '130px'
        }
    },
    topCont: {
        margintop: '540px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
  }))
  

const ProfileTop = ({ profile: { user: { avatar, name } }, profile }) => {
    const { status, location, website } = profile
    const { twitter, facebook, linkedin, instagram, youtube } = profile.social;
    console.log(avatar)
    const { socialFields, topField, avatarStyles, topCont } = useStyles();
    return (
        <Grid className={topCont} container spacing={1}>
            <Grid className={topField} item xs={12}>
                <Avatar className={avatarStyles} src={avatar} alt="profile pic" />
                <h1>{name}</h1>
                <h2>{status}</h2>
                <h3>{location}</h3>
                <div className={socialFields}>
                    {website && (
                        <a href={website}>
                            <LanguageIcon />
                        </a>
                    )
                    }
                    {twitter && (
                        <a href={twitter}>
                            <TwitterIcon />
                        </a>
                    )
                    }
                    {youtube && (
                        <a href={youtube}>
                            <YouTubeIcon />
                        </a>
                    )
                    }
                    {facebook && (
                        <a href={facebook}>
                            <FacebookIcon />
                        </a>
                    )
                    }
                    {instagram && (
                        <a href={instagram}>
                            <InstagramIcon />
                        </a>
                    )
                    }
                    {linkedin && (
                        <a href={linkedin}>
                            <LinkedInIcon />
                        </a>
                    )
                    }  
                </div>
            </Grid>
           
            
            
            
        </Grid>
      
    )
}


export default ProfileTop
