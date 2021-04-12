import React from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import AssessorRoute from './AssessorRoute';
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
      <PrivateRoute exact path='/' component={QuizTable} />
      <PrivateRoute path='/viewQuiz/:id' component={ViewQuiz} />
      <AdminRoute path='/createQuiz' component={CreateQuiz} />
      <AdminRoute path='/updateQuiz/:id' component={UpdateQuiz} />
      <AssessorRoute path='/viewQuizWithAnswers/:id' component={ViewQuizWithAnswers} />
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