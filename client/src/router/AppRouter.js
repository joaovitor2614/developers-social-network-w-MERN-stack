import React, { useEffect } from 'react';
import { Router, Route, Switch, Link, NavLink, useHistory, BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import DashboardPage from '../components/dashboard/DashboardPage';
import LoginPage from '../components/auth/LoginPage';

import Header from '../components/header/Header'
import LandingPage from '../components/landing/LandingPage';
import setAuthToken from '../utils/setAuthToken';
import { loadUser } from '../actions/auth';
import Register from '../components/auth/Register';
import { ToastContainer } from 'react-toastify'
import PrivateRoute from './PrivateRoute';
import ProfilePage from '../components/profile/ProfilePage';
import UpdateProfile from '../components/profile/UpdateProfile';
import EditProfile from '../components/profile/EditProfile';
import AddExperience from '../components/profile/experience/AddExperience';
import AddEducation from '../components/profile/education/AddEducation';
import Profiles from '../components/profiles/Profiles';
import UserProfile from '../components/profiles/user profile/UserProfile';


if (localStorage.token) {
    setAuthToken(localStorage.token)
}

const AppRouter = () => {
    const dispatch = useDispatch()
   useEffect(() => {   
     dispatch(loadUser())
   }, [])
   
   
 
    return (
        <BrowserRouter>
            <div>
                <Header />
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/register" component={Register} />
                    <PrivateRoute exact path='/dashboard' component={DashboardPage} />
                    <PrivateRoute exact path='/profile' component={ProfilePage} />
                    <PrivateRoute exact path='/profile/update-profile' component={UpdateProfile} />
                    <PrivateRoute exact path='/profile/edit-profile' component={EditProfile} />
                    <PrivateRoute exact path='/profile/add-exp' component={AddExperience} />
                    <PrivateRoute exact path='/profile/add-edu' component={AddEducation} />
                    <PrivateRoute exact path='/profiles' component={Profiles} />
                    <PrivateRoute exact path='/user-profile/:id' component={UserProfile} />
                </Switch>

            </div>


        </BrowserRouter>
    )
}

export default AppRouter;
