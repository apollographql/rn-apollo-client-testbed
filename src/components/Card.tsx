import { createVariant, createRestyleComponent, VariantProps } from "@shopify/restyle";
import { View, ViewProps } from "react-native";
import { Theme } from "./theme";

const variant = createVariant<Theme, "cardVariants">({ themeKey: "cardVariants" });
export const Card = createRestyleComponent<ViewProps & VariantProps<Theme, "cardVariants">, Theme>(
  [variant],
  View
);
