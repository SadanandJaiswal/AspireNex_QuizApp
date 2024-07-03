import { Schema, model, models } from 'mongoose';

const QuizQuestionSchema = new Schema({
  quizId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Quiz ID is required!'],
    ref: 'Quiz',
    index: true
  },
  type: {
    type: String,
    required: [true, 'Question type is required!'],
    enum: ['single', 'multiple', 'boolean', 'text', 'numerical'],
  },
  level: {
    type: String,
    // required: [true, 'Question level is required!'],
    enum: ['easy', 'medium', 'hard'],
    default: "easy"
  },
  score: {
    type: Number,
    required: [true, 'Score is required!'],
  },
  negativeScore: {
    type: Number,
    default: 0
  },
  question_description: {
    type: String,
    required: [true, 'Question description is required!'],
  },
  numericalAnswer: {
    type: Number,
  },
  booleanAnswer:{
    type: String,
  },
  textAnswer: {
    type: String,
  },
  options: {
    type: [String],
  },
  correctAnswer: {
    type: [Number]
  }
});

const QuizQuestion = models.QuizQuestion || model("QuizQuestion", QuizQuestionSchema); 
// const QuizQuestion = model("QuizQuestion", QuizQuestionSchema); 

export default QuizQuestion;
