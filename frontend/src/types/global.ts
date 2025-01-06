export type Pagination = {
  pageIndex: number;
  pageSize: number;
};

export type DialogState<T> = {
  isOpen: boolean;
  toggleModal: () => void;
};
