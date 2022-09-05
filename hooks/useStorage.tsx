import {
  MMKVInstance,
  MMKVLoader,
  useMMKVStorage,
} from 'react-native-mmkv-storage';
import {defaultStorageObject} from '../types/types';

const MMKV: MMKVInstance = new MMKVLoader().initialize();

type LiteralUnion<T extends U, U = string> = T | (U & {});

export const useStorage = (
  key: LiteralUnion<'user' | 'email' | 'password'>,
  defaultValue?: defaultStorageObject,
) => {
  const [value, setValue] = useMMKVStorage(key, MMKV, defaultValue);
  return [value, setValue] as const;
};
