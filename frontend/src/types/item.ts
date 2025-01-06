export type ItemList = {
  data: Item[];
  count: number;
};

export type Item = {
  id: string;
  name: string;
  description?: string;
  price: number;
  created_at: string;
  updated_at?: string | null;
};

export type ItemUpdateModel = ItemCreateModel & {
  id: string;
};

export type ItemCreateModel = {
  name: string;
  description: string | null;
  price: number;
};

export type ItemParam = Partial<{
  id: string;
  name: string;
  price: string;
}>;
