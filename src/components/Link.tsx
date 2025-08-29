import { createText } from "@shopify/restyle";
import { Theme } from "./theme";
import { Link as ExpoLink } from "expo-router";
import { ComponentProps } from "react";

const Wrapped = createText<Theme, ComponentProps<typeof ExpoLink>>(ExpoLink);
export const Link: React.FC<ComponentProps<typeof Wrapped>> = ({
  color = "apolloIndigoDark",
  ...props
}) => <Wrapped {...{ color, ...props }} />;
