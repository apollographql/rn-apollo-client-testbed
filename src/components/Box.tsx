import { Theme } from "./theme";
import { createVariant, createRestyleComponent, VariantProps, createBox } from "@shopify/restyle";
import { ComponentProps } from "react";

const BaseBox = createBox();
const variant = createVariant<Theme, "boxVariants">({ themeKey: "boxVariants" });
export const Box = createRestyleComponent<
  ComponentProps<typeof BaseBox> & VariantProps<Theme, "boxVariants">,
  Theme
>([variant], BaseBox);
