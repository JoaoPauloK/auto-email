import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import { Textarea } from "./components/ui/textarea";
import FileUploader from "./components/FileUploader";
import { Button } from "./components/ui/button";
import { toast, Toaster } from "sonner";
import { sendFileData, sendTextData } from "./services/services";
import type { FileMetadata } from "./hooks/use-file-upload";
import { useAuth } from "@/provider/authProvider";
import type { AxiosResponse } from "axios";
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

export type EmailType = "plain" | "pdf" | "txt";

export interface ResultDialogProps {
    category?: "produtiva" | "improdutiva";
    answer?: string;
}

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
            sendTextData(content!, auth?.isAuthenticated)
                .then((res: AxiosResponse) => {
                    toast("Email send, please wait...");
                    setResult({
                        category:
                            res.data.category.toLowerCase(),
                        answer: res.data.answer.content,
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
                throw Error('Invalid filetype')
            }
            const formData = new FormData();
            
            formData.append('file', file);
            sendFileData(formData)
                .then((res) => {
                    toast("File sent, please wait...");
                    setResult({
                        category:
                            res.data.category.toLowerCase(),
                        answer: res.data.answer.content,
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
        <div className="bg-neutral-800 min-h-screen w-screen m-0 px-30">
            <Toaster />
            <Navbar setInputType={setInputType} />
            {inputArea}
            <Button
                variant="outline"
                className="text-neutral-400 rounded-xl mt-5 cursor-pointer hover:bg-neutral-700"
                onClick={() => sendContent()}
            >
                Send
            </Button>
            <Dialog open={!!result} onOpenChange={() => setResult(undefined)}>
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
						{result?.category === 'produtiva' ? <ThumbsUp /> : <ThumbsDown />}
                    </div>
                    <p>{result?.category === 'produtiva' ? result?.answer : 'No answer needed'}</p>
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
    );
}

export default App;
