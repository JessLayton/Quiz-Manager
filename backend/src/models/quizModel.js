const mongoose = require('mongoose');
const { quizDb } = require('../dbs');

const questionSchema = new mongoose.Schema({
  question: {
    type: String, required: true, maxLength: 80,
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: (options) => (options.length >= 3 && options.length <= 5),
      message: () => 'Questions must have 3 - 5 options',
    },
  },
  correctOption: {
    type: Number, default: 1, required: true,
  },
});

const quizSchema = new mongoose.Schema({
  name: {
    type: String, required: true, maxLength: 50, unique: true,
  },
  creator: { type: String },
  description: { type: String, required: true, maxLength: 100 },
  questions: { type: [questionSchema], required: true, minlength: 1 },
});

const Quiz = quizDb.model('quiz', quizSchema);

module.exports = Quiz;
