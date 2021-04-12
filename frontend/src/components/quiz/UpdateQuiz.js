import React, { useEffect } from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import NavBar from '../NavBar';
import { updateQuiz, getQuiz } from '../../connections/quizDatabaseService';
import QuizForm from './quizForm/QuizForm';
import Loading from '../Loading';
import { showError, showSuccess } from '../notifier/notifierSlice';

const UpdateQuiz = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [questionData, setQuestionData] = React.useState([]);
  const [correctOption, setCorrectOption] = React.useState([]);
  const [loading, isLoading] = React.useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const quizId = params.id;
    let updatedQuiz;
    try {
      updatedQuiz = await updateQuiz(quizId, name, description, questionData);
      if (updatedQuiz) {
        dispatch(showSuccess(`Updated quiz: ${name}`));
        history.push('/');
      }
    } catch (error) {
      console.error(error);
      dispatch(showError('Failed to update quiz'));
    }
  };

  const checkCorrectOption = (event, index) => {
    const options = [...correctOption];
    options[index] = event.target.value;
    setCorrectOption(options);
    const data = [...questionData];
    data[index].correctOption = parseInt(event.target.value, 10);
    setQuestionData(data);
  };

  const addQuestion = () => {
    setQuestionData([...questionData, { question: '', options: ['', '', '', ''], correctOption: 1 }]);
    setCorrectOption([...correctOption, '1']);
  };

  const removeQuestion = (index) => {
    const deletedQuestion = [...questionData];
    deletedQuestion.splice(index, 1);
    setQuestionData(deletedQuestion);
    const deletedOption = [...correctOption];
    deletedOption.splice(index, 1);
    setCorrectOption(deletedOption);
  };

  const getQuizData = async () => {
    const quizId = params.id;
    let quizResponse;
    try {
      quizResponse = await getQuiz(quizId);
      if (quizResponse && quizResponse.data) {
        const quizData = quizResponse.data.quiz;
        setName(quizData.name);
        setDescription(quizData.description);
        setQuestionData(quizData.questions);
        const correctOptions = [];
        const emptyAnswers = [];
        quizData.questions.forEach((question) => {
          emptyAnswers.push(null);
          correctOptions.push(String(question.correctOption));
        });
        setCorrectOption(correctOptions);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const returnQuizData = async () => {
      await getQuizData();
      isLoading(false);
    };
    returnQuizData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  } if (name && description) {
    return (
      <>
        <NavBar pageHeading='Update Quiz' />
        <QuizForm
          handleSubmit={handleSubmit}
          questionData={questionData}
          setQuestionData={setQuestionData}
          name={name}
          updateQuizName={setName}
          description={description}
          updateQuizDescription={setDescription}
          correctOption={correctOption}
          checkCorrectOption={checkCorrectOption}
          addQuestion={addQuestion}
          removeQuestion={removeQuestion}
          formType='Update Quiz'
        />
      </>
    );
  }
  return (
    <Redirect to='/' />
  );
};

export default UpdateQuiz;
