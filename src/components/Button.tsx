import { Theme } from "./theme";
import { createVariant, VariantProps, useRestyle, composeRestyleFunctions } from "@shopify/restyle";
import { ComponentProps } from "react";
import { Pressable } from "./Pressable";
import { Text } from "./Text";

type Id<T> = { [K in keyof T]: T[K] } & {};

type RestyleProps = VariantProps<Theme, "buttonVariants">;
const restyleFunctions = composeRestyleFunctions([
  // @ts-expect-error
  createVariant<Theme, "buttonVariants">({ themeKey: "buttonVariants" }),
]);

export function Button({
  label,
  variant,
  labelProps: textProps = {},
  ...pressableProps
}: { label: string } & RestyleProps & {
    labelProps?: ComponentProps<typeof Text>;
  } & Omit<ComponentProps<typeof Pressable>, keyof RestyleProps>) {
  // @ts-expect-error
  const pressable = useRestyle(restyleFunctions, { variant, style: pressableProps.style });
  // @ts-expect-error
  const text = useRestyle(restyleFunctions, { variant, style: textProps.style });

  return (
    <Pressable flex={0} padding="s" borderRadius={10} {...pressableProps} style={pressable.style}>
      <Text children={label} {...textProps} style={text.style} />
    </Pressable>
  );
}
