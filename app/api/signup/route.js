import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDB  from "@/utils/database";
import User from "@/models/User";

//For signUp User Route

export async function POST(req){
    try{
        //Because of serverless function we need to connect with database    
    await connectToDB();

    const { username, email, password } = await req.json();
    
    //Case 1 : For missing Fields
    if (!username || !email || !password) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
      }
    
    //Case 2 : User Already Exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }
    
    //Case 3 : For New Users, Signup
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    
    await newUser.save();
    
    return NextResponse.json({
        message: "User Created Successfully"
    },{status: 201})

    }catch(error){

        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}