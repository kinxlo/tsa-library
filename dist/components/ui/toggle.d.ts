import { VariantProps } from 'class-variance-authority';
import * as TogglePrimitive from "@radix-ui/react-toggle";
import * as React from "react";
declare const toggleVariants: (props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import('class-variance-authority/dist/types').ClassProp) | undefined) => string;
declare function Toggle({ className, variant, size, ...properties }: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>): import("react/jsx-runtime").JSX.Element;
export { Toggle, toggleVariants };
