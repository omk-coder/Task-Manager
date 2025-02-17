import Task from "@/models/Task";
import connectToDB from "@/utils/database";
import verifyToken from "@/utils/Middleware";
import { NextResponse } from "next/server";


//updating the task based on id


export async function PUT(req,{params}) {
    try {
      await connectToDB();
  
      
      const { user, error } = verifyToken(req);
  
      if (error) {
        return NextResponse.json({ error }, { status: 401 });
      }

      const { title, description, dueDate, priority, completed } = await req.json();
   
      if (!title || !priority) {
        return NextResponse.json({ error: "Title and priority are required" }, { status: 400 });
      }
      const {id} = params

   const updatedTask = await Task.findOneAndUpdate({
      _id: id,
    user: user.id,
      },{title,
      description,
      dueDate,
      priority,
      completed,
    },  { new: true });

    if (!updatedTask) {
        return NextResponse.json({ error: "Task not found or unauthorized" }, { status: 404 });
      }

      return NextResponse.json({ message: "Task created successfully",  updatedTask },
      { status: 201 });
      

    } catch (error) {
      console.error("Error getting tasks:", error.message);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }



  
export async function DELETE(req,{params}) {
    try {
      await connectToDB();
  

      const { user, error } = verifyToken(req);
  
      if (error) {
        return NextResponse.json({ error }, { status: 401 });
      }

      
      
      const {id} = params

   const deleteTask = await Task.findOneAndDelete({
      _id: id,
    user: user.id,
      });

    if (!deleteTask) {
        return NextResponse.json({ error: "Task not found or unauthorized" }, { status: 404 });
      }

      return NextResponse.json({ message: "Task deleted successfully",   },
      { status: 201 });
      

    } catch (error) {
      console.error("Error getting tasks:", error.message);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
