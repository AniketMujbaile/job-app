import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ element: Component, ...rest }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const renderElement = (props) => {
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }

    if (user.isAdmin && rest.path !== '/admin') {
      return <Navigate to="/admin" />;
    }

    if (!user.isAdmin && rest.path !== '/user') {
      return <Navigate to="/user" />;
    }

    return <Component {...props} />;
  };

  return <Route {...rest} element={renderElement} />;
}

export default PrivateRoute;
 