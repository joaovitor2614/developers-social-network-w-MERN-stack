import React from 'react'
import moment from 'moment'
import { Grid, Paper, Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// package para portugues-br
moment.locale('pt-br');
const useStyles = makeStyles((theme) => ({
    
     EduBox: {
        display: 'flex',
        border: '1px solid gray',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        wordBreak: 'all'
     },
     eduItem: {
      
        display: 'flex',
        flexDirection: 'column',
        justifyCotent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid gray'
   
    }
    
   }))

export const ProfileEducation = ({ education }) => {
        const { EduBox, eduItem } = useStyles();
        
        return (
            <Grid className={EduBox} item xs={12}>
                <h1>Educação</h1>
                {education.length > 0 ? (education.map((edu) => {
                const { school, to, from, degree, fieldofstudy, description, location, id } = edu;
                return (
                    <div className={eduItem} key={id}>
                        <p><strong>Instituição: </strong>{school}</p>
                        <p>{moment(from).format('LL')} {to !== null ? ` até ${moment(to).format('LL')}` : ' - Atual'}</p>
                        <p>
                        <strong>Certificado: </strong>{degree}
                        </p>
                        <p>
                            <strong>Campo de estudo: </strong>{fieldofstudy}
                        </p>
                        {description && <p><strong>Campo de estudo: </strong> {description}</p>}
                        {location && <p><strong>Local: </strong> {location}</p>}
                    </div>
                )})) : <h3 className={eduItem}>Sem credenciais de educação</h3>
            }</Grid>
           
        )
            }
       
    

export default ProfileEducation
