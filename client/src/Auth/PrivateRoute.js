//Code from STACK OVERFLOW THEN ADAPTED
//https://stackoverflow.com/questions/47476186/when-user-is-not-logged-in-redirect-to-login-reactjs

// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react'
import { isUserLogged } from '../APIs';
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

  return (
    <Route
      {...rest}
      render={props =>
        isUserLogged() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute