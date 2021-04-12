import React from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  RadioGroup,
  FormControl,
} from '@material-ui/core';

import Option from './Option';

const QuestionOptions = ({
  checkCorrectOption, options, correctOption, index, handleQuestionData,
}) => (
  <FormControl>
    <RadioGroup value={correctOption} onChange={checkCorrectOption}>
      <Grid container direction='column' spacing={1}>
        <Grid item>
          <Option value={options[0]} onChange={(event) => handleQuestionData(event, index)} label='Option 1' name='optionOne' checked='1' correctOption={correctOption} />
        </Grid>
        <Grid item>
          <Option value={options[1]} onChange={(event) => handleQuestionData(event, index)} label='Option 2' name='optionTwo' checked='2' correctOption={correctOption} />
        </Grid>
        <Grid item>
          <Option value={options[2]} onChange={(event) => handleQuestionData(event, index)} label='Option 3' name='optionThree' checked='3' correctOption={correctOption} />
        </Grid>
        <Grid item>
          <Option value={options[3]} onChange={(event) => handleQuestionData(event, index)} label='Option 4' name='optionFour' checked='4' correctOption={correctOption} />
        </Grid>
      </Grid>
    </RadioGroup>
  </FormControl>
);

QuestionOptions.propTypes = {
  checkCorrectOption: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctOption: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  handleQuestionData: PropTypes.func.isRequired,
};

export default QuestionOptions;
