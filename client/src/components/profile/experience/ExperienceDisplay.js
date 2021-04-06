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
import { deleteExperience } from '../../../actions/profile';

const useStyles = makeStyles({
    table: {
        maxWidth: 390,
        fontFamily: 'Roboto'
    }
});




const ExperienceDisplay = ({ experience }) => {
    
   
    const dispatch = useDispatch();
    function createData(title, company, years, operation) {
        return { title, company, years, operation }
    }
    const rows = [];
    experience.map((exp) => {
        const title = exp.title;
        const company = exp.company;
        const years = `${moment(exp.from).format('L')} ${exp.to !== null ? ' até ' + moment(exp.to).format('L') : '- Atual'}`
        const data = createData(title, company, years, exp._id)
        rows.push(data)
    });
    const operations = (id) => (
            <IconButton onClick={() => dispatch(deleteExperience(id))} aria-label="remove" color="secondary">
                <DeleteIcon />
            </IconButton>
    )
    const classes = useStyles();
    return (
                <TableContainer>
                <Table className={classes.table} aria-label="simple table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Título</TableCell>
                            <TableCell align="center">Empresa</TableCell>
                            <TableCell align="center">Anos</TableCell>
                            <TableCell align="center">Operações</TableCell>
                        </TableRow>
                    </TableHead>
                   {experience.length > 0 && (
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.operation}>
                                <TableCell align="center">{row.title}</TableCell>
                                <TableCell align="center">{row.company}</TableCell>
                                <TableCell align="center">{row.years}</TableCell>
                                <TableCell align="center">{operations(row.operation)}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                   )}
                </Table>
            </TableContainer>

            ) 
        }
                        
                        


export default ExperienceDisplay
