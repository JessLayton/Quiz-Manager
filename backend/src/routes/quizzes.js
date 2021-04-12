const router = require('express').Router();

const Quiz = require('../models/quizModel');
const auth = require('../middleware/auth');
const { isAdmin, isAssessor } = require('../middleware/roles');

router.post('/createQuiz', auth, isAdmin, async ({ user, body: { name, description, questions } }, res) => {
  try {
    if (!name || !description || !questions) {
      return res.status(400).send({ msg: 'Fields cannot be empty' });
    }
    const existingQuiz = await Quiz.findOne({ name });
    if (existingQuiz) {
      res.status(409).send({ msg: `A quiz already exists with this name: ${name}` });
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
    return res.status(500).json({ error: error.message });
  }
});

router.get('/getAllQuizzes', auth, async (req, res) => {
  try {
    Quiz.find({}, (err, quizzes) => res.status(200).json({ quizzes }));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: error });
  }
});

router.post('/getQuiz', auth, async (req, res) => {
  const { id } = req.body;
  try {
    Quiz.findById(id, (error, quiz) => {
      if (error) {
        res.status(500).json({ error });
      }
      if (quiz) {
        res.status(200).json({ quiz });
      } else {
        res.status(404).json({ msg: 'Quiz not found' });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
});

router.post('/getQuestions', auth, async (req, res) => {
  const { id } = req.body;
  try {
    Quiz.findById(
      id,
      { questions: { correctOption: 0 } }, // returns questions without correct option
      (error, quiz) => {
        if (error) {
          res.status(500).json({ error });
        }
        if (quiz) {
          res.status(200).json({ questions: quiz.questions });
        } else {
          res.status(404).json({ msg: 'No quiz questions found' });
        }
      },
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: error });
  }
});

router.post('/assessorGetQuiz', auth, isAssessor, async (req, res) => {
  const { id } = req.body;
  try {
    Quiz.findById(id, (error, quiz) => {
      if (error) {
        res.status(500).json({ error });
      }
      if (quiz) {
        res.status(200).json({ quiz });
      } else {
        res.status(404).json({ msg: 'Quiz not found' });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: error });
  }
});

router.post('/markQuiz', auth, async (req, res) => {
  const { id, answers } = req.body;
  try {
    Quiz.findById(id, (error, quiz) => {
      if (error) {
        res.send(500).json({ error });
      }
      if (quiz) {
        const correctAnswers = [];
        quiz.questions.forEach((question) => {
          correctAnswers.push(question.options[question.correctOption - 1]);
        });
        let score = 0;
        correctAnswers.forEach((correctAnswer, index) => {
          if (answers[index] === correctAnswer) {
            score += 1;
          }
        });
        const result = (score / answers.length) * 100;
        res.status(200).json({ result });
      } else {
        res.status(404).json({ msg: 'Quiz not found' });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: error });
  }
});

router.delete('/deleteQuiz/:id', auth, isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await Quiz.deleteOne({ _id: id }, (error, quizResponse) => {
      if (error) {
        return res.status(500).json({ err: error });
      }
      return res.status(200).json({ response: quizResponse });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: error });
  }
});

router.put('/updateQuiz/:id', auth, isAdmin, async (req, res) => {
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
    Quiz.findOneAndUpdate({ _id: id },
      {
        name,
        description,
        questions,
      },
      { new: true }, // returns updated quiz
      (quizError) => {
        if (quizError) {
          return res.status(500).json({ err: quizError });
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
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;