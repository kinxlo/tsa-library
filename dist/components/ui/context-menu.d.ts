import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import * as React from "react";
declare function ContextMenu({ ...properties }: React.ComponentProps<typeof ContextMenuPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function ContextMenuTrigger({ ...properties }: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare function ContextMenuGroup({ ...properties }: React.ComponentProps<typeof ContextMenuPrimitive.Group>): import("react/jsx-runtime").JSX.Element;
declare function ContextMenuPortal({ ...properties }: React.ComponentProps<typeof ContextMenuPrimitive.Portal>): import("react/jsx-runtime").JSX.Element;
declare function ContextMenuSub({ ...properties }: React.ComponentProps<typeof ContextMenuPrimitive.Sub>): import("react/jsx-runtime").JSX.Element;
declare function ContextMenuRadioGroup({ ...properties }: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>): import("react/jsx-runtime").JSX.Element;
declare function ContextMenuSubTrigger({ className, inset, children, ...properties }: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function ContextMenuSubContent({ className, ...properties }: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>): import("react/jsx-runtime").JSX.Element;
declare function ContextMenuContent({ className, ...properties }: React.ComponentProps<typeof ContextMenuPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
declare function ContextMenuItem({ className, inset, variant, ...properties }: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
}): import("react/jsx-runtime").JSX.Element;
declare function ContextMenuCheckboxItem({ className, children, checked, ...properties }: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>): import("react/jsx-runtime").JSX.Element;
declare function ContextMenuRadioItem({ className, children, ...properties }: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>): import("react/jsx-runtime").JSX.Element;
declare function ContextMenuLabel({ className, inset, ...properties }: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function ContextMenuSeparator({ className, ...properties }: React.ComponentProps<typeof ContextMenuPrimitive.Separator>): import("react/jsx-runtime").JSX.Element;
declare function ContextMenuShortcut({ className, ...properties }: React.ComponentProps<"span">): import("react/jsx-runtime").JSX.Element;
export { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuGroup, ContextMenuPortal, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuRadioGroup, };
