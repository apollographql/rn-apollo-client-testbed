import { Theme } from "./theme";
import { createVariant, VariantProps, useRestyle, composeRestyleFunctions } from "@shopify/restyle";
import { ComponentProps, forwardRef } from "react";
import { Pressable } from "./Pressable";
import { Text } from "./Text";

type Id<T> = { [K in keyof T]: T[K] } & {};

type RestyleProps = VariantProps<Theme, "buttonVariants">;
const restyleFunctions = composeRestyleFunctions([
  // @ts-expect-error
  createVariant<Theme, "buttonVariants">({ themeKey: "buttonVariants" }),
]);
type ButtonProps = { label: string } & RestyleProps & {
    labelProps?: ComponentProps<typeof Text>;
  } & Omit<ComponentProps<typeof Pressable>, keyof RestyleProps>;

export const Button = forwardRef<typeof Pressable, ButtonProps>(function Button(
  { label, variant, labelProps: textProps = {}, ...pressableProps },
  ref
) {
  // @ts-expect-error
  const pressable = useRestyle(restyleFunctions, { variant, style: pressableProps.style });
  // @ts-expect-error
  const text = useRestyle(restyleFunctions, { variant, style: textProps.style });

  return (
    <Pressable
      flex={0}
      padding="s"
      borderRadius={10}
      ref={ref}
      {...pressableProps}
      style={pressable.style}
    >
      <Text children={label} {...textProps} style={text.style} />
    </Pressable>
  );
});
