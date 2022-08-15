import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import theme from '../styles/themes';
import Text from './shared-ui/text';
import IonIcons from 'react-native-vector-icons/Ionicons';

interface CartCardProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  item: {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
  };
  key: string;
  onDismiss?: (food: {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
  }) => void;
}

const LIST_ITEM_HEIGHT = 120;

const {width: SCREEN_WIDTH} = Dimensions.get('screen');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.4;

const CartCard = (props: CartCardProps) => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);

  // panGesture handles the swipe animation
  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    // while swiping, the item will be translated to the left
    onActive: event => {
      translateX.value = event.translationX;
    },
    // when the swipe is over the threshold, the item will be dismissed
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, isFinished => {
          if (isFinished && props.onDismiss) {
            runOnJS(props.onDismiss)(props.item);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  // this is the animated style for the item
  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  // this is the animated style for the icon's opacity
  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity2 = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0,
    );
    return {opacity: opacity2};
  });

  // this is the animated style for the item's height
  const rItemContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      key={props.key || props.item.id}
      style={[styles.cartItemContainer, rItemContainerStyle]}>
      <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
        <IonIcons name="trash" size={LIST_ITEM_HEIGHT * 0.3} color={'red'} />
      </Animated.View>
      <PanGestureHandler
        simultaneousHandlers={props.simultaneousHandlers}
        onGestureEvent={panGesture}>
        <Animated.View style={[styles.cartItem, rStyle]}>
          <View style={styles.cartItemImageContainer}>
            <Image
              style={styles.cartItemImage}
              source={{uri: props.item.image}}
            />
          </View>
          <View style={styles.cartItemContentContainer}>
            <Text numberOfLines={1}>{props.item.title}</Text>
            <View style={styles.cartItemContentRow}>
              <Text color="primary">${props.item.price}</Text>
              <View style={styles.cartItemQuantityButton}>
                <TouchableOpacity style={styles.plusButton}>
                  <Text style={{color: theme.colors.white}}>-</Text>
                </TouchableOpacity>
                <View style={styles.quantityLabel}>
                  <Text style={{color: theme.colors.white}}>0</Text>
                </View>
                <TouchableOpacity style={styles.minusButton}>
                  <Text style={{color: theme.colors.white}}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cartItemContainer: {
    width: '100%',
    alignItems: 'center',
  },
  cartItem: {
    width: '95%',
    height: LIST_ITEM_HEIGHT,
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignContent: 'center',
    flex: 1,
    // Shadow for iOS
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
  cartItemImageContainer: {
    marginRight: 15,
  },
  cartItemImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  cartItemContentContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  cartItemContentRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartItemQuantityButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.button,
    padding: 4,
    display: 'flex',
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  plusButton: {
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  quantityLabel: {
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  minusButton: {
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  iconContainer: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    position: 'absolute',
    right: '10%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
export default CartCard;