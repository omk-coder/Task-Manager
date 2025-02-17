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
  import { useState, useEffect } from "react";
  import { useDispatch } from "react-redux";

  import { toast } from "sonner";
  import { updateTask } from '@/redux/features/taskSlice';

  const EditTaskModal = ({ isOpen, onClose, task, onUpdateSuccess }) => {
    const dispatch = useDispatch();
    const [editedTask, setEditedTask] = useState({
      title: "",
      description: "",
      dueDate: "",
      priority: "",
      completed: false,
    });
  
    // So we are using useEffect instead of directly using reducer cause it will trigger re-render everytime fetch the task so its better to update the particular task and render it on top.  
    useEffect(() => {
      if (task) {
        setEditedTask({
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
          priority: task.priority,
          completed: task.completed,
        });
      }
    }, [task]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedTask({ ...editedTask, [name]: value });
    };
  
    const handleCheckboxChange = (e) => {
      const { name, checked } = e.target;
      setEditedTask({ ...editedTask, [name]: checked });
    };
  
    const handleUpdateTask = async () => {
      try {
        await dispatch(updateTask({ id: task._id, taskData: editedTask }));
        toast.success("Task updated successfully!");
        onUpdateSuccess();
      } catch (error) {
        console.error("Failed to update task:", error);
        toast.error(error?.message || "Failed to update task");
      } finally {
        onClose(false); 
      }
    };
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Make changes to your task here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={editedTask.title}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
            
                id="description"
                name="description"
                value={editedTask.description}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueDate" className="text-right">
                Due Date
              </Label>
              <Input
                type="date"
                id="dueDate"
                name="dueDate"
                required
                value={editedTask.dueDate}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <select
                id="priority"
                name="priority"
                required
                value={editedTask.priority}
                onChange={handleInputChange}
                className="col-span-3 rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="completed" className="text-right">
                Completed
              </Label>
              <Input
                type="checkbox"
                id="completed"
                name="completed"
                checked={editedTask.completed}
                onChange={handleCheckboxChange}
                className="col-span-3 h-4 w-4"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleUpdateTask}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default EditTaskModal;
  