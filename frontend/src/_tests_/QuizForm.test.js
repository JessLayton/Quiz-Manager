/* eslint-disable no-unused-expressions */
import React from 'react';
import { Provider } from 'react-redux';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CreateQuiz from '../components/quiz/CreateQuiz';
import NavBar from '../components/NavBar';

import QuizForm from '../components/quiz/quizForm/QuizForm';
import store from '../store';

configure({ adapter: new Adapter() });

describe('<CreateQuiz />', () => {
  it('contains a <Navbar /> and a <QuizForm /> component', () => {
    const wrapper = mount((
      <Provider store={store}>
        <CreateQuiz />
      </Provider>
    ));
    expect(wrapper.exists(QuizForm)).to.be.true;
    expect(wrapper.exists(NavBar)).to.be.true;
  });
});
