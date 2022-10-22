import {StyleSheet} from 'react-native';

const theme = {
  colors: {
    primary: '#FA4A0C',
    white: '#FFFFFF',
    black: '#000000',
    danger: '#d73a4a',
    tab: '#F2F2F2',
    grey: '#808080',
    icon: '#ADADAF',
  },
  opacity: {
    one: 1,
  },
  borderRadius: {
    button: 30,
  },
  fonts: {},
  fontSizes: {
    label: {
      input: {
        fontStyle: 'normal',
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 18,
      },
      sideBar: {
        fontSize: 18,
        lineHeight: 22,
      },
      button: {
        fontSize: 17,
        lineHeight: 20,
        letterSpacing: 0.1,
      },
      normal: {
        fontSize: 17,
        lineHeight: 20,
        fontWeight: '600',
      },
      small: {
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0.5,
      },
    },
    onboarding: {
      heading: {
        fontSize: 32,
        lineHeight: 40,
      },
      subheading: {
        fontSize: 28,
        lineHeight: 36,
      },
      subheading2: {
        fontSize: 24,
        lineHeight: 32,
      },
    },
    appBarTitle: {
      fontSize: 22,
      lineHeight: 28,
    },
    subheading: {
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.5,
    },
    empty: {
      fontSize: 28,
      lineHeight: 33,
    },
    calendar: {
      number: {
        fontSize: 36,
        lineHeight: 44,
      },
    },
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  container: {
    padding: 20,
  },
  input: {
    height: 40,
  },
  textAlignCenter: {
    textAlign: 'center' as const,
  },
  boxShadowIOS: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  boxShadowAndroid: {
    shadowColor: '#000',

    elevation: 10,
  },
  globalStyle: StyleSheet.create({
    flexRow: {
      flexDirection: 'row',
    },
    flexColumn: {
      flexDirection: 'column',
    },
    itemsCenter: {
      alignItems: 'center',
    },
    justifyBetween: {
      justifyContent: 'space-between',
    },
    justifyStart: {
      justifyContent: 'flex-start',
    },
    kpiContainer: {
      flex: 0.8,
      padding: 20,
      borderRadius: 10,
    },
    quickActionsContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalBackGround: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: '70%',
      backgroundColor: 'white',
      borderRadius: 30,
      elevation: 20,
      alignItems: 'center',
    },
  }),
};

export default theme;
