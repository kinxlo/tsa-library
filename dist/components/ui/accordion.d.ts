import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";
declare function Accordion({ ...properties }: React.ComponentProps<typeof AccordionPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function AccordionItem({ className, ...properties }: React.ComponentProps<typeof AccordionPrimitive.Item>): import("react/jsx-runtime").JSX.Element;
declare function AccordionTrigger({ className, children, ...properties }: React.ComponentProps<typeof AccordionPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare function AccordionContent({ className, children, ...properties }: React.ComponentProps<typeof AccordionPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
