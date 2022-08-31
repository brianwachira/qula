type restuarant = {
  name: string;
  image_url: string;
  categories: string[];
  price: string;
  reviews: number;
  rating: number;
  time: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  review_count: number;
};
type food = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
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
  RestuarantDetails: {restuarant: restuarant};
  FoodDetails: {food: food};
  EditProfile: undefined;
};
