import { HTMLAttributes } from 'react';

export type AlertDialogConfig = {
  title?: string;
  label?: string;
  name: string;
};

export const useAlertDialog = ({
  title,
  label,
  name,
}: AlertDialogConfig): [
  HTMLAttributes<HTMLElement>,
  HTMLAttributes<HTMLElement>
] => {
  if (!title && !label) {
    throw new Error(`When using an alert dialog, a title or label is required`);
  }

  const dialogId = `${name}AlertDialog`;
  const titleId = `${name}AlertTitle`;

  const dialogProps = {
    id: dialogId,
    role: 'alertdialog',
    ...(title
      ? {
          'aria-labelledby': titleId,
        }
      : {
          'aria-label': label,
        }),
  };

  const titleProps = {
    id: titleId,
  };

  return [dialogProps, titleProps];
};
