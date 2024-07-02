import User from "@models/user";
import Test from "@models/test";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the user by userId
        const user = await User.findById(params.userId);

        if (!user) {
            return new Response("User Not Found", { status: 404 });
        }

        // Find tests associated with the user
        const tests = await Test.find({ userId: params.userId });

        return new Response(JSON.stringify(tests), { status: 200 });
    } catch (error) {
        console.error(`Failed to fetch tests for user with ID ${params.userId}`, error);
        return new Response("Failed to fetch tests", { status: 500 });
    }
};
