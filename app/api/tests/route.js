import Test from "@models/test";
import Quiz from "@models/quiz";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    try {
        await connectToDB();

        const { testData } = await request.json();

        // Find the quiz by quizId
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return new Response("Quiz Not Found", { status: 404 });
        }

        // Create a new test
        const newTest = new Test({
            ...testData,
        });

        const savedTest = await newTest.save();

        return new Response(JSON.stringify(savedTest), { status: 201 });
    } catch (error) {
        console.error("Failed to start test", error);
        return new Response("Failed to start test", { status: 500 });
    }
};
