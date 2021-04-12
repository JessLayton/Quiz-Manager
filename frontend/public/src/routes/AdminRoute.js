import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { selectRole } from '../components/auth/userSlice';

const AdminRoute = ({ component: Component, path }) => {
  const role = useSelector(selectRole);

  return (
    <Route
      path={path}
      render={() => (
        role === 'admin'
          ? <Component />
          : <Redirect to='/' />
      )}
    />
  );
};

AdminRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
};

export default AdminRoute;
