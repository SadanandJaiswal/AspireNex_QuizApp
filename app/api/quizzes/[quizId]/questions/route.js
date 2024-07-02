// Import necessary modules and models
import { connectToDB } from '@utils/database';
import Quiz from '@models/Quiz'; // Assuming your Quiz model is defined in '@models/Quiz'

export const GET = async (request) => {
    try {
        await connectToDB();

        const quiz = await Quiz.findById().populate('quizQuestions');

        if (!quiz) {
            return new Response("Quiz Not Found", { status: 404 });
        }

        return new Response(JSON.stringify(quiz.quizQuestions), { status: 200 });
    } catch (error) {
        console.error(`Failed to fetch questions for quiz with ID ${params.quizId}`, error);
        return new Response("Failed to fetch questions for quiz", { status: 500 });
    }
};

export const POST = async (request) => {
    try {
        await connectToDB();

        const { questionData } = request.json();

        // Create a new quiz question
        const newQuestion = new QuizQuestion({
            ...questionData,
        });

        // Save the new question to the database
        const savedQuestion = await newQuestion.save();

        // Find the quiz by quizId and update quizQuestions array with new question's ObjectId
        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return new Response("Quiz Not Found", { status: 404 });
        }

        quiz.quizQuestions.push(savedQuestion._id);
        await quiz.save();

        return new Response(JSON.stringify(savedQuestion), { status: 201 });
    } catch (error) {
        console.error(`Failed to create or add question to quiz with ID ${params.quizId}`, error);
        return new Response("Failed to create or add question to quiz", { status: 500 });
    }
};

