import React from 'react';
import PropTypes from 'prop-types';

import {
  TextField, Grid, Radio, IconButton, Tooltip, FormControlLabel,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const Option = ({
  value, label, optionIndex, onChange, correctOption, removeOption, addOption, size,
}) => (
  <Grid container direction='row' alignItems='center' spacing={3}>
    <Grid item>
      <TextField
        value={value}
        label={label}
        name={String(optionIndex)}
        onChange={onChange}
        type='text'
        InputLabelProps={{
          shrink: true,
          required: false,
        }}
        variant='filled'
        maxLength='80'
        required
      />
    </Grid>
    <Grid item>
      <Tooltip title={correctOption === optionIndex ? 'Correct option' : 'Set as correct option'} placement='top-start'>
        <FormControlLabel value={optionIndex} control={<Radio checkedIcon={<CheckCircleIcon />} />} />
      </Tooltip>
    </Grid>
    <Grid item>
      <Tooltip title={size > 3 ? 'Remove option' : 'Must have 3 or more options'} placement='top-start'>
        <span>
          <IconButton color='secondary' onClick={removeOption} disabled={size <= 3}>
            <RemoveCircleIcon />
          </IconButton>
        </span>
      </Tooltip>
    </Grid>
    <Grid item>
      {size === (optionIndex + 1) ? (
        <Tooltip title={size < 5 ? 'Add option' : 'Cannot have more than 5 options'} placement='top-start'>
          <span>
            <IconButton color='secondary' onClick={addOption} disabled={size >= 5}>
              <AddCircleIcon />
            </IconButton>
          </span>
        </Tooltip>
      ) : null}
    </Grid>
  </Grid>
);

Option.propTypes = {
  value: PropTypes.string.isRequired,
  optionIndex: PropTypes.number.isRequired,
  correctOption: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  removeOption: PropTypes.func.isRequired,
  addOption: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  label: PropTypes.string,
};

Option.defaultProps = {
  label: '',
};

export default Option;
