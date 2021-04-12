import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { selectRole } from '../components/auth/userSlice';

const Editor = ({ component: Component, path }) => {
  const role = useSelector(selectRole);

  return (
    <Route
      path={path}
      render={() => (
        role === 'editor'
          ? <Component />
          : <Redirect to='/' />
      )}
    />
  );
};

Editor.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
};

export default Editor;
