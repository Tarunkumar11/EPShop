import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {useAuth} from '../../contexts/AuthContext'

function AdminPrivateRoute({component: Component, ...rest}) {
    const {currentUser} = useAuth() 
    return (
        <Route {...rest} render = { props => {
            return currentUser && currentUser.isAdmin ? <Component {...props} /> : <Redirect to="/login" />
        }}>
            
        </Route>
    )
}

export default AdminPrivateRoute