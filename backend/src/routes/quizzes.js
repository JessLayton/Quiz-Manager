const router = require('express').Router();

const Quiz = require('../models/quizModel');
const auth = require('../middleware/auth');
const { editorAccess, viewingAccess } = require('../middleware/roles');

router.post('/createQuiz', auth, editorAccess, async ({ user, body: { name, description, questions } }, res) => {
  try {
    if (!name || !description || !questions) {
      return res.status(400).json({ msg: 'Fields cannot be empty' });
    }
    if (questions.length === 0) {
      return res.status(400).json({ msg: 'Quiz must have at least one question' });
    }
    const existingQuiz = await Quiz.findOne({ name });
    if (existingQuiz) {
      return res.status(409).json({ msg: `A quiz already exists with this name: ${name}` });
    }
    const missingCorrectOptions = [];
    questions.forEach((question, questionIndex) => {
      if (question.correctOption >= question.options.length) {
        missingCorrectOptions.push(questionIndex + 1);
      }
    });
    if (missingCorrectOptions.length > 0) {
      return res.status(409).json({ msg: `Correct options are missing from the following questions: ${missingCorrectOptions.join(', ')}` });
    }
    const newQuiz = new Quiz({
      name,
      creator: user,
      description,
      questions,
    });
    const savedQuiz = await newQuiz.save();
    return res.status(200).json({
      quiz: {
        name: savedQuiz.name,
        creator: user,
        description: savedQuiz.description,
        id: savedQuiz._id,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Unexpected error occurred' });
  }
});

router.get('/getAllQuizzes', auth, async (req, res) => {
  try {
    Quiz.find({}, (err, quizzes) => res.status(200).json({ quizzes }));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Unexpected error occurred' });
  }
});

router.post('/getQuizNoAnswers', auth, async (req, res) => {
  const { id } = req.body;
  try {
    Quiz.findById(id,
      { 'questions.correctOption': 0 },
      (error, quiz) => {
        if (error) {
          return res.status(500).json({ msg: 'Unexpected error occurred' });
        }
        if (quiz) {
          return res.status(200).json({ quiz });
        }
        return res.status(404).json({ msg: 'Quiz not found' });
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
});

router.post('/getQuizWithAnswers', auth, viewingAccess, async (req, res) => {
  const { id } = req.body;
  try {
    Quiz.findById(id, (error, quiz) => {
      if (error) {
        return res.status(500).json({ msg: 'Unexpected error occurred' });
      }
      if (quiz) {
        return res.status(200).json({ quiz });
      }
      return res.status(404).json({ msg: 'Quiz not found' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Unexpected error occurred' });
  }
});

router.delete('/deleteQuiz/:id', auth, editorAccess, async (req, res) => {
  const { id } = req.params;
  try {
    await Quiz.deleteOne({ _id: id }, (error, quizResponse) => {
      if (error) {
        return res.status(500).json({ msg: 'Unexpected error occurred' });
      }
      return res.status(200).json({ response: quizResponse });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Unexpected error occurred' });
  }
});

router.put('/updateQuiz/:id', auth, editorAccess, async (req, res) => {
  const { id } = req.params;
  try {
    const {
      body: {
        name, description, questions,
      },
    } = req;
    if (!name || !description || !questions) {
      return res.status(400).json({ msg: 'Fields cannot be empty' });
    }
    if (questions.length === 0) {
      return res.status(400).json({ msg: 'Quiz must have at least one question' });
    }
    const existingQuiz = await Quiz.findOne({ name });
    if (existingQuiz && existingQuiz._id.toString() !== id) {
      return res.status(409).json({ msg: `A quiz already exists with this name: ${name}` });
    }
    const missingCorrectOptions = [];
    questions.forEach((question, questionIndex) => {
      if (question.correctOption >= question.options.length) {
        missingCorrectOptions.push(questionIndex + 1);
      }
    });
    if (missingCorrectOptions.length > 0) {
      return res.status(409).json({ msg: `Correct options are missing from the following questions: ${missingCorrectOptions.join(', ')}` });
    }
    Quiz.findOneAndUpdate({ _id: id },
      {
        name,
        description,
        questions,
      },
      { new: true },
      (quizError) => {
        if (quizError) {
          return res.status(500).json({ msg: quizError.message });
        }
        return res.status(200).json({
          quiz: {
            name,
            description,
            questions,
          },
        });
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Unexpected error occurred' });
  }
});

module.exports = router;
