import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { selectRole } from '../components/auth/userSlice';

const ViewAllRoute = ({ component: Component, path }) => {
  const role = useSelector(selectRole);

  return (
    <Route
      path={path}
      render={() => (
        (role === 'editor' || role === 'viewer')
          ? <Component />
          : <Redirect to='/' />
      )}
    />
  );
};

ViewAllRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
};

export default ViewAllRoute;
