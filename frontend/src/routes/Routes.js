import React from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';

import RestrictedRoute from './RestrictedRoute';
import EditorRoute from './EditorRoute';
import ViewAllRoute from './ViewAllRoute';
import Register from '../components/auth/register/Register';
import Login from '../components/auth/login/Login';
import CreateQuiz from '../components/quiz/CreateQuiz';
import UpdateQuiz from '../components/quiz/UpdateQuiz';
import ViewQuiz from '../components/quiz/viewQuiz/ViewQuiz';
import ViewQuizWithAnswers from '../components/quiz/viewQuiz/ViewQuizWithAnswers';
import QuizTable from '../components/quiz/quizDash/QuizTable';

const Routes = () => (

  <Router>
    <Switch>
      <RestrictedRoute exact path='/' component={QuizTable} />
      <RestrictedRoute path='/viewQuiz/:id' component={ViewQuiz} />
      <EditorRoute path='/createQuiz' component={CreateQuiz} />
      <EditorRoute path='/updateQuiz/:id' component={UpdateQuiz} />
      <ViewAllRoute path='/viewQuizWithAnswers/:id' component={ViewQuizWithAnswers} />
      <Route path='/register'>
        <Register />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route>
        <Redirect to='/' />
      </Route>
    </Switch>
  </Router>
);

export default Routes;
