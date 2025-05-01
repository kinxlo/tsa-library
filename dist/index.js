// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/ui/button.tsx
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";
var buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-default text-default-foreground shadow",
        primary: "bg-primary text-primary-foreground shadow",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive-hover",
        subtle: "bg-subtle text-subtle-foreground shadow-sm hover:bg-subtle-hover",
        loading: "bg-loading text-loading-foreground shadow-sm hover:bg-loading-hover opacity-50 hover:opacity-100 transition-opacity duration-500 ease-out",
        outline: "bg-outline text-outline-foreground shadow-sm border border-border hover:bg-outline-hover",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-link underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8  px-3 text-xs",
        lg: "h-10  px-8",
        xl: "h-12  px-8",
        link: "h-9 px-0 py-2",
        icon: "px-2 py-2",
        circle: "px-3 py-3 rounded-full"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = forwardRef(
  ({ className, variant, size, asChild = false, ...properties }, reference) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ React.createElement(Comp, { className: cn(buttonVariants({ variant, size, className })), ref: reference, ...properties });
  }
);
Button.displayName = "Button";

// src/components/core/atoms/button/index.tsx
import { LucideLoader, LucidePlus } from "lucide-react";
import Link from "next/link";
import { cloneElement, forwardRef as forwardRef2 } from "react";
var CustomButton = forwardRef2(
  ({
    type = "button",
    variant,
    size,
    children,
    isLoading = false,
    isLeftIconVisible = false,
    isRightIconVisible = false,
    icon,
    isDisabled = false,
    isIconOnly = false,
    ariaLabel,
    href,
    className,
    onClick,
    ...properties
  }, reference) => {
    const modifiedIcon = icon ? cloneElement(
      icon,
      {
        className: "w-[1rem] h-[1rem]",
        "data-testid": "icon"
      }
    ) : /* @__PURE__ */ React.createElement(LucidePlus, { className: "h-[1rem] w-[1rem]", "data-testid": "icon" });
    const buttonContent = /* @__PURE__ */ React.createElement(React.Fragment, null, isLeftIconVisible && !isLoading && modifiedIcon, isLoading && /* @__PURE__ */ React.createElement(LucideLoader, { className: "h-[1rem] w-[1rem] animate-spin", "data-testid": "loading-spinner" }), isIconOnly && !isLoading && modifiedIcon, !isIconOnly && children, !isIconOnly && !children && isLoading && "Loading", isRightIconVisible && !isLoading && modifiedIcon);
    const buttonClasses = `transition-all duration-300 ease-in-out ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-sneob dark:hover:shadow-sneobw focus:shadow-none"} ${className}`;
    if (href) {
      const isExternal = /^https?:\/\//.test(href);
      if (isExternal) {
        return /* @__PURE__ */ React.createElement("a", { href, target: "_blank", rel: "noopener noreferrer", "aria-label": ariaLabel }, /* @__PURE__ */ React.createElement(
          Button,
          {
            type,
            variant,
            size,
            disabled: isDisabled,
            "aria-label": ariaLabel,
            className: buttonClasses,
            onClick,
            role: "button",
            ref: reference,
            ...properties
          },
          buttonContent
        ));
      }
      return /* @__PURE__ */ React.createElement(Link, { href: isDisabled ? "" : href, passHref: true, "aria-label": ariaLabel }, /* @__PURE__ */ React.createElement(
        Button,
        {
          variant,
          size,
          disabled: isDisabled,
          "aria-label": ariaLabel,
          className: buttonClasses,
          onClick,
          role: "button",
          ref: reference,
          ...properties
        },
        buttonContent
      ));
    }
    return /* @__PURE__ */ React.createElement(
      Button,
      {
        variant,
        size,
        disabled: isDisabled,
        "aria-label": ariaLabel,
        className: buttonClasses,
        onClick,
        role: "button",
        ref: reference,
        ...properties
      },
      buttonContent
    );
  }
);
CustomButton.displayName = "CustomButton";

// src/components/ui/input.tsx
import * as React2 from "react";
function Input({ className, type, ...properties }) {
  return /* @__PURE__ */ React2.createElement(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...properties
    }
  );
}

// src/components/ui/label.tsx
import * as LabelPrimitive from "@radix-ui/react-label";
import * as React3 from "react";
function Label({ className, ...properties }) {
  return /* @__PURE__ */ React3.createElement(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...properties
    }
  );
}

// src/components/ui/select.tsx
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import * as React4 from "react";
function Select({ ...properties }) {
  return /* @__PURE__ */ React4.createElement(SelectPrimitive.Root, { "data-slot": "select", ...properties });
}
function SelectValue({ ...properties }) {
  return /* @__PURE__ */ React4.createElement(SelectPrimitive.Value, { "data-slot": "select-value", ...properties });
}
function SelectTrigger({
  className,
  size = "default",
  children,
  ...properties
}) {
  return /* @__PURE__ */ React4.createElement(
    SelectPrimitive.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...properties
    },
    children,
    /* @__PURE__ */ React4.createElement(SelectPrimitive.Icon, { asChild: true }, /* @__PURE__ */ React4.createElement(ChevronDownIcon, { className: "size-4 opacity-50" }))
  );
}
function SelectContent({
  className,
  children,
  position = "popper",
  ...properties
}) {
  return /* @__PURE__ */ React4.createElement(SelectPrimitive.Portal, null, /* @__PURE__ */ React4.createElement(
    SelectPrimitive.Content,
    {
      "data-slot": "select-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      ...properties
    },
    /* @__PURE__ */ React4.createElement(SelectScrollUpButton, null),
    /* @__PURE__ */ React4.createElement(
      SelectPrimitive.Viewport,
      {
        className: cn(
          "p-1",
          position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
        )
      },
      children
    ),
    /* @__PURE__ */ React4.createElement(SelectScrollDownButton, null)
  ));
}
function SelectItem({ className, children, ...properties }) {
  return /* @__PURE__ */ React4.createElement(
    SelectPrimitive.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...properties
    },
    /* @__PURE__ */ React4.createElement("span", { className: "absolute right-2 flex size-3.5 items-center justify-center" }, /* @__PURE__ */ React4.createElement(SelectPrimitive.ItemIndicator, null, /* @__PURE__ */ React4.createElement(CheckIcon, { className: "size-4" }))),
    /* @__PURE__ */ React4.createElement(SelectPrimitive.ItemText, null, children)
  );
}
function SelectScrollUpButton({
  className,
  ...properties
}) {
  return /* @__PURE__ */ React4.createElement(
    SelectPrimitive.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn("flex cursor-default items-center justify-center py-1", className),
      ...properties
    },
    /* @__PURE__ */ React4.createElement(ChevronUpIcon, { className: "size-4" })
  );
}
function SelectScrollDownButton({
  className,
  ...properties
}) {
  return /* @__PURE__ */ React4.createElement(
    SelectPrimitive.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn("flex cursor-default items-center justify-center py-1", className),
      ...properties
    },
    /* @__PURE__ */ React4.createElement(ChevronDownIcon, { className: "size-4" })
  );
}

// src/components/ui/textarea.tsx
import * as React5 from "react";
function Textarea({ className, ...properties }) {
  return /* @__PURE__ */ React5.createElement(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...properties
    }
  );
}

// src/components/core/atoms/inputs/index.tsx
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
function InputField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  disabled = false,
  options = [],
  className = "",
  containerClassName,
  leftAddon,
  rightAddon,
  labelDetailedNode,
  onChange
}) {
  const {
    control,
    formState: { errors }
  } = useFormContext();
  const error = errors[name];
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((previous) => !previous);
  };
  return /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, label && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Label, { className: "text-[16px] font-medium" }, label, required && /* @__PURE__ */ React.createElement("span", { className: "text-destructive ml-1" }, "*")), labelDetailedNode && /* @__PURE__ */ React.createElement("div", { className: "text-mid-grey-II text-xs" }, labelDetailedNode)), /* @__PURE__ */ React.createElement(
    Controller,
    {
      name,
      control,
      render: ({ field }) => {
        const inputClassName = cn(
          "flex h-10 w-full min-w-[400px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive",
          className
        );
        const inputWithAddons = /* @__PURE__ */ React.createElement("div", { className: cn(`flex items-center gap-2`, containerClassName) }, leftAddon && /* @__PURE__ */ React.createElement("div", { className: "flex items-center" }, leftAddon), type === "textarea" ? /* @__PURE__ */ React.createElement(
          Textarea,
          {
            ...field,
            placeholder,
            disabled,
            className: cn(inputClassName, "resize-y")
          }
        ) : type === "select" ? /* @__PURE__ */ React.createElement(Select, { onValueChange: field.onChange, value: field.value, disabled }, /* @__PURE__ */ React.createElement(SelectTrigger, { className: cn(inputClassName, "w-full") }, /* @__PURE__ */ React.createElement(SelectValue, { placeholder })), /* @__PURE__ */ React.createElement(SelectContent, null, options.map((option, index) => /* @__PURE__ */ React.createElement(SelectItem, { key: index, value: option.value }, option.label)))) : type === "number" ? /* @__PURE__ */ React.createElement(
          "input",
          {
            ...field,
            type: "number",
            placeholder,
            disabled,
            className: inputClassName,
            value: field.value || "",
            onChange: (event) => field.onChange(event.target.valueAsNumber)
          }
        ) : type === "password" ? /* @__PURE__ */ React.createElement("div", { className: "relative w-full" }, /* @__PURE__ */ React.createElement(
          Input,
          {
            ...field,
            type: showPassword ? "text" : "password",
            placeholder,
            disabled,
            className: inputClassName,
            onChange: (event) => {
              field.onChange(event);
              onChange?.(event);
            }
          }
        ), /* @__PURE__ */ React.createElement(
          "button",
          {
            type: "button",
            onClick: togglePasswordVisibility,
            className: "text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
          },
          showPassword ? /* @__PURE__ */ React.createElement(EyeOff, { size: 18 }) : /* @__PURE__ */ React.createElement(Eye, { size: 18 })
        )) : /* @__PURE__ */ React.createElement(
          Input,
          {
            ...field,
            type,
            placeholder,
            disabled,
            className: inputClassName
          }
        ), rightAddon && /* @__PURE__ */ React.createElement("div", { className: "flex items-center" }, rightAddon));
        return inputWithAddons;
      }
    }
  ), error && /* @__PURE__ */ React.createElement("p", { className: "text-destructive text-sm" }, error.message?.toString()));
}

// src/components/core/atoms/logo/index.tsx
import Image from "next/image";
import Link2 from "next/link";
var Logo = ({ logo = "/images/logo-black.png", width = 120, height = 37, className }) => {
  return /* @__PURE__ */ React.createElement(Link2, { href: "/", "data-testid": "logo", className: "" }, logo ? /* @__PURE__ */ React.createElement(Image, { src: logo, alt: "Logo", width, height, className }) : /* @__PURE__ */ React.createElement("p", { className: "text-xl font-bold" }, "LOGO"));
};
export {
  CustomButton,
  InputField,
  Logo
};
//# sourceMappingURL=index.js.map