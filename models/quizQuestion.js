import { Schema, model, models } from 'mongoose';

const QuizQuestionSchema = new Schema({
  type: {
    type: String,
    required: [true, 'Question type is required!'],
    enum: ['multiple-choice-single', 'multiple-choice-multiple', 'true-false', 'text', 'numerical'],
  },
  level: {
    type: String,
    required: [true, 'Question level is required!'],
    enum: ['easy', 'medium', 'hard'],
  },
  score: {
    type: Number,
    required: [true, 'Score is required!'],
  },
  negativeScore: {
    type: Number,
  },
  question_description: {
    type: String,
    required: [true, 'Question description is required!'],
  },
  numericalAnswer: {
    type: Number,
  },
  textAnswer: {
    type: String,
  },
  options: {
    type: [String],
    validate: {
      validator: function(v) {
        return v == null || v.length > 0;
      },
      message: 'Options should contain at least one element!',
    },
  },
  correctAnswer: {
    type: Schema.Types.Mixed,
    required: [true, 'Correct answer is required!'],
  }
});

const QuizQuestion = models.Test || model("QuizQuestion", QuizQuestionSchema); 

export default QuizQuestion;
