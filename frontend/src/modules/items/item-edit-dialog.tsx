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
import { Input } from "@/components/ui/input";
import { Item, ItemUpdateModel } from "@/types/item";
import { Edit, Loader2 } from "lucide-react";
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
  onOpen: () => void;
  data?: Item;
  onUpdate: (data: ItemUpdateModel) => void;
  isLoading: boolean;
}

const ItemEditDialog = (props: ItemEditDialogProps) => {
  const { isOpen, onClose, onOpen, data: item, onUpdate, isLoading } = props;

  const form = useForm<z.infer<typeof itemFormSchema>>({
    resolver: zodResolver(itemFormSchema),
    values: {
      name: item!.name,
      description: item?.description ?? null,
      price: item!.price,
    },
  });

  const onDialogClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = form.handleSubmit((data) => {
    onUpdate({ id: item!.id, ...data });
    onDialogClose();
  });

  return (
    <Dialog open={isOpen} onOpenChange={isOpen ? onDialogClose : onOpen} modal>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 lg:flex">
          <Edit />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogDescription>
            Make changes to your item here. Click save when you're done.
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
              <Button
                disabled={!form.formState.isDirty || isLoading}
                type="submit"
              >
                {isLoading && <Loader2 className="animate-spin" />}
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ItemEditDialog;
