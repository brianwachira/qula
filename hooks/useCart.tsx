import {useState, useEffect} from 'react';
import {cartProduct, defaultStorageObject, product} from '../types/types';
import {useStorage} from './useStorage';

export default function useCart(restuarantId: number) {
  const [user, setUser] = useStorage('user');

  const [productInCart, setProductInCart] = useState<cartProduct>();
  const [chosenProduct, setChosenProduct] = useState<product>();

  const setProduct = (productChosen: product) =>
    setChosenProduct(productChosen);

  // useEffect to check whether product is in cart
  useEffect(() => {
    // look for the product
    const productIsInCart = user.products?.productsInCart
      ? user.products?.productsInCart.find(
          (item: cartProduct) => item.id === chosenProduct?.id,
        )
      : undefined;
    if (typeof productIsInCart !== undefined) {
      // save the product in cart to state
      setProductInCart(productIsInCart);
    }
  }, [chosenProduct?.id, user.products.productsInCart]);

  // function to reset cart if theres product from a different restuarant
  const handleRestuarantFromCart = () => {
    // new product to save in cart
    let newProductInCart = {
      ...chosenProduct,
      quantity: 1,
    };
    // user object containing product in cart
    let userWithProductOnCart = {
      ...user,
      products: {
        restuarantId: restuarantId,
        productsInCart: [newProductInCart],
      },
    };

    // save updated user
    setUser(userWithProductOnCart);

    // save product in cart to state
    setProductInCart(newProductInCart);
  };

  // function to handle adding item to cart
  const handleCart = () => {
    // new product to save in cart
    let newProductInCart = {
      ...chosenProduct,
      quantity: 1,
    };
    // user object containing product in cart
    let userWithProductOnCart = {
      ...user,
      products: {
        restuarantId: restuarantId,
        productsInCart: [...user.products?.productsInCart, newProductInCart],
      },
    };

    // save updated user
    setUser(userWithProductOnCart);

    // save product in cart to state
    setProductInCart(newProductInCart);
  };

  // function to add quantity
  const addQuantity = () => {
    // updated product with quantity
    let updatedProductInCart = {
      ...(productInCart as cartProduct),
      quantity: productInCart!.quantity + 1,
    };

    // user object containing updated product in cart
    let userWithProductOnCart = {
      ...user,
      products: {
        restuarantId: user.products.restuarantId,
        productsInCart: user.products.productsInCart.map(
          (productInCart2: cartProduct) =>
            productInCart2.id === chosenProduct?.id
              ? updatedProductInCart
              : productInCart2,
        ),
      },
    };

    // save updated user
    setUser(userWithProductOnCart);

    // save updated product in cart to state
    setProductInCart(updatedProductInCart);
  };

  // function to deduct quantity
  const deductQuantity = () => {
    if (productInCart!.quantity - 1 === 0) {
      // remove it from cart
      let userWithoutProductOnCart = {
        ...user,
        products: {
          restuarantId: -1,
          productsInCart: user.products.productsInCart.filter(
            (productInCart3: cartProduct) =>
              productInCart3.id !== chosenProduct?.id,
          ),
        },
      };

      // save updated user
      setUser(userWithoutProductOnCart);

      // remove cart product from state
      setProductInCart(undefined);
    } else {
      // updated product with quantity
      let updatedProductInCart = {
        ...productInCart,
        quantity: productInCart!.quantity - 1,
      };

      // user object containing updated product in cart
      let userWithProductOnCart = {
        ...user,
        products: {
          restuarantId: user.products.restuarantId,
          productsInCart: user.products.productsInCart.map(
            (productInCart4: cartProduct) =>
              productInCart4.id === updatedProductInCart.id
                ? updatedProductInCart
                : productInCart4,
          ),
        },
      };

      // save updated user
      setUser(userWithProductOnCart as defaultStorageObject);

      // save updated product in cart to state
      setProductInCart(updatedProductInCart as cartProduct);
    }
  };
  let currentRestuarantId = user.products.restuarantId;
  return [
    currentRestuarantId,
    productInCart,
    handleCart,
    handleRestuarantFromCart,
    addQuantity,
    deductQuantity,
    setProduct,
  ] as const;
}
