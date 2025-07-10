import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function AddTeacherDialog() {
  return (
    <Dialog>
      <DialogTrigger><div className="bg-primary border rounded-md flex gap-2 items-center p-1 px-3 text-primary-foreground font-medium">Add <Plus size={20}/></div></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add the teachers mail.</DialogTitle>
          <DialogDescription>
            We will send the teacher a mail on how to continue further
          </DialogDescription>
        </DialogHeader>
        <div>
            <Input placeholder="Enter the email of the teacher"/>
        </div>
        <DialogFooter>
            <Button> Send <Send/> </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
