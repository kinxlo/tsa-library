import * as MenubarPrimitive from "@radix-ui/react-menubar";
import * as React from "react";
declare function Menubar({ className, ...properties }: React.ComponentProps<typeof MenubarPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function MenubarMenu({ ...properties }: React.ComponentProps<typeof MenubarPrimitive.Menu>): import("react/jsx-runtime").JSX.Element;
declare function MenubarGroup({ ...properties }: React.ComponentProps<typeof MenubarPrimitive.Group>): import("react/jsx-runtime").JSX.Element;
declare function MenubarPortal({ ...properties }: React.ComponentProps<typeof MenubarPrimitive.Portal>): import("react/jsx-runtime").JSX.Element;
declare function MenubarRadioGroup({ ...properties }: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>): import("react/jsx-runtime").JSX.Element;
declare function MenubarTrigger({ className, ...properties }: React.ComponentProps<typeof MenubarPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare function MenubarContent({ className, align, alignOffset, sideOffset, ...properties }: React.ComponentProps<typeof MenubarPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
declare function MenubarItem({ className, inset, variant, ...properties }: React.ComponentProps<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
}): import("react/jsx-runtime").JSX.Element;
declare function MenubarCheckboxItem({ className, children, checked, ...properties }: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>): import("react/jsx-runtime").JSX.Element;
declare function MenubarRadioItem({ className, children, ...properties }: React.ComponentProps<typeof MenubarPrimitive.RadioItem>): import("react/jsx-runtime").JSX.Element;
declare function MenubarLabel({ className, inset, ...properties }: React.ComponentProps<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function MenubarSeparator({ className, ...properties }: React.ComponentProps<typeof MenubarPrimitive.Separator>): import("react/jsx-runtime").JSX.Element;
declare function MenubarShortcut({ className, ...properties }: React.ComponentProps<"span">): import("react/jsx-runtime").JSX.Element;
declare function MenubarSub({ ...properties }: React.ComponentProps<typeof MenubarPrimitive.Sub>): import("react/jsx-runtime").JSX.Element;
declare function MenubarSubTrigger({ className, inset, children, ...properties }: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function MenubarSubContent({ className, ...properties }: React.ComponentProps<typeof MenubarPrimitive.SubContent>): import("react/jsx-runtime").JSX.Element;
export { Menubar, MenubarPortal, MenubarMenu, MenubarTrigger, MenubarContent, MenubarGroup, MenubarSeparator, MenubarLabel, MenubarItem, MenubarShortcut, MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem, MenubarSub, MenubarSubTrigger, MenubarSubContent, };
