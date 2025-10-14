
"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator
  } from "@/components/ui/dropdown-menu";

  import {
      Avatar,
    AvatarFallback,
    } from "@/components/ui/avatar"
import { Button } from "./ui/button";

import {useRouter} from "next/navigation"
import { LogOut } from "lucide-react";
import NavItems from "./NavItems";


const UserDropdown = () => {
  const router = useRouter();

  const handleSignOut = async ()=>{
    router.push("sign-in");

  }

  const user ={
    name:"John Doe",
    email:"contact@vamshi.com"
  }
  return (
    <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center rounded-full gap-3 text-gray-400 hover:text-yellow-500"
              aria-label="User menu"
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
                  {user.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium leading-none">{user.name}</span>
                <span className="text-xs text-gray-400">{user.email}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 text-gray-400" align="end" sideOffset={8}>
            <DropdownMenuLabel>
            <div className="flex relative items-center gap-3 py-2">
                 <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-base font-medium leading-none">{user.name}</span>
                  <span className="text-sm leading-none text-gray-400">{user.email}</span>
                  </div>
            </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-600"/>
  <DropdownMenuItem onClick={handleSignOut} className="text-gray-100 text-md font-medium focus:bg-transparent focus:text-yellow-500 transition-colors cursor-pointer">
   <LogOut className="h-4 w-4 mr-2 hidden sm:block" />
        Logout
        </DropdownMenuItem>
        <DropdownMenuSeparator className="hidden sm:block bg-gray-600"/>
        <nav className="sm:hidden">
          <NavItems/>
        </nav>
        </DropdownMenuContent>
          </DropdownMenu>
  )
}

export default UserDropdown