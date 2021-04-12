import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { selectRole } from '../components/auth/userSlice';

const AssessorRoute = ({ component: Component, path }) => {
  const role = useSelector(selectRole);

  return (
    <Route
      path={path}
      render={() => (
        (role === 'admin' || role === 'assessor')
          ? <Component />
          : <Redirect to='/' />
      )}
    />
  );
};

AssessorRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
};

export default AssessorRoute;
