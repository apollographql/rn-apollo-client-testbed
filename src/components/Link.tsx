import { createText } from "@shopify/restyle";
import { Theme } from "./theme";
import { Link as ExpoLink } from "expo-router";
import { ComponentProps } from "react";

export const Link = createText<Theme, ComponentProps<typeof ExpoLink>>(ExpoLink);
Link.defaultProps = { color: "apolloIndigoDark" };
