export type product = {
  id: number;
  name: string;
  category_id: number;
  description: string;
  in_stock: string;
  cost: number;
  image_path: string;
};
export type productWithRestuarantId = {
  restuarantId: number;
  id: number;
  name: string;
  category_id: number;
  description: string;
  in_stock: string;
  cost: number;
  image_path: string;
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
  location: string;
  api_key: string;
  api_secret: string;
  status: number;
  updated_at: string;
  image_path: string;
};
export type IOrder = {
  id: number;
  name: string;
  status: number;
  order_id: number;
  product_id: number;
  quantity: number;
  image_path: string;
};
export type IOrderBulk = {
  id: string;
  merchant: string;
  to_deliver: string;
  status: number;
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
    authKey: string;
    clientId: string;
    names: string;
    username: string;
    email: string;
    image: string;
    phone: string;
    otp: string;
    userId: string;
  };
  HomeTab: {
    screen:
      | 'Home'
      | 'Orders'
      | 'Cart'
      | 'Profile'
      | 'SearchResults'
      | 'RestuarantDetails'
      | 'FoodDetails'
      | 'EditProfile';
  };
  SearchResults: {
    token: string;
    clientId: string;
    merchants: Imerchants[];
  };
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
  FoodDetails: {product: productWithRestuarantId};
  EditProfile: undefined;
  Checkout: undefined;
  OrderDetails: {
    token: string;
    orderId: string;
  };
};

export type cartItem = {
  productID: number;
  quantity: number;
};

export interface cartProduct {
  id: number;
  name: string;
  description: string;
  in_stock: string;
  cost: number;
  image_path: string;
  quantity: number;
}

export type defaultStorageObject = {
  image: string;
  userId: string;
  phone: string;
  username: string;
  email: string;
  names: string;
  authKey: string;
  clientId: string;
  products: {
    restuarantId: number;
    productsInCart: cartProduct[];
  };
};
