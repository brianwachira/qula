import {
  MMKVInstance,
  MMKVLoader,
  useMMKVStorage,
} from 'react-native-mmkv-storage';

const MMKV: MMKVInstance = new MMKVLoader().initialize();

type LiteralUnion<T extends U, U = string> = T | (U & {});

type products = {
  productID: number;
  quantity: number;
};

type defaultObject = {
  email?: string;
  authKey: string;
  phone: string;
  userId: string;
  clientId: string;
  products: products[] | [];
};

export const useStorage = (
  key: LiteralUnion<'user' | 'email' | 'password'>,
  defaultValue?: defaultObject,
) => {
  const [value, setValue] = useMMKVStorage(key, MMKV, defaultValue);
  return [value, setValue] as const;
};
