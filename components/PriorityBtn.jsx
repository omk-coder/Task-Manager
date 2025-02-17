"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";

export default function FilterBar({ onFilterChange }) {
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const handlePriorityChange = (value) => {
    console.log("Priority changed:", value); // function for filtering based on Priority
    setPriority(value);
    onFilterChange(value, status, filterBy, sortOrder);
  };

  const handleStatusChange = (value) => { //Sorting 
    setStatus(value);
    onFilterChange(priority, value, filterBy, sortOrder);
  };

  const handleFilterChange = (value) => { //Due date and title 
    setFilterBy(value);
    onFilterChange(priority, status, value, sortOrder);
  };

  const handleSortChange = (value) => { //A-z z-A
    setSortOrder(value);
    onFilterChange(priority, status, filterBy, value);
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center items-center ">
      <Select onValueChange={handlePriorityChange}>
        <SelectTrigger className="flex-1 sm:flex-none sm:w-[100px] rounded-full ">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="High">High</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="Low">Low</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={handleStatusChange}>
        <SelectTrigger className="flex-1 sm:flex-none sm:w-[100px] rounded-full">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Completed">Completed Tasks</SelectItem>
          <SelectItem value="Pending">Pending Tasks</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={handleFilterChange}>
        <SelectTrigger className="flex-1 sm:flex-none sm:w-[100px] rounded-full">
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date">Due Date</SelectItem>
          <SelectItem value="title">Title</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={handleSortChange}>
        <SelectTrigger className="flex-1 sm:flex-none sm:w-[100px] rounded-full">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="A-Z">A-Z</SelectItem>
          <SelectItem value="Z-A">Z-A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
