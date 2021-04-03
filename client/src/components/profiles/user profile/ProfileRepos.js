import React, { useEffect } from 'react'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { getGithubRepos } from '../../../actions/profile'
import StarIcon from '@material-ui/icons/Star';
import PeopleIcon from '@material-ui/icons/People';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    repoGrid: {
     marginTop: '20px'
    },
   repoGrid: {
       
       display: 'flex',
       alignItems: 'center',
       flexDirection: 'column',
       justifyContent: 'center',
       width: '100%'
   },
   repoItem: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '20px',
    justifyContent: 'space-between',
    borderBottom: '1px solid gray'
   },
   centerItem: {
    display: 'flex',
    alignItems: 'center',
    textAign: 'center',
   
   
    justifyContent: 'center',
   }
   
  }))

const ProfileRepos = ({ username }) => {
    const profileState = useSelector(state => state.profile);
    const { repos } = profileState;
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getGithubRepos(username))
    }, [getGithubRepos])
    const { repoGrid, repoPaper, repoItem, centerItem } = useStyles();
    return (
        <Grid item xs={12} >
            <Paper pagination={2} className={repoGrid}>
                <h2>Repos</h2>
                {repos.length > 0 ? (repos.map(repo => (
                    <div className={repoItem} key={repo.id}>]
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <a style={{ textDecoration: 'none', color: 'black', cursor: 'pointer'}} 
                            href={repo.html_url}>
                            <h4>{repo.name}</h4>
                            </a>
                            <p>{moment(repo.created_at).fromNow()}</p>
                        </div>
                       
                        <div className={centerItem}>
                        <StarIcon />
                        <p>Estrelas: {repo.stargazers_count}</p>
                        </div>
                        <div>
                        <PeopleIcon />
                        <p>Observadores: {repo.watchers_count}</p>
                        </div>
                        <div>
                        <FileCopyIcon />
                        <p>Forks: {repo.forks}</p>
                        </div>
                    </div>
                ))): <h2>Sem repos encontrados</h2>}
            </Paper>
        </Grid>
    )
}

export default ProfileRepos
