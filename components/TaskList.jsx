"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "@/redux/features/taskSlice";
import TaskCard from "./taskItems";
import Spinner from './Spinner'

const TaskList = ({ tasks }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.tasks);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch, refresh]);

  const handleTaskUpdate = () => {
    setRefresh((prev) => !prev);
  };

  if (loading) {
    return <div className='w-[20px] h-[20px]'><Spinner className="text-black" /></div>;
  }

  if (error) {
    return <div>Try Again: {error.message}</div>;
  }

  return (
    <div className="container mx-auto py-4 ">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {tasks.map((task) => (
          <TaskCard
          
            key={task._id}
            task={task}
            onTaskUpdate={handleTaskUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
