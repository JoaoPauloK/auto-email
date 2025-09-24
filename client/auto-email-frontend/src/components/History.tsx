import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from "./ui/dialog";
import { History as HistoryIcon } from "lucide-react";
import { listEmails } from "@/services/services";
import { toast } from "sonner";
import type { HistoryResponse } from "@/api/schemas";
import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

export default function History() {
  const [emails, setEmails] = useState<HistoryResponse[]>([]);


  async function loadHistory() {
    try {
        const res = await listEmails();
        setEmails(res.data);
    } catch (error) {
      console.error(error)
      toast('Error loading history', { description: error.toString(), closeButton: true })
    }
  }

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <Dialog onOpenChange={(load) => load && loadHistory()}>
      <DialogTrigger asChild>
      <Badge
          variant="outline"
          className="gap-1.5 text-neutral-200 hover:bg-neutral-700 cursor-pointer"
      >
          <HistoryIcon
              className="-ms-0.5 opacity-60"
              size={12}
              aria-hidden="true"
          />
          History
      </Badge>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[825px] text-neutral-200 max-h-[80vh] overflow-y-auto"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Email History</DialogTitle>
        </DialogHeader>
        <Accordion type="single" collapsible className="w-full">
          {
            emails.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 p-4">
                <p>No history yet</p>
              </div>
            ) : (
              emails.map((email) => (
                <AccordionItem key={email.id} value={email.id.toString()} className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]">
                  <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0">
                    {email.date} - {email.category}: {email.content.substring(0, 50)}...
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-2">
                    <div className="whitespace-pre-wrap">{email.content}</div>
                    <br />
                    {email.answer && <strong>Answer:</strong>}
                    <div className="whitespace-pre-wrap">{email.answer}</div>
                  </AccordionContent>
                </AccordionItem>
              ))
            )
          }
        </Accordion>
      </DialogContent>
      <DialogOverlay className="backdrop-blur-sm" />
    </Dialog>
  )
}