"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CirclePlus, BringToFront } from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react"; 
import CreateTaskModal from "@/components/createTaskModal"; 
import { useDispatch } from "react-redux";




const Navbar = ({ User }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  
  const handleLogout = () => {
    router.push("/auth/login"); 
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); 
  };

  return (
    <nav className="border-b bg-gradient-to-r from-[#ec008c] to-[#fc6767] rounded-full  shadow-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <BringToFront
          size={32}
          color="white"
          strokeWidth={1.5}
          className="sm:hidden"
        />

        <BringToFront
          size={30}
          color="white "
          strokeWidth={1.5}
          className="hidden sm:block"
        />

        <div className=" sm:hidden">
          <Button
            variant="outline"
            className="flex gap-2"
            onClick={toggleModal}
          >
            <CirclePlus />
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-3 rounded-full">
              <Avatar className="h-7 w-7">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline font-thin">{User.email}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem disabled>
              <div className="flex flex-col items-start">
                <span className="font-medium">{User.username}</span>
                <span className="text-sm text-gray-500">{User.email}</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={handleLogout}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {isModalOpen && (
          <CreateTaskModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
