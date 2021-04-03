import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfiles } from '../../actions/profile'
import LoadingPage from '../LoadingPage'
import { makeStyles } from '@material-ui/core/styles';
import ProfileItem from './ProfileItem'

const useStyles = makeStyles((theme) => ({
  
    root: {
        marginTop: '100px'
    },
    profileTheme: {
        backgroundColor: '#a9a8a8',
        margin: theme.spacing(4),
        fontFamily: 'Arial, Helvetica, sans-serif;'
    }
 
  }));

export const Profiles = () => {
    const profileAuth = useSelector(state => state.profile)
    const { profiles, loading } = profileAuth;
    const { root, profileItem } = useStyles()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfiles())
 
    }, [getProfiles])
    return (
        <div className={root}>
            {loading ? (<LoadingPage />) : (
                <Fragment>
                   {profiles.length > 0 && profiles.map((profile) => (
                    
                            <ProfileItem key={profile._id}  profile={profile} />
                       
                       
                   ))}
                </Fragment>
            )}
        </div>
    )
}

export default Profiles
