import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import { Textarea } from "./components/ui/textarea";
import FileUploader from "./components/FileUploader";
import { Button } from "./components/ui/button";
import { toast, Toaster } from "sonner";
import { sendFileData, sendTextData } from "./services/services";
import type { FileMetadata } from "./hooks/use-file-upload";
import { useAuth } from "@/provider/authProvider";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import type { TCategories, SendEmailResponse } from "./api/schemas";
import Footer from "./components/Footer";

export type EmailType = "plain" | "pdf" | "txt";

export type ResultDialogProps = Partial<
    Pick<SendEmailResponse, "category" | "answer">
>;

function App() {
    const auth = useAuth();
    const [inputType, setInputType] = useState<EmailType>("plain");
    const [file, setFile] = useState<File | FileMetadata>();
    const [result, setResult] = useState<ResultDialogProps>();
    let inputArea: React.ReactNode;

    function sendContent() {
        if (inputType === "plain") {
            const content = (
                document.getElementById(
                    "emailPlain"
                ) as HTMLTextAreaElement | null
            )?.value;
            if (!content) {
                toast("Email text must be provided!");
            }
            toast("Email sent, please wait...");
            sendTextData(content!, auth?.isAuthenticated)
                .then((res) => {
                    setResult({
                        category: res.data.category,
                        answer: res.data.answer,
                    });
                })
                .catch((error) => {
                    console.error(error);
                    toast("Error sendind text", {
                        description: error.response?.statusText,
                    });
                });
        } else if (inputType === "pdf" || inputType === "txt") {
            console.log(file);
            if (!file) {
                toast("A file must be provided!");
                return;
            }
            if (!(file instanceof File)) {
                throw Error("Invalid filetype");
            }
            const formData = new FormData();

            formData.append("file", file);
            toast("File sent, please wait...");
            sendFileData(formData)
                .then((res) => {
                    setResult({
                        category: res.data.category as TCategories | undefined,
                        answer: res.data.answer,
                    });
                })
                .catch((error) => {
                    toast("Error sending file", {
                        description: error.response.statusText,
                    });
                });
        }
    }

    switch (inputType) {
        case "plain":
            inputArea = (
                <Textarea
                    id="emailPlain"
                    className="text-neutral-400 mt-5 h-48"
                    placeholder="Email text here..."
                />
            );
            break;
        case "pdf":
            inputArea = <FileUploader fileType=".pdf" onFileChange={setFile} />;
            break;
        case "txt":
            inputArea = <FileUploader fileType=".txt" onFileChange={setFile} />;
            break;
    }
    console.log(inputType, inputArea);
    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-neutral-800 flex-1 flex flex-col w-screen m-0 px-30">
                <Toaster />
                <Navbar setInputType={setInputType} />
                {inputArea}
                <Button
                    variant="outline"
                    className="text-neutral-400 rounded-xl mt-5 cursor-pointer hover:bg-neutral-700 w-24"
                    onClick={() => sendContent()}
                >
                    Send
                </Button>
                <Dialog
                    open={!!result}
                    onOpenChange={() => setResult(undefined)}
                >
                    <DialogContent className="text-neutral-400">
                        <DialogHeader>
                            <DialogTitle>Result</DialogTitle>
                            <DialogDescription>
                                Received result for the email
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex align-text-bottom">
                            <h3
                                className={`text-3xl mr-5 ${
                                    result?.category == "produtiva"
                                        ? "text-green-600"
                                        : "text-neutral-500"
                                }`}
                            >
                                {result?.category}
                            </h3>
                            {result?.category === "produtiva" ? (
                                <ThumbsUp />
                            ) : (
                                <ThumbsDown />
                            )}
                        </div>
                        <p>
                            {result?.category === "produtiva"
                                ? result?.answer
                                : "No answer needed"}
                        </p>
                        <DialogFooter className="mt-4">
                            <DialogClose asChild>
                                <Button
                                    variant="outline"
                                    className="cursor-pointer hover:bg-neutral-900"
                                >
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                    <DialogOverlay className="backdrop-blur-sm" />
                </Dialog>
            </div>
            <Footer />
        </div>
    );
}

export default App;
