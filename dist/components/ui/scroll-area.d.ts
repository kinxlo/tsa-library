import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as React from "react";
declare function ScrollArea({ className, children, ...properties }: React.ComponentProps<typeof ScrollAreaPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function ScrollBar({ className, orientation, ...properties }: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>): import("react/jsx-runtime").JSX.Element;
export { ScrollArea, ScrollBar };
