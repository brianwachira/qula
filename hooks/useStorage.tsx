import {
  MMKVInstance,
  MMKVLoader,
  useMMKVStorage,
} from 'react-native-mmkv-storage';

const MMKV: MMKVInstance = new MMKVLoader().initialize();

type LiteralUnion<T extends U, U = string> = T | (U & {});

type defaultObject = {
  email?: string;
};

export const useStorage = (
  key: LiteralUnion<'user' | 'email' | 'password'>,
  defaultValue?: defaultObject | null,
) => {
  const [value, setValue] = useMMKVStorage(key, MMKV, defaultValue);
  return [value, setValue] as const;
};
