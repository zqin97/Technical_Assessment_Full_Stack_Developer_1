import { SetStateAction, atom, useAtom } from "jotai";

type TDialog = string | undefined;

const dialogAtom = atom<TDialog>(undefined);

export function useDialog<T extends SetStateAction<TDialog>>() {
  const [dialog, setDialog] = useAtom(dialogAtom);

  const handleOpen = (type: T | undefined) => setDialog(type);
  const handleClose = () => setDialog(undefined);

  return [
    dialog,
    { dialogClose: handleClose, dialogOpen: handleOpen },
  ] as const;
}
