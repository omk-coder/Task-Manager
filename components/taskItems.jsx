"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Edit, Trash } from "lucide-react";

import EditTaskModal from "./EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";

const TaskCard = ({ task, onTaskUpdate }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleUpdateSuccess = () => {
    setIsEditModalOpen(false);
    onTaskUpdate(); //for refecthing the task
  };

  const handleDeleteSuccess = () => {
    setIsDeleteModalOpen(false);
    onTaskUpdate();
  };
  const formatDate = (dateString) => {
    if (!dateString) return ""; // Handle cases where the date is null or undefined
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date"; // Or some other error message
    }
  };
  return (
    <Card className='border border-pink-200 backdrop-blur-sm bg-white/50'> 
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
        <Badge variant={task.priority === "High" ? "destructive" : "secondary"}>
          {task.priority}
        </Badge>
        <div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Edit className="h-4 w-4" aria-label="Edit Task" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <Trash className="h-4 w-4" aria-label="Delete Task" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <h3 className="font-semibold">{task.title}</h3>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1 h-4 w-4" />
          {formatDate(task.dueDate)}
        </div>
        <p className="text-sm text-muted-foreground">{task.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center ">
        <Badge
          variant={task.completed ? "default" : "outline"}
          className="p-1 w-[80px] justify-center"
        >
          {task.completed ? "Completed" : "In Progress"}
        </Badge>
        <Badge variant={"outline"} className="p-1 w-[150px] justify-center">
          {formatDate(task.createdAt)}
        </Badge>
      </CardFooter>

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={setIsEditModalOpen}
        task={task}
        onUpdateSuccess={handleUpdateSuccess}
      />

      <DeleteTaskModal
        isOpen={isDeleteModalOpen}
        onClose={setIsDeleteModalOpen}
        taskId={task._id}
        taskTitle={task.title}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </Card>
  );
};

export default TaskCard;
