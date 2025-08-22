"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { LogOut, User } from "lucide-react"
import Link from "next/link"
import { CompanyInfo } from "@/lib/types"
import Image from "next/image"

type AppHeaderProps = {
  companyInfo: CompanyInfo | null
}

export function AppHeader({ companyInfo }: AppHeaderProps) {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-card px-6">
       <div className="md:hidden">
         <SidebarTrigger />
       </div>
       <div className="flex items-center gap-2 ml-auto">
        {companyInfo?.logoUrl && (
          <Image src={companyInfo.logoUrl} alt="Company Logo" width={100} height={40} className="object-contain" data-ai-hint="logo" />
        )}
       </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://placehold.co/40x40" alt="Avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Usuário</p>
                <p className="text-xs leading-none text-muted-foreground">
                  usuario@email.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
               <Link href="/login">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
