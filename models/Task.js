import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId,  
        ref: "User", 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        
    },
    dueDate: { 
        type: Date 
    },
    priority: { 
        type: String, 
        enum: ["High", "Medium", "Low"], 
        required: true 
    },
    completed: { 
        type: Boolean, 
        
        default: false 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Task = models.Task || model("Task", TaskSchema);
export default Task;

