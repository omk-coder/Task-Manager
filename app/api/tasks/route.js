import Task from "@/models/Task";
import connectToDB from "@/utils/database";
import verifyToken from "@/utils/Middleware";
import { NextResponse } from "next/server";

//Fetch all the task

export async function GET(req) {
  try {
    await connectToDB();

    // Verify token and extract user ID
    const { user, error } = verifyToken(req);

    if (error) {
      return NextResponse.json({ error }, { status: 401 });
    }

    const tasks = await Task.find({ user : user.id });
    
    if (tasks.length === 0) {
      return NextResponse.json({ error: "No tasks found" }, { status: 404 });
    }
    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    console.error("Error getting tasks:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function POST(req) {
    try {
      await connectToDB();
  
      // Verify token and extract user ID
      const { user, error } = verifyToken(req);
  
      if (error) {
        return NextResponse.json({ error }, { status: 401 });
      }

      const { title, description, dueDate, priority, completed } = await req.json();
   
      if (!title || !priority) {
        return NextResponse.json({ error: "Title and priority are required" }, { status: 400 });
      }

   const newTask = new Task({
      user: user.id,
      title,
      description,
      dueDate,
      priority,
      completed,
    });

    await newTask.save();

      return NextResponse.json({ message: "Task created successfully", task: newTask },
      { status: 201 });
      

    } catch (error) {
      console.error("Error getting tasks:", error.message);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
