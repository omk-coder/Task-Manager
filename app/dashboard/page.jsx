


'use client'

import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import FilterBar from '@/components/PriorityBtn'
import TaskList from '@/components/TaskList'
import CreateTaskButton from "@/components/createTaskBtn";

export default function Page() {

  const User = useSelector((state) => state.auth.currentUser);
  const {tasks}  = useSelector((state) => state.tasks);
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    setFilteredTasks(tasks); // Initialize filteredTasks with all tasks on initial load or when tasks change
  }, [tasks]);
  const handleFilterChange = (priority, status, filterBy, sortOrder) => {
    let updatedTasks = [...tasks]; // Create a new array
  
    if (priority) {
      updatedTasks = updatedTasks.filter(task => task.priority === priority);
    console.log(updatedTasks)
    
    }
  
    if (status) {
      if (status === "Completed") {
        updatedTasks = updatedTasks.filter(task => task.completed === true);
      } else if (status === "Pending") {
        updatedTasks = updatedTasks.filter(task => task.completed === false);
      }
    }
  
    if (sortOrder) {
      if (sortOrder === "A-Z") {
        updatedTasks = [...updatedTasks].sort((a, b) => a.title.localeCompare(b.title)); // Create copy before sorting
      } else if (sortOrder === "Z-A") {
        updatedTasks = [...updatedTasks].sort((a, b) => b.title.localeCompare(a.title)); // Create copy before sorting
      }
    }
  
    if (filterBy === "date") {
      updatedTasks = [...updatedTasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)); // Create copy before sorting
    }
  
    setFilteredTasks(updatedTasks);
  };
  return (
    <div className="min-h-screen bg-stone-50" >
      <div className="container mx-auto p-4 space-y-6 ">
        <Navbar User={User} />

        <main className=" mx-auto p-4 space-y-6  shadow-md rounded-sm ">
          <FilterBar onFilterChange={handleFilterChange} />
          <div >
            <TaskList tasks={filteredTasks} />
          </div>
          <div className='flex justify-center '>
            <CreateTaskButton />
          </div>
        </main>
      </div>
    </div>
  );
}
   