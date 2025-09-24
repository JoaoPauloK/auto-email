import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogOverlay } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast, Toaster } from "sonner";
import { newUser } from "@/services/services";
import { Badge } from "./ui/badge";

export default function NewUser() {
    function handleSubmitNewUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("username") as string;
        const password = formData.get("password") as string;
        if (!email || !password) {
            toast('Email and password are required', { description: 'Please provide both email and password', closeButton: true })
            return;
        }
        newUser(email, password).then(() => {
            toast('User created successfully');
        }).catch(error => {
            toast('Error creating user', { description: error.response.data.message, closeButton: true  })
        })
    }
    return (
        <Dialog>
            <Toaster />
            <DialogTrigger asChild>
                <Badge
                    variant="outline"
                    className="gap-1 px-2 py-0.5 text-neutral-200 hover:bg-neutral-600"
                >
                    <Button className="size-1.5 mx-6.5 text-xs cursor-pointer">
                        Create Account
                    </Button>
                </Badge>
            </DialogTrigger>
            <DialogContent className="text-neutral-400">
                <form onSubmit={handleSubmitNewUser}>
                    <DialogHeader>
                        <DialogTitle>New Account</DialogTitle>
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
                            Create
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
            <DialogOverlay className="backdrop-blur-sm" />
        </Dialog>
    );
}
