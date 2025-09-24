import { Badge } from "@/components/ui/badge";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import LoginModal from "./Login";
import { useAuth } from "@/provider/authProvider";
import type { EmailType } from "@/App";
import NewUser from "./NewUser";
import History from "./History";

const navigationLinks = [
    { href: "#", label: "Plain Text", active: true, inputType: 'plain' },
    { href: "#", label: "PDF" , inputType: 'pdf'},
    { href: "#", label: "TXT", inputType: 'txt' },
];

interface NavbarProps {
  setInputType: (arg: EmailType) => void;
}

export function Navbar({ setInputType }: NavbarProps) {
    const auth = useAuth();

    return (
        <header className="border-b px-4 md:px-6 border-neutral-500">
            <div className="flex h-16 justify-between gap-4">
                <div className="flex gap-2">
                    <div className="flex items-center gap-6">
                        <NavigationMenu className="h-full *:h-full max-md:hidden">
                            <NavigationMenuList className="h-full gap-2">
                                {navigationLinks.map((link, index) => (
                                    <NavigationMenuItem
                                        key={index}
                                        className="h-full"
                                        onClick={() => setInputType(link.inputType as EmailType)}
                                    >
                                        <NavigationMenuLink
                                            active={link.active}
                                            href={link.href}
                                            className="text-neutral-400 hover:text-neutral-50 border-b-primary hover:border-b-neutral-300 data-[active]:border-b-primary h-full justify-center rounded-none border-y-2 border-transparent py-1.5 font-medium hover:bg-transparent data-[active]:bg-transparent!"
                                        >
                                            {link.label}
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="outline"
                            className={`gap-1.5 ${
                                auth?.isAuthenticated
                                    ? "text-emerald-500"
                                    : "text-red-500"
                            }`}
                        >
                            <span
                                className={`size-1.5 rounded-full ${
                                    auth?.isAuthenticated
                                        ? "bg-emerald-500"
                                        : "bg-red-500"
                                }`}
                                aria-hidden="true"
                            ></span>
                            {auth?.isAuthenticated ? "Online" : "Offline"}
                        </Badge>
                        {auth?.isAuthenticated && (
                            <History />
                        )}
                        {auth?.isAuthenticated ? (
                            <auth.logout />
                        ) : (
                            <>
                            <LoginModal />
                            <NewUser />
                            </>
                            
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
