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
export type RootStackParamList = {
  GetStarted: undefined;
  Auth: undefined;
  Home: undefined;
  Liked: undefined;
  Orders: undefined;
  Cart: undefined;
  Profile: undefined;
  Otp: {email: string; otp: string};
  HomeStack: {screen: 'Home' | 'Liked' | 'Orders' | 'Cart' | 'Profile'};
  SearchResults: undefined;
  RestuarantDetails: {restuarant: restuarant};
};
