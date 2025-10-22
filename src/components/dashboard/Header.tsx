import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "../ui/avatar";

export default function Header() {
    return (
        <header className="flex items-center justify-between border-b bg-white px-6 py-3">
            <div className="flex items-center gap-2 text-lg front-semibold">Panel de control</div>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400"/>
                    <Input placeholder="Buscar..." className="pl-8 w-64"/>
                </div>
                <Avatar>
                    <AvatarFallback>GM</AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}