import { Theme } from "./theme";
import {
  createVariant,
  createRestyleComponent,
  VariantProps,
  createBox,
  BoxProps,
  boxRestyleFunctions,
} from "@shopify/restyle";
import { ComponentProps } from "react";
import { Pressable as RNPressable } from "react-native";

const variant = createVariant<Theme, "boxVariants">({ themeKey: "boxVariants" });
export const Pressable = createRestyleComponent<
  Exclude<ComponentProps<typeof RNPressable>, keyof BoxProps<Theme>> &
    VariantProps<Theme, "boxVariants"> &
    BoxProps<Theme>,
  Theme
>([variant, ...(boxRestyleFunctions as any)], RNPressable);
