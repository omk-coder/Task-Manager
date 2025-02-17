"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { deleteTask } from "@/redux/features/taskSlice";
import { toast } from "sonner";

const DeleteTaskModal = ({
  isOpen,
  onClose,
  taskId,
  taskTitle,
  onDeleteSuccess,
}) => {
  const dispatch = useDispatch();

  const handleDeleteTask = async () => {
    try {
      await dispatch(deleteTask(taskId));
      toast.success("Task deleted successfully!");
      onDeleteSuccess(); // Notify the parent component
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast.error(error?.message || "Failed to delete task");
    } finally {
      onClose(false); // Always close the modal
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete <span className="font-medium">{taskTitle}</span> task?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteTask}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTaskModal;
