import { VariantProps } from 'class-variance-authority';
import * as React from "react";
declare const alertVariants: (props?: ({
    variant?: "default" | "destructive" | null | undefined;
} & import('class-variance-authority/dist/types').ClassProp) | undefined) => string;
declare function Alert({ className, variant, ...properties }: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>): import("react/jsx-runtime").JSX.Element;
declare function AlertTitle({ className, ...properties }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare function AlertDescription({ className, ...properties }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
export { Alert, AlertTitle, AlertDescription };
