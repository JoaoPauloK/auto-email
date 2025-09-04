import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogOverlay } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast, Toaster } from "sonner";
import { newUser } from "@/services/services";
import { useState } from "react";

export default function NewUser() {
    const [open, setOpen] = useState<boolean>(true);

    function handleSubmitNewUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        newUser(username, password).then(() => {
            toast('User created successfully');
            setOpen(false);
        }).catch(error => {
            throw error;
        })
    }
    return (
        <Dialog open={open}>
            <Toaster />
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
