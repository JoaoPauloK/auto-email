import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogOverlay, DialogTitle } from "./ui/dialog";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { MessageCircleQuestionMark } from "lucide-react";

export default function Welcome() {
    const [welcomeOpen, setWelcomeOpen] = useState(false);

    return (
        <Dialog open={welcomeOpen} onOpenChange={setWelcomeOpen}>
            <DialogTrigger asChild>
                <Badge
                    variant="outline"
                    className="gap-1.5 px-2 py-0.5 text-zinc-200 hover:bg-neutral-600 cursor-pointer"
                >
                    <MessageCircleQuestionMark
                        className="-ms-0.5 opacity-60"
                        size={12}
                        aria-hidden="true"
                    />
                    Help
                </Badge>
            </DialogTrigger>
            <DialogContent className="max-w-md text-center text-zinc-200">
                <DialogHeader>
                    <DialogTitle>👋 Bem-vindo ao Email Analyzer</DialogTitle>
                </DialogHeader>
                <p className="text-muted-foreground mb-4 text-sm">
                    Envie um e-mail ou arquivo e descubra se é produtivo. Você
                    receberá uma resposta sugerida automaticamente.
                </p>
                <div className="space-y-2 text-left text-sm text-zinc-400 mb-4">
                    <p>1️⃣ Cole o conteúdo ou envie um arquivo, selecionando <code>Plain Text</code> para colar o texto do email, <code>PDF</code> para enviar um arquivo PDF ou <code>TXT</code> para enviar um arquivo de texto.</p>
                    <p>2️⃣ Clique em “Send”.</p>
                    <p>3️⃣ Veja o resultado e a resposta sugerida.</p>
                    <p>4️⃣ Consulte o histórico a qualquer momento.</p>
                </div>
                <Button variant="outline" className="mx-auto hover:bg-zinc-800" onClick={() => setWelcomeOpen(false)}>Começar</Button>
            </DialogContent>
            <DialogOverlay className="backdrop-blur-sm" />
        </Dialog>
    );
}