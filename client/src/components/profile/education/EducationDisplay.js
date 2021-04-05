import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment'
import { deleteEducation } from '../../../actions/profile';

const useStyles = makeStyles({
    table: {
        maxWidth: 390,
        fontFamily: 'Roboto'
    },
    center: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});




const EducationDisplay = ({ education }) => {
    const dispatch = useDispatch()
    function createData(school, fieldofstudy, years, operation) {
        return { school, fieldofstudy, years, operation }
    }
    const rows = [];
    education.map((edu) => {
        const school = edu.school;
        const fieldofstudy = edu.fieldofstudy;
        const years = `${moment(edu.from).format('L')} ${edu.to !== null ? ' até ' + moment(edu.to).format('L') : '- Atual'}`
        const data = createData(school, fieldofstudy, years, edu._id)
        rows.push(data)
    });

   
    const operations = (id) => (
        <div>
            <IconButton onClick={() => dispatch(deleteEducation(id))} aria-label="remove" color="secondary">
                <DeleteIcon />
            </IconButton>
        </div>
    )
    const classes = useStyles();
    return (
        <TableContainer>
        <Table className={classes.table} aria-label="simple table" stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell align="left">Instituição</TableCell>
                    <TableCell align="center">Campo</TableCell>
                    <TableCell align="center">Anos</TableCell>
                    <TableCell align="center">Operações</TableCell>
                </TableRow>
            </TableHead>
            {education.length > 0 ? (
                <TableBody>
                 
                {rows.map((row) => (
                    <TableRow key={row.operation}>
                        <TableCell align="center">{row.school}</TableCell>
                        <TableCell align="center">{row.fieldofstudy}</TableCell>
                        <TableCell align="center">{row.years}</TableCell>
                        <TableCell align="center">{operations(row.operation)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            ) : ''
               }
        </Table>
    </TableContainer>
    )  
       
        
    
}


export default EducationDisplay
