

import { NextResponse } from "next/server";
import connectToDB from "@/utils/database";
import User from "@/models/User";
import verifyToken from "@/utils/Middleware";

export async function GET(req) {
    try {
        await connectToDB();

        // Verify JWT Token
        const { user, error } = verifyToken(req);
        if (error) {
            return NextResponse.json({ error }, { status: 401 });
        }

        // Fetch User from Database
        const userData = await User.findById(user.id).select("-password");
        if (!userData) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(userData);

    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
