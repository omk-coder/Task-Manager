"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CreateTaskModal from "./createTaskModal"; 

function CreateTaskButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="hidden sm:block sm:rounded-full sm:w-auto sm:flex sm:items-center sm:justify-between sm:bg-gradient-to-r from-[#ec008c] to-[#fc6767] sm:text-white hover:cursor-pointer md:w-[450px] md:h-[50px] fixed bottom-0 left-0 w-full z-50 md:left-1/2 md:-translate-x-1/2 mb-4"
        onClick={() => setOpen(true)}
      >
        <span className="md:text-base font-bold ">+ Create new task</span>
        <div className="flex items-center space-x-2">
          <span className="text-xs">⌘</span>
          <span className="text-xs">N</span>
        </div>
      </Button>

      <CreateTaskModal isOpen={open} onClose={setOpen} />
    </>
  );
}

export default CreateTaskButton;
