import { toggleVariants } from './toggle';
import { VariantProps } from 'class-variance-authority';
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import * as React from "react";
declare function ToggleGroup({ className, variant, size, children, ...properties }: React.ComponentProps<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>): import("react/jsx-runtime").JSX.Element;
declare function ToggleGroupItem({ className, children, variant, size, ...properties }: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>): import("react/jsx-runtime").JSX.Element;
export { ToggleGroup, ToggleGroupItem };
