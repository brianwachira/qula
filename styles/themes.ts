const theme = {
  colors: {
    primary: '#FA4A0C',
    white: '#FFFFFF',
    black: '#000000',
    danger: '#d73a4a',
    tab: '#F2F2F2',
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
      fontSize: 22,
      lineHeight: 28,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  boxShadowAndroid: {
    shadowColor: '#000',

    elevation: 5,
  },
};

export default theme;
