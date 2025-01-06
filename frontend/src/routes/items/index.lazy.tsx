import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDialog } from "@/hooks/use-dialog";
import { itemColumns } from "@/modules/items/columns";
import ItemCreateDialog from "@/modules/items/item-create-dialog";
import { ItemDataTable } from "@/modules/items/item-data-table";
import { useCreateItemMutation, useGetItemsQuery } from "@/services/api";
import {
  createLazyFileRoute,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const Route = createLazyFileRoute("/items/")({
  component: RouteComponent,
});

interface ItemListFilterProps {
  id: string;
  name: string;
  price: string;
}

function RouteComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dialog, { dialogOpen, dialogClose }] = useDialog<"createItem">();
  const [queryParams, setQueryParams] = useState<Partial<ItemListFilterProps>>({
    id: new URLSearchParams(location.search).get("id") || undefined,
    name: new URLSearchParams(location.search).get("name") || undefined,
    price: new URLSearchParams(location.search).get("price") || undefined,
  });

  const form = useForm<ItemListFilterProps>({
    defaultValues: {
      id: new URLSearchParams(location.search).get("id") || "",
      name: new URLSearchParams(location.search).get("name") || "",
      price: new URLSearchParams(location.search).get("price") || "",
    },
  });

  const { data: items, isError } = useGetItemsQuery(queryParams);
  const [createItem, { isLoading, isSuccess }] = useCreateItemMutation();

  useEffect(() => {
    if (isSuccess)
      toast.success("Item Successfully created", { position: "top-center" });
  }, [isSuccess]);

  useEffect(() => {
    if (isError)
      toast.error("Failed to fetch items", { position: "top-center" });
  }, [isError]);

  const onSearch = form.handleSubmit((values) => {
    const filteredValues = Object.entries(values).reduce(
      (acc: Partial<ItemListFilterProps>, [key, value]) => {
        if (value && value.length > 0) {
          acc[key as keyof ItemListFilterProps] = value;
        }
        return acc;
      },
      {}
    );
    navigate({ to: "/items", search: filteredValues });
    setQueryParams((prev) => ({ ...prev, ...filteredValues }));
  });

  const onReset = () => {
    form.reset({
      id: "",
      name: "",
      price: "",
    });
    setQueryParams({});
    navigate({ to: "/items" });
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Form {...form}>
        <form onSubmit={onSearch} onReset={onReset}>
          <div className="bg-muted/50 rounded-xl border p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pb-4">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-[0.5fr_3fr] items-center gap-y-2 gap-x-3 space-y-0">
                    <FormLabel>ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-[0.5fr_3fr] items-center gap-y-2 md:gap-y-3 gap-x-3 space-y-0">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-[0.5fr_3fr] items-center gap-y-2 md:gap-y-3 gap-x-3 space-y-0">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" step={0.01} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row gap-4 justify-end">
              <Button variant="secondary" className="rounded-lg" type="reset">
                Reset
              </Button>
              <Button type={"submit"} className="rounded-lg">
                Search
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <div className="flex-1 rounded-xl md:min-h-min">
        <ItemDataTable
          columns={itemColumns}
          onCreateItemDialog={() => dialogOpen("createItem")}
          data={items?.data || []}
        />
      </div>
      <ItemCreateDialog
        isOpen={dialog === "createItem"}
        onClose={dialogClose}
        onCreate={createItem}
        isLoading={isLoading}
      />
    </div>
  );
}
