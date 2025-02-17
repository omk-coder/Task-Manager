"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { createTask } from "@/redux/features/taskSlice";

const CreateTaskModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    completed: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNewTask({ ...newTask, [name]: checked });
  };

  const handleCreateTask = async () => {
    try {
      await dispatch(createTask(newTask));
      toast.success("Task created successfully!");
      onClose(false);
      setNewTask({
        title: "",
        description: "",
        dueDate: "",
        priority: "Low",
        completed: false,
      });
    } catch (error) {
      console.error("Failed to create task:", error);
      toast.error(error?.message || "Failed to create task");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" max-w-[95vw] sm:max-w-[500px] bg-white rounded-xl shadow-lg p-6 overflow-y-auto max-h-[80vh]">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-semibold text-gray-900 text-center">
            Create New Task
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-center">
            Add details to create your new task.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          <div className="flex flex-col">
            <Label htmlFor="title" className="text-gray-700 font-medium mb-2">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              className="border rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="flex flex-col">
            <Label
              htmlFor="description"
              className="text-gray-700 font-medium mb-2"
            >
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              className="border rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              placeholder="Enter task description"
              rows="3"
              required
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="dueDate" className="text-gray-700 font-medium mb-2">
              Due Date
            </Label>
            <Input
              type="date"
              id="dueDate"
              name="dueDate"
              value={newTask.dueDate}
              onChange={handleInputChange}
              className="border rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              required
            />
          </div>

          <div className="flex flex-col">
            <Label
              htmlFor="priority"
              className="text-gray-700 font-medium mb-2"
            >
              Priority
            </Label>
            <select
              id="priority"
              name="priority"
              value={newTask.priority}
              onChange={handleInputChange}
              className="border rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Label htmlFor="completed" className="text-gray-700 font-medium">
              Completed
            </Label>
            <Input
              type="checkbox"
              id="completed"
              name="completed"
              checked={newTask.completed}
              onChange={handleCheckboxChange}
              className="h-5 w-5 text-indigo-600 rounded focus:ring focus:ring-indigo-200 border-gray-300"
            />
          </div>
        </div>

        <DialogFooter className="mt-8">
          <Button
            type="button"
            onClick={handleCreateTask}
            className="w-full bg-indigo-600 text-white hover:bg-indigo-500 focus:ring focus:ring-indigo-200 transition duration-200 rounded-md py-3 font-semibold"
          >
            Create Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskModal;
