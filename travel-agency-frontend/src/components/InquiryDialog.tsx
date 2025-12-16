import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { api } from "../lib/api";
import { toast } from "sonner";

interface InquiryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  itemTitle: string;
  itemType: "tour" | "car";
  itemId: string | number;
}

export function InquiryDialog({
  isOpen,
  onClose,
  itemTitle,
  itemType,
  itemId,
}: InquiryDialogProps) {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email !== confirmEmail) {
      toast.error("Emails do not match");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post("/inquiries", {
        email,
        type: itemType,
        id: itemId,
        itemTitle,
      });

      setIsSuccess(true);
      toast.success("Inquiry sent successfully! Check your email.");

      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      toast.error("Failed to send inquiry. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setEmail("");
    setConfirmEmail("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open: any) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <DialogHeader>
          <DialogTitle>Make an Inquiry</DialogTitle>
          <DialogDescription>
            Ask for details about:{" "}
            <span className="font-semibold text-[#1B4965]">{itemTitle}</span>
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-6 text-center animate-in fade-in zoom-in duration-300">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-800">Sent!</h3>
            <p className="text-gray-500">We will contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label htmlFor="email">Your Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmEmail">Confirm Email</Label>
              <Input
                id="confirmEmail"
                type="email"
                placeholder="Retype your email"
                required
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                className={
                  confirmEmail && email !== confirmEmail
                    ? "border-red-300 focus-visible:ring-red-300"
                    : ""
                }
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="ghost" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !email || !confirmEmail}
                className="bg-[#E8A628] hover:bg-[#d49622] text-white w-32"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Send <Send className="w-3 h-3 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
