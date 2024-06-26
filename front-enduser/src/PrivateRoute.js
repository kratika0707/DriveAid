// PrivateRoute.js
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from './Context/UserContext';
import History from './Components/History/History';

const PrivateRoute = ({ element: History, ...rest }) => {
  const { authState } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      element={authState.isAuthenticated ? <History {...rest} /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
