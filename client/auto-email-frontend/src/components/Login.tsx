import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogOverlay,
} from "@/components/ui/dialog";
import { toast, Toaster } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/provider/authProvider";

export default function LoginModal() {
    const auth = useAuth();

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        auth?.login(username, password).then(() => {
            toast('Login successfully!')
        }).catch(err => {
            console.error(err.response)
            toast('Authentication failed', { description: err.response.statusText, closeButton: true })
        })
    }

    return (
        <Dialog>
            <Toaster />
            <DialogTrigger asChild>
                <Badge
                    variant="outline"
                    className="gap-1.5 px-2 py-0.5 text-neutral-200 hover:bg-neutral-600"
                >
                    <Button className="-ms-0.5 size-1.5 text-xs cursor-pointer">
                        Login
                    </Button>
                </Badge>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[425px] text-neutral-200"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <form onSubmit={handleLogin}>
                    <DialogHeader>
                        <DialogTitle>Login</DialogTitle>
                        <DialogDescription>
                            Enter your credentials to access your account.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 mt-5">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Email / Username</Label>
                            <Input
                                id="name-1"
                                name="username"
                                placeholder="example@email.com"
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Password</Label>
                            <Input
                                id="username-1"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                className="cursor-pointer hover:bg-neutral-900"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            variant="outline"
                            type="submit"
                            className="cursor-pointer hover:bg-neutral-900 text-green-500"
                        >
                            Login
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
            <DialogOverlay className="backdrop-blur-sm" />
        </Dialog>
    );
}
