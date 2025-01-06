import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, Trash2 } from "lucide-react";

interface ItemDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onDelete: () => void;
  isLoading: boolean;
}

const ItemDeleteDialog = (props: ItemDeleteDialogProps) => {
  const { isOpen, onClose, onOpen, onDelete, isLoading } = props;
  const navigate = useNavigate();

  const onConfirmDelete = () => {
    onDelete();
    onClose();
    navigate({ to: "/items" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={isOpen ? onClose : onOpen} modal>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm" className="h-8 lg:flex">
          <Trash2 />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="pb-4">Delete Item</DialogTitle>
          <DialogDescription className="font-medium">
            Are you sure you want to delete this item? Once deleted, it cannot
            be recovered.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            disabled={isLoading}
            type="submit"
            onClick={onConfirmDelete}
          >
            {isLoading && <Loader2 className="animate-spin" />}
            Yes, Confirm to Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDeleteDialog;
