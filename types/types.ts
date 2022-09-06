export type product = {
  id: number;
  name: string;
  description: string;
  in_stock: string;
  cost: number;
  image_path: string;
};
export type RootStackParamList = {
  GetStarted: undefined;
  Auth: undefined;
  Home: undefined;
  Liked: undefined;
  Orders: undefined;
  Cart: undefined;
  ProfileStack: undefined;
  Otp: {
    phone: string;
    otp: string;
    authKey: string;
    userId: string;
    clientId: string;
  };
  HomeTab: {
    screen:
      | 'HomeStack'
      | 'OrdersStack'
      | 'CartStack'
      | 'ProfileStack'
      | 'SearchResults'
      | 'RestuarantDetails'
      | 'FoodDetails'
      | 'EditProfile';
  };
  SearchResults: undefined;
  RestuarantDetails: {
    token: string;
    clientId: string;
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    image_path: string;
  };
  FoodDetails: {product: product};
  EditProfile: undefined;
  Checkout: undefined;
};

// type categories
export type Icategories = {
  id: number;
  category: string;
};

//type merchants
export type Imerchants = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  api_key: string;
  api_secret: string;
  status: number;
  updated_at: string;
  image_path: string;
};

export type cartItem = {
  productID: number;
  quantity: number;
};

export interface cartProduct extends product {
  quantity: number;
}

export type defaultStorageObject = {
  email?: string;
  authKey: string;
  phone: string;
  userId: string;
  clientId: string;
  products: cartProduct[];
};
