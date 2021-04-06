import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import moment from 'moment'

// package para portugues-br
moment.locale('pt-br');



const useStyles = makeStyles((theme) => ({
    
     ExpBox: {
         display: 'flex',
         border: '1px solid gray',
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
         wordBreak: 'all',
         fontFamily: 'Roboto'
     },
     expItem: {
      
         display: 'flex',
         flexDirection: 'column',
         justifyCotent: 'space-between',
         alignItems: 'center',
         borderBottom: '1px solid gray'
    
     }
    
   }))
export const ProfileExperience = ({ experience }) => {
    const { ExpBox, expItem } = useStyles();
    return (
        <Grid className={ExpBox} item xs={12}>
            <h1>Experiência</h1>
             {experience.length > 0 ? (experience.map((exp) => {
                 const { company, to, from, title, description, location, id } = exp;
                 return (
                <div className={expItem} key={id}>
                        <p><strong>Empresa: </strong>{company}</p>
                        <p>{moment(from).format('LL')} {to !== null ? ` até ${moment(to).format('LL')}` : ' - Atual'}</p>
                        <p>
                            <strong>Posição: </strong>{title}
                        </p>
                        {description && (
                        <p>
                            <strong>Descrição: </strong>{description}
                        </p>
                        )}
                        {location && <p><strong>Local:</strong> {location}</p>}
                 </div>
                 )})) : <h3 className={expItem}>Sem credenciais de experiência</h3>
      
            } 
            </Grid>
     )
                        }


export default ProfileExperience
