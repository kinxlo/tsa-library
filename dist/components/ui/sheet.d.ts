import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as React from "react";
declare function Sheet({ ...properties }: React.ComponentProps<typeof SheetPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function SheetTrigger({ ...properties }: React.ComponentProps<typeof SheetPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare function SheetClose({ ...properties }: React.ComponentProps<typeof SheetPrimitive.Close>): import("react/jsx-runtime").JSX.Element;
declare function SheetContent({ className, children, side, ...properties }: React.ComponentProps<typeof SheetPrimitive.Content> & {
    side?: "top" | "right" | "bottom" | "left";
}): import("react/jsx-runtime").JSX.Element;
declare function SheetHeader({ className, ...properties }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare function SheetFooter({ className, ...properties }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare function SheetTitle({ className, ...properties }: React.ComponentProps<typeof SheetPrimitive.Title>): import("react/jsx-runtime").JSX.Element;
declare function SheetDescription({ className, ...properties }: React.ComponentProps<typeof SheetPrimitive.Description>): import("react/jsx-runtime").JSX.Element;
export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription };
