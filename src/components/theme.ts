import { createTheme } from "@shopify/restyle";

const palette = {
  black: "#000000",
  white: "#ffffff",
  apolloPurpleBase: "#a23df5",
  apolloIndigoBase: "#3f20ba",
  apolloIndigoLight: "#7156d9",
  apolloIndigoDark: "#311c87",
  apolloIndigo800: "#2f1d76",
} as const;

const theme = createTheme({
  colors: {
    ...palette,
    mainBackground: palette.white,
    alternativeBackground: palette.apolloIndigo800,
    primary: palette.apolloIndigoBase,
    primaryContrast: palette.white,
    alternative: palette.apolloPurpleBase,
    alternativeContrast: palette.white,
    muted: palette.apolloIndigoLight,
    mutedContrast: palette.white,
    dark: palette.apolloIndigoDark,
    darkContrast: palette.white,
    primaryText: palette.black,
    secondaryText: palette.white,
    headingTextColor: palette.apolloIndigoBase,
    headingTextAlternativeColor: palette.apolloPurpleBase,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  buttonVariants: {
    defaults: {
      backgroundColor: "primary",
      textColor: "primaryContrast",
    },
    secondary: {
      backgroundColor: "primaryContrast",
      textColor: "primary",
    },
    muted: {
      backgroundColor: "muted",
      textColor: "mutedContrast",
    },
    dark: {
      backgroundColor: "dark",
      textColor: "darkContrast",
    },
  },
  boxVariants: {
    defaults: {
      flex: 1,
    },
    page: {
      padding: "m",
      alignItems: "center",
    },
    centered: {
      alignItems: "center",
      justifyContent: "center",
    },
  },
  cardVariants: {
    defaults: {
      padding: {
        phone: "s",
        tablet: "m",
      },
    },
    primary: {
      shadowColor: "black",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 15,
      elevation: 5,
    },
  },
  textVariants: {
    defaults: {
      color: "primaryText",
    },
    secondary: {
      color: "secondaryText",
    },
    heading1: {
      color: "headingTextColor",
      fontSize: 32,
    },
    heading2: {
      color: "headingTextAlternativeColor",
      fontSize: 24,
    },
  },
});

export type Theme = typeof theme;
export default theme;
