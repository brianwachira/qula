const categoriesData = [
  {
    image: require('../assets/shopping-bag.png'),
    text: 'Pick-up',
  },
  {
    image: require('../assets/soft-drink.png'),
    text: 'Soft Drinks',
  },
  {
    image: require('../assets/bread.png'),
    text: 'Bakery Items',
  },
  {
    image: require('../assets/fast-food.png'),
    text: 'Fast Foods',
  },
  {
    image: require('../assets/deals.png'),
    text: 'Deals',
  },
  {
    image: require('../assets/coffee.png'),
    text: 'Coffee & Tea',
  },
  {
    image: require('../assets//desserts.png'),
    text: 'Desserts',
  },
];

const foods = [
  {
    id: 'KKD1',
    title: 'Lasagna',
    description: 'With butter lettuce, tomato and sauce bechamel',
    price: 13.5,
    image:
      'https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg',
  },
  {
    id: 'KKD2',
    title: 'Tandoori Chicken',
    description:
      'Amazing Indian dish with tenderloin chicken off the sizzles 🔥',
    price: 19.2,
    image: 'https://i.ytimg.com/vi/BKxGodX9NGg/maxresdefault.jpg',
  },
  {
    id: 'KKD3',
    title: 'Chilaquiles',
    description:
      'Chilaquiles with cheese and sauce. A delicious mexican dish 🇲🇽',
    price: 15.3,
    image:
      'https://i2.wp.com/chilipeppermadness.com/wp-content/uploads/2020/11/Chilaquales-Recipe-Chilaquiles-Rojos-1.jpg',
  },
  {
    id: 'KKD4',
    title: 'Chicken Caesar Salad',
    description:
      'One can never go wrong with a chicken caesar salad. Healthy option with greens and proteins!',
    price: 21.5,
    image:
      'https://images.themodernproper.com/billowy-turkey/production/posts/2019/Easy-italian-salad-recipe-10.jpg?w=1200&h=1200&q=82&fm=jpg&fit=crop&fp-x=0.5&fp-y=0.5&dm=1614096227&s=c0f63a30cef3334d97f9ecad14be51da',
  },
  {
    id: 'KKD5',
    title: 'Lasagna',
    description: 'With butter lettuce, tomato and sauce bechamel',
    price: 16.5,
    image:
      'https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg',
  },
  {
    id: 'KKD6',
    title: 'Lasagna',
    description: 'With butter lettuce, tomato and sauce bechamel',
    price: 13.5,
    image:
      'https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg',
  },
  {
    id: 'KKD7',
    title: 'Tandoori Chicken',
    description:
      'Amazing Indian dish with tenderloin chicken off the sizzles 🔥',
    price: 19.2,
    image: 'https://i.ytimg.com/vi/BKxGodX9NGg/maxresdefault.jpg',
  },
  {
    id: 'KKD8',
    title: 'Chilaquiles',
    description:
      'Chilaquiles with cheese and sauce. A delicious mexican dish 🇲🇽',
    price: 15.3,
    image:
      'https://i2.wp.com/chilipeppermadness.com/wp-content/uploads/2020/11/Chilaquales-Recipe-Chilaquiles-Rojos-1.jpg',
  },
  {
    id: 'KKD9',
    title: 'Chicken Caesar Salad',
    description:
      'One can never go wrong with a chicken caesar salad. Healthy option with greens and proteins!',
    price: 21.5,
    image:
      'https://images.themodernproper.com/billowy-turkey/production/posts/2019/Easy-italian-salad-recipe-10.jpg?w=1200&h=1200&q=82&fm=jpg&fit=crop&fp-x=0.5&fp-y=0.5&dm=1614096227&s=c0f63a30cef3334d97f9ecad14be51da',
  },
  {
    id: 'KKD10',
    title: 'Lasagna',
    description: 'With butter lettuce, tomato and sauce bechamel',
    price: 16.5,
    image:
      'https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg',
  },
];

const localRestaurants = [
  {
    name: 'Beachside Bar',
    image_url:
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80',
    categories: ['Cafe', 'Bar'],
    price: '$$',
    reviews: 1244,
    rating: 4.5,
    time: '10 - 20',
    coordinates: {
      latitude: 37.759958,
      longitude: -122.435089,
    },
    review_count: 400,
  },
  {
    name: 'Benihana',
    image_url:
      'https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    categories: ['Cafe', 'Bar'],
    price: '$$$',
    reviews: 1244,
    time: '25 - 30',
    rating: 3.7,
    coordinates: {
      latitude: 37.759958,
      longitude: -122.435089,
    },
    review_count: 346,
  },
  {
    name: "India's Grill",
    image_url:
      'https://images.unsplash.com/photo-1544148103-0773bf10d330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    categories: ['Indian', 'Bar'],
    price: '$$',
    time: '20 - 30',
    reviews: 700,
    rating: 4.9,
    coordinates: {
      latitude: 37.759958,
      longitude: -122.435089,
    },
    review_count: 7680,
  },
  {
    name: 'Kaji Farmd kitchen',
    image_url:
      'https://images.unsplash.com/photo-1603620214835-31f24c810c1e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80',
    categories: ['Indian', 'Bar'],
    price: '$$$',
    time: '20 - 30',
    reviews: 700,
    rating: 4.9,
    coordinates: {
      latitude: 37.759958,
      longitude: -122.435089,
    },
    review_count: 8796,
  },
  {
    name: 'Beachside Bar',
    image_url:
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80',
    categories: ['Cafe', 'Bar'],
    price: '$$',
    reviews: 1244,
    rating: 4.5,
    time: '10 - 20',
    coordinates: {
      latitude: 37.759958,
      longitude: -122.435089,
    },
    review_count: 400,
  },
  {
    name: 'Benihana',
    image_url:
      'https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    categories: ['Cafe', 'Bar'],
    price: '$$$',
    reviews: 1244,
    time: '25 - 30',
    rating: 3.7,
    coordinates: {
      latitude: 37.759958,
      longitude: -122.435089,
    },
    review_count: 346,
  },
  {
    name: "India's Grill",
    image_url:
      'https://images.unsplash.com/photo-1544148103-0773bf10d330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    categories: ['Indian', 'Bar'],
    price: '$$',
    time: '20 - 30',
    reviews: 700,
    rating: 4.9,
    coordinates: {
      latitude: 37.759958,
      longitude: -122.435089,
    },
    review_count: 7680,
  },
  {
    name: 'Kaji Farmd kitchen',
    image_url:
      'https://images.unsplash.com/photo-1603620214835-31f24c810c1e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80',
    categories: ['Indian', 'Bar'],
    price: '$$$',
    time: '20 - 30',
    reviews: 700,
    rating: 4.9,
    coordinates: {
      latitude: 37.759958,
      longitude: -122.435089,
    },
    review_count: 8796,
  },
  {
    name: 'Beachside Bar',
    image_url:
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80',
    categories: ['Cafe', 'Bar'],
    price: '$$',
    reviews: 1244,
    rating: 4.5,
    time: '10 - 20',
    coordinates: {
      latitude: 37.759958,
      longitude: -122.435089,
    },
    review_count: 400,
  },
  {
    name: 'Benihana',
    image_url:
      'https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    categories: ['Cafe', 'Bar'],
    price: '$$$',
    reviews: 1244,
    time: '25 - 30',
    rating: 3.7,
    coordinates: {
      latitude: 37.759958,
      longitude: -122.435089,
    },
    review_count: 346,
  },
  {
    name: "India's Grill",
    image_url:
      'https://images.unsplash.com/photo-1544148103-0773bf10d330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    categories: ['Indian', 'Bar'],
    price: '$$',
    time: '20 - 30',
    reviews: 700,
    rating: 4.9,
    coordinates: {
      latitude: 37.759958,
      longitude: -122.435089,
    },
    review_count: 7680,
  },
  {
    name: 'Kaji Farmd kitchen',
    image_url:
      'https://images.unsplash.com/photo-1603620214835-31f24c810c1e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80',
    categories: ['Indian', 'Bar'],
    price: '$$$',
    time: '20 - 30',
    reviews: 700,
    rating: 4.9,
    coordinates: {
      latitude: 37.759958,
      longitude: -122.435089,
    },
    review_count: 8796,
  },
];

// eslint-disable-next-line no-sparse-arrays
const meals = [
  {
    title: 'Baked salmon with fennel & tomatoes',
    image: 'https://www.themealdb.com/images/media/meals/1548772327.jpg',
    id: '52959',
  },
  {
    title: 'Cajun spiced fish tacos',
    image: 'https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg',
    id: '52819',
  },
  {
    title: 'Escovitch Fish',
    image: 'https://www.themealdb.com/images/media/meals/1520084413.jpg',
    id: '52944',
  },
  {
    title: 'Fish fofos',
    image: 'https://www.themealdb.com/images/media/meals/a15wsa1614349126.jpg',
    id: '53043',
  },
  {
    title: 'Fish pie',
    image: 'https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg',
    id: '52802',
  },
  {
    title: 'Fish Stew with Rouille',
    image: 'https://www.themealdb.com/images/media/meals/vptqpw1511798500.jpg',
    id: '52918',
  },
  {
    title: 'Garides Saganaki',
    image: 'https://www.themealdb.com/images/media/meals/wuvryu1468232995.jpg',
    id: '527d64',
  },
  {
    title: 'Grilled Portuguese sardines',
    image: 'https://www.themealdb.com/images/media/meals/lpd4wy1614347943.jpg',
    id: '5d3041',
  },
  {
    title: 'Honey Teriyaki Salmon',
    image: 'https://www.themealdb.com/images/media/meals/xxyupu1468262513.jpg',
    id: '52773',
  },
  {
    title: 'Kedgeree',
    image: 'https://www.themealdb.com/images/media/meals/utxqpt1511639216.jpg',
    id: '52d887',
  },
  {
    title: 'Kung Po Prawns',
    image: 'https://www.themealdb.com/images/media/meals/1525873040.jpg',
    id: '52d946',
  },
  {
    title: 'Laksa King Prawn Noodles',
    image: 'https://www.themealdb.com/images/media/meals/rvypwy1503069308.jpg',
    id: '52d821',
  },
  {
    title: 'Mediterranean Pasta Salad',
    image: 'https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg',
    id: '52d777',
  },
  {
    title: 'Mee goreng mamak',
    image: 'https://www.themealdb.com/images/media/meals/xquakq1619787532.jpg',
    id: '5d3048',
  },
  {
    title: 'Nasi lemak',
    image: 'https://www.themealdb.com/images/media/meals/wai9bw1619788844.jpg',
    id: '53g051',
  },
  {
    title: 'Portuguese fish stew (Caldeirada de peixe)',
    image: 'https://www.themealdb.com/images/media/meals/do7zps1614349775.jpg',
    id: '530g45',
  },
  {
    title: 'Recheado Masala Fish',
    image: 'https://www.themealdb.com/images/media/meals/uwxusv1487344500.jpg',
    id: '52h809',
  },
  {
    title: 'Salmon Avocado Salad',
    image: 'https://www.themealdb.com/images/media/meals/1549542994.jpg',
    id: '529f60',
  },
  {
    title: 'Salmon Prawn Risotto',
    image: 'https://www.themealdb.com/images/media/meals/xxrxux1503070723.jpg',
    id: '52823',
  },
  {
    title: 'Saltfish and Ackee',
    image: 'https://www.themealdb.com/images/media/meals/vytypy1511883765.jpg',
    id: '52b936',
  },
  {
    title: 'Seafood fideuà',
    image: 'https://www.themealdb.com/images/media/meals/wqqvyq1511179730.jpg',
    id: '528r36',
  },
  {
    title: 'Shrimp Chow Fun',
    image: 'https://www.themealdb.com/images/media/meals/1529445434.jpg',
    id: '529r53',
  },
  {
    title: 'Sledz w Oleju (Polish Herrings)',
    image: 'https://www.themealdb.com/images/media/meals/7ttta31593350374.jpg',
    id: '53b023',
  },
  {
    title: 'Spring onion and prawn empanadas',
    image: 'https://www.themealdb.com/images/media/meals/1c5oso1614347493.jpg',
    id: '5304m0',
  },
  {
    title: 'Three Fish Pie',
    image: 'https://www.themealdb.com/images/media/meals/spswqs1511558697.jpg',
    id: '528y82',
  },
  {
    title: 'Tuna and Egg Briks',
    image: 'https://www.themealdb.com/images/media/meals/2dsltq1560461468.jpg',
    id: '529u75',
  },
  {
    title: 'Tuna Nicoise',
    image: 'https://www.themealdb.com/images/media/meals/yypwwq1511304979.jpg',
    id: '5285i2',
  },
];

export {categoriesData, localRestaurants, meals, foods};
