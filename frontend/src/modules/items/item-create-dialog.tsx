import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ItemCreateModel } from "@/types/item";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { itemFormSchema } from "./schema";

interface ItemEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: ItemCreateModel) => void;
  isLoading: boolean;
}

const ItemCreateDialog = (props: ItemEditDialogProps) => {
  const { isOpen, onClose, onCreate, isLoading } = props;

  const form = useForm<z.infer<typeof itemFormSchema>>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: undefined,
    },
  });

  const onDialogClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = form.handleSubmit((data) => {
    onCreate({ ...data });
    onDialogClose();
  });

  return (
    <Dialog open={isOpen} onOpenChange={onDialogClose} modal>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Item</DialogTitle>
          <DialogDescription>
            Fill in the information for your item here. Click create when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-1 gap-x-8 gap-y-4 pb-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-[1fr_3fr] items-center gap-y-2 md:gap-y-3 gap-x-3 space-y-0">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-[1fr_3fr] items-center gap-y-2 gap-x-3 space-y-0">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-[1fr_3fr] items-center gap-y-2 md:gap-y-3 gap-x-3 space-y-0">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" step={0.01} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={onDialogClose} type="button">
                Cancel
              </Button>
              <Button disabled={isLoading} type="submit">
                {isLoading && <Loader2 className="animate-spin" />}
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ItemCreateDialog;
