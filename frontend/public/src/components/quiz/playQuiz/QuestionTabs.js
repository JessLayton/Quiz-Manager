import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from '@material-ui/core';

const QuestionTabs = ({ questionData, tabNumber, selectQuestion }) => (
  <Tabs
    value={tabNumber}
    onChange={selectQuestion}
    variant='scrollable'
    scrollButtons='on'
    indicatorColor='primary'
  >
    {questionData.map((question, index) => (
      <Tab
        label={`Question ${index + 1}`}
        key={question._id}
      />
    ))}
  </Tabs>
);

QuestionTabs.propTypes = {
  questionData: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string,
  })).isRequired,
  tabNumber: PropTypes.number,
  selectQuestion: PropTypes.func.isRequired,
};

QuestionTabs.defaultProps = {
  tabNumber: 0,

};

export default QuestionTabs;
