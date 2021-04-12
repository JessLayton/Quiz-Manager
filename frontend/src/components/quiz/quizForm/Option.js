import React from 'react';
import PropTypes from 'prop-types';

import {
  TextField, Grid, Radio, IconButton, Tooltip, FormControlLabel,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const Option = ({
  value, label, name, onChange, checked, correctOption, removeOption, size,
}) => (
  <Grid container direction='row' alignItems='center' spacing={3}>
    <Grid item>
      <TextField
        value={value}
        label={label}
        name={name}
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
      <Tooltip title={correctOption === checked ? 'Correct option' : 'Set as correct option'} placement='top-start'>
        <FormControlLabel value={checked} control={<Radio checkedIcon={<CheckCircleIcon />} />} />
      </Tooltip>
    </Grid>
    <Grid item>
      {size > 3 ? (
        <Tooltip title='Remove option' placement='top-start'>
          <IconButton color='secondary'>
            <RemoveCircleIcon onClick={removeOption} />
          </IconButton>
        </Tooltip>
      ) : null}
    </Grid>
  </Grid>
);

Option.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.string.isRequired,
  correctOption: PropTypes.string.isRequired,
  removeOption: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
};

Option.defaultProps = {
  label: '',
};

export default Option;
