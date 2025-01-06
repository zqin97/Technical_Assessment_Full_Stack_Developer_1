import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axios-base-query";
import { Item, ItemList, ItemParam, ItemUpdateModel } from "@/types/item";
import { format } from "date-fns";

export const api = createApi({
  reducerPath: "Api",
  baseQuery: axiosBaseQuery({
    transformResponse: (response) => response,
  }),
  tagTypes: ["Items"],
  endpoints: (builder) => ({
    getItems: builder.query<ItemList, Partial<ItemParam>>({
      query: (params) => ({
        url: `items`,
        method: "GET",
        params: { ...params },
      }),
      transformResponse: (response: ItemList) => {
        return {
          data: response.data.map((item) => ({
            ...item,
            created_at: format(
              new Date(Number(item.created_at) * 1000),
              "yyyy-MM-dd"
            ),
            updated_at: item.updated_at
              ? format(new Date(Number(item.updated_at) * 1000), "yyyy-MM-dd")
              : null,
          })),
          count: response.count,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Items" as const, id })),
              { type: "Items", id: "LIST" },
            ]
          : [{ type: "Items", id: "LIST" }],
    }),
    getItem: builder.query<Item, string>({
      query: (id) => `items/${id}`,
      transformResponse: (item: Item) => {
        return {
          ...item,
          created_at: format(
            new Date(Number(item.created_at) * 1000),
            "yyyy-MM-dd HH:mm:ss"
          ),
          updated_at: item.updated_at
            ? format(
                new Date(Number(item.updated_at) * 1000),
                "yyyy-MM-dd HH:mm:ss"
              )
            : null,
        };
      },
      providesTags: (result, error, id) => [{ type: "Items", id }],
    }),
    createItem: builder.mutation({
      query: (input) => ({
        url: `items`,
        method: "POST",
        data: input,
      }),
      invalidatesTags: [{ type: "Items", id: "LIST" }],
    }),
    updateItem: builder.mutation<Item, ItemUpdateModel>({
      query: ({ id, ...input }) => ({
        url: `items/${id}`,
        method: "PUT",
        data: input,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Items", id }],
    }),
    deleteItem: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `items/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          api.util.updateQueryData("getItems", {}, (draft) => {
            draft.data = draft.data.filter((item) => item.id !== id);
          })
        );
        queryFulfilled.catch(patchResult.undo);
      },
      invalidatesTags: (result, error, id) => [{ type: "Items", id: "LIST" }],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = api;
