import { Button } from "@/components/ui/button";
import { useDialog } from "@/hooks/use-dialog";
import { formatCurrency } from "@/lib/utils";
import ItemDeleteDialog from "@/modules/items/item-delete-dialog";
import ItemEditDialog from "@/modules/items/item-edit-dialog";
import {
  useDeleteItemMutation,
  useGetItemQuery,
  useUpdateItemMutation,
} from "@/services/api";
import { API } from "@/types/api";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/items/$itemId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { itemId } = Route.useParams();
  const navigate = useNavigate();
  const [dialog, { dialogOpen, dialogClose }] = useDialog<
    "editItem" | "deleteItem"
  >();

  const { data: item, isLoading, error, isError } = useGetItemQuery(itemId);
  const [updateItem, { isLoading: isUpdating, isSuccess: updateSuccess }] =
    useUpdateItemMutation();
  const [deleteItem, { isLoading: isDeleting, isSuccess: deleteSuccess }] =
    useDeleteItemMutation();

  useEffect(() => {
    if (updateSuccess)
      toast.success("Item Successfully updated", { position: "top-center" });
  }, [updateSuccess]);

  useEffect(() => {
    if (deleteSuccess)
      toast.success("Item Successfully deleted", { position: "top-center" });
  }, [deleteSuccess]);

  useEffect(() => {
    if (isError && error) {
      toast.error((error as API.ErrorResponse).message, {
        position: "top-center",
      });
      navigate({ to: "/items" });
    }
  }, [isError]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex flex-row justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 lg:flex"
          onClick={() => navigate({ to: "/items" })}
        >
          <ArrowLeft />
          <span className="hidden md:block text-lg">
            {"Item Details: " + itemId}
          </span>
        </Button>
        <div className="flex flex-row gap-4 ml-auto">
          {item && (
            <>
              <ItemEditDialog
                isOpen={dialog === "editItem"}
                onClose={dialogClose}
                onOpen={() => dialogOpen("editItem")}
                data={item}
                onUpdate={updateItem}
                isLoading={isUpdating}
              />
              <ItemDeleteDialog
                isOpen={dialog === "deleteItem"}
                onClose={dialogClose}
                onOpen={() => dialogOpen("deleteItem")}
                onDelete={() => deleteItem(itemId)}
                isLoading={isDeleting}
              />
            </>
          )}
        </div>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        {isLoading ? (
          <div className="flex flex-row h-full items-center justify-center gap-6">
            <Loader2 className="animate-spin" size={32} />
            <h1 className="font-bold">Loading...</h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-6 md:gap-y-8 p-8">
            <div>
              <div className="font-bold text-lg">ID</div>
              <div>{item?.id}</div>
            </div>
            <div>
              <div className="font-bold text-lg">Name</div>
              <div>{item?.name}</div>
            </div>
            <div>
              <div className="font-bold text-lg">Price</div>
              <div>{formatCurrency(item?.price ?? 0)}</div>
            </div>
            <div>
              <div className="font-bold text-lg">Created At</div>
              <div>{item?.created_at}</div>
            </div>
            <div>
              <div className="font-bold text-lg">Updated At</div>
              <div>{item?.updated_at ?? "-"}</div>
            </div>
            <div className="col-span-2">
              <div className="font-bold text-lg">Description</div>
              <div>{item?.description ?? "-"}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
