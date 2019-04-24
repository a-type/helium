export type InputConfig<T> = {
  value: T;
  onChange?: (value: T) => void;
};

export const useInput = <T extends any>({
  value,
  onChange,
}: InputConfig<T>) => {};
