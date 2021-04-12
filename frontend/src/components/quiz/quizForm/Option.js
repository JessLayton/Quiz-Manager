import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
// import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Grid } from '@material-ui/core';

const Option = ({
  value, label, name, onChange, checked,
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
      {/* <Tooltip title={correctOption === checked ? 'Correct option' : 'Set as correct option'} placement='right-start'> */}
      <FormControlLabel value={checked} control={<Radio checkedIcon={<CheckCircleIcon />} />} />
      {/* </Tooltip> */}
    </Grid>
  </Grid>
);

Option.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.string.isRequired,
};

Option.defaultProps = {
  label: '',
};

export default Option;
