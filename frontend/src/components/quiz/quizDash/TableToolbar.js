import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Grid, Button } from '@material-ui/core';

import Loading from '../../Loading';
import SearchField from './SearchField';
import { selectRole } from '../../auth/userSlice';

const useStyles = makeStyles((selected) => ({
  highlight:
      selected
        ? { backgroundColor: '#E2F7F7' } : { },
}));

const TableToolbar = ({
  selected, searchInput, updateSearchInput, handleShowDeleteDialog,
}) => {
  const classes = useStyles(selected);
  const history = useHistory();

  const role = useSelector(selectRole);

  const goToUpdateQuiz = () => {
    history.push(`/updateQuiz/${selected}`);
  };

  const goToViewQuiz = () => {
    history.push(`/viewQuiz/${selected}`);
  };

  const goToViewQuizWithAnswers = () => {
    history.push(`/viewQuizWithAnswers/${selected}`);
  };

  if (role) {
    return (
      <Toolbar
        className={clsx({
          [classes.highlight]: selected,
        })}
      >
        {selected ? (
          <Grid container direction='row' alignItems='center' justify='space-between'>
            <Grid item>
              <SearchField input={searchInput} updateInput={updateSearchInput} xs={3} />
            </Grid>
            <Grid item>
              <Button onClick={goToViewQuiz} variant='contained' color='secondary' xs={3}>
                View Quiz
              </Button>
            </Grid>
            {role === 'admin'
              ? (
                <>
                  <Grid item>
                    <Button onClick={goToUpdateQuiz} variant='contained' color='secondary' xs={3}>
                      Update Quiz
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button onClick={handleShowDeleteDialog} variant='contained' color='secondary' xs={3}>
                      Delete Quiz
                    </Button>
                  </Grid>
                </>
              )
              : null}
            {role === 'admin' || role === 'assessor'
              ? (
                <Grid item>
                  <Button onClick={goToViewQuizWithAnswers} variant='contained' color='secondary' xs={3}>
                    View Quiz With Answers
                  </Button>
                </Grid>
              )
              : null}
          </Grid>
        ) : (
          <SearchField input={searchInput} updateInput={updateSearchInput} />
        )}
      </Toolbar>
    );
  }
  return (
    <Loading />
  );
};

TableToolbar.propTypes = {
  selected: PropTypes.string,
  searchInput: PropTypes.string,
  updateSearchInput: PropTypes.func.isRequired,
  handleShowDeleteDialog: PropTypes.func.isRequired,
};

TableToolbar.defaultProps = {
  searchInput: '',
  selected: undefined,
};

export default TableToolbar;
