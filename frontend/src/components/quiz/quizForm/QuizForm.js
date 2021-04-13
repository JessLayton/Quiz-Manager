/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  Button,
  makeStyles,
  TextField,
  Card,
  Divider,
  RadioGroup,
  FormControl,
} from '@material-ui/core';

import Option from './Option';

const useStyles = makeStyles(() => ({
  quizCard: {
    padding: '10px',
    marginBottom: '5px',
    marginLeft: '5%',
    marginRight: '5%',
  },
  questionCard: {
    padding: '10px',
    marginTop: '5px',
    border: 'none',
    boxShadow: 'none',
  },
}));

const QuizForm = ({
  handleSubmit, questionData, setQuestionData, updateQuizName, updateQuizDescription,
  checkCorrectOption, addQuestion, removeQuestion, addOption, removeOption, name, description, formType,
}) => {
  const classes = useStyles();

  const handleUpdateName = (event) => {
    updateQuizName(event.target.value);
  };

  const handleUpdateDescription = (event) => {
    updateQuizDescription(event.target.value);
  };

  const handleQuestionData = (event, index) => {
    const values = [...questionData];
    switch (event.target.name) {
      case 'question':
        values[index].question = event.target.value;
        break;
      case '0':
        values[index].options[0] = event.target.value;
        break;
      case '1':
        values[index].options[1] = event.target.value;
        break;
      case '2':
        values[index].options[2] = event.target.value;
        break;
      case '3':
        values[index].options[3] = event.target.value;
        break;
      case '4':
        values[index].options[4] = event.target.value;
        break;
      default:
        break;
    }
    setQuestionData(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className={classes.quizCard}>
        <Grid container justify='center' alignItems='center'>
          <Grid container spacing={2} direction='column'>
            <Grid item>
              <TextField
                value={name}
                onChange={handleUpdateName}
                type='text'
                label='Quiz Name'
                InputLabelProps={{
                  shrink: true,
                  required: false,
                }}
                variant='filled'
                maxLength='50'
                fullWidth
                required
              />
            </Grid>
            <Grid item>
              <TextField
                value={description}
                onChange={handleUpdateDescription}
                type='text'
                label='Quiz Description'
                InputLabelProps={{
                  shrink: true,
                  required: false,
                }}
                variant='filled'
                maxLength='150'
                fullWidth
                required
              />
            </Grid>
            <Card className={classes.questionCard}>
              <Grid container item direction='column' spacing={3}>
                {questionData.map((question, index) => (
                  <Grid container item direction='column' spacing={2} key={index}>
                    <Divider />
                    <Grid container item direction='row' alignItems='center' justify='space-between' spacing={2}>
                      <Grid item xs={10}>
                        <TextField
                          className={classes.question}
                          value={question.question}
                          onChange={(event) => handleQuestionData(event, index)}
                          type='text'
                          label={`Question ${index + 1}`}
                          name='question'
                          InputLabelProps={{
                            shrink: true,
                            required: false,
                          }}
                          variant='filled'
                          maxLength='80'
                          fullWidth
                          required
                        />
                      </Grid>
                      {questionData.length > 1 ? (
                        <Grid item xs={2}>
                          <Button onClick={() => removeQuestion(index)} variant='contained' color='secondary' size='small'>
                            Remove Question
                          </Button>
                        </Grid>
                      )
                        : null}
                    </Grid>
                    <Grid container item direction='column' alignItems='flex-start' justify='center'>
                      <FormControl>
                        <RadioGroup value={question.correctOption} onChange={(event) => checkCorrectOption(event, index)}>
                          <Grid container direction='column' spacing={1}>
                            {question.options.map((option, optionIndex) => (
                              <Grid item key={optionIndex}>
                                <Option
                                  value={option}
                                  onChange={(event) => handleQuestionData(event, index)}
                                  optionIndex={optionIndex}
                                  label={`Option ${optionIndex + 1}`}
                                  correctOption={question.correctOption}
                                  size={question.options.length}
                                  removeOption={() => removeOption(index, optionIndex)}
                                  addOption={() => addOption(index)}
                                />
                              </Grid>
                            ))}
                          </Grid>
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                ))}
                <Grid item>
                  <Button onClick={addQuestion} variant='contained' color='secondary' size='small'>Add Question</Button>
                </Grid>
              </Grid>
            </Card>
            <Grid container item>
              <Button type='submit' variant='contained' color='secondary' size='large'>{formType}</Button>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </form>
  );
};

QuizForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  questionData: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  setQuestionData: PropTypes.func.isRequired,
  updateQuizName: PropTypes.func.isRequired,
  updateQuizDescription: PropTypes.func.isRequired,
  checkCorrectOption: PropTypes.func.isRequired,
  addQuestion: PropTypes.func.isRequired,
  removeQuestion: PropTypes.func.isRequired,
  addOption: PropTypes.func.isRequired,
  removeOption: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  formType: PropTypes.string,
};

QuizForm.defaultProps = {
  formType: '',
};

export default QuizForm;
