import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import connectToDB from "@/utils/database";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try{

        await connectToDB();

        const {email, password}  = await req.json();
        
        const ExisitingUser = await User.findOne({email})
        
        //Case 1 : If user doesn't exist
        
        if (!ExisitingUser){
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }
        
        //Case 2 : password decryption and comparing
        const hashedPass = await bcrypt.compare(password, ExisitingUser.password)
        
        if (!hashedPass) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
          }
      
        
        //Case 3 :  Generating token 
        const token = jwt.sign({ id: ExisitingUser._id, username: ExisitingUser.username, email: ExisitingUser.email  }, process.env.JWT_SECRET, { expiresIn: "7h" });
        return NextResponse.json({ token },  { status: 200 });

    }catch(error){
        console.error("Error Verifying user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }


    ///localStorage.setItem("dtl", JSON.stringify(res.data));
}