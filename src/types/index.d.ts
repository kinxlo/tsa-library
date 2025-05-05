import {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLAttributes,
  HtmlHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";

declare global {
  export interface LogoProperties {
    logo: string;
    width?: number;
    height?: number;
    className?: string;
    alt?: string;
    href?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
  }

  type Variant =
    | "default"
    | "primary"
    | "destructive"
    | "subtle"
    | "loading"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "accent";
  type Size = "default" | "sm" | "lg" | "xl" | "link" | "icon" | "circle";

  interface ButtonProperties {
    type?: "submit" | "button" | "reset";
    /** Specifies the button style variant */
    variant?: Variant;
    /** Specifies the size of the button */
    size?: Size;
    /** Icon to be displayed inside the button */
    icon?: ReactNode;
    /** Text or elements to be displayed inside the button */
    children?: ReactNode;
    /** Indicates if the button is in a loading state */
    isLoading?: boolean;
    /** Indicates if the button is icon only */
    isIconOnly?: boolean;
    /** Indicates if the left icon is visible */
    isLeftIconVisible?: boolean;
    /** Indicates if the right icon is visible */
    isRightIconVisible?: boolean;
    /** Disables the button if true */
    isDisabled?: boolean;
    /** Accessibility label for the button */
    ariaLabel?: string;
    /** Href to link button to a URL or route */
    href?: string;
    /** Class for custom styling */
    className?: string;
    /** Click event handler for the button */
    onClick?: MouseEventHandler<HTMLButtonElement>;
  }

  interface InputProperties {
    label?: string;
    isRequired?: boolean;
    state?: "default" | "primary" | "error";
    name?: string;
    placeholder: string;
    type?: string;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    isDisabled?: boolean;
    className?: string;
    helpText?: string;
    validate?: (value: string) => boolean;
  }

  interface NavLink {
    id: number;
    title: string;
    href: string;
    type: "link" | "dropdown";
    subLinks?: Array<{
      id: number;
      title: string;
      href: string;
      description: string;
    }> | null;
  }

  interface NavbarProperties extends HTMLAttributes<HTMLDivElement> {
    logo?: React.ReactNode;
    links?: NavLink[];
    cta?: React.ReactNode;
    user?: React.ReactNode;
    sticky?: boolean;
    navbarStyle?: string;
  }

  interface slideContentProperties {
    name: string;
    image: string;
    link: string;
    _image?: ReactNode;
  }

  type DropdownItem = {
    title: string;
    href: string;
    description: string;
  };

  interface MarqueeProps extends HtmlHTMLAttributes<HTMLDivElement> {
    children: ReactNode;
  }

  interface BannerProps extends HtmlHTMLAttributes<HTMLDivElement> {
    testimonials: { message: string; image: string; name: string; job: string }[];
    topSlot?: ReactNode;
    bottomSlot?: ReactNode;
  }

  interface CarouselProperties {
    courseContent?: slideContentProperties[];
    galleryContent?: ReactNode[];
    facilityContent?: string[];
    bgColor?: string;
    showIndicator?: boolean;
    variant?: "course" | "gallery" | "facility";
    stopZoom?: boolean;
    itemsPerView?: number;
    facilityCaroselFlatMaxWidth?: string;
  }

  interface FooterProperties extends TsaNavbarProperties, HtmlHTMLAttributes<HTMLDivElement> {
    subscribeComponent: ReactNode;
  }

  interface FormFieldProperties {
    label?: string;
    labelDetailedNode?: React.ReactNode;
    name: string;
    type?: "text" | "textarea" | "select" | "number" | "password" | "email";
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    options?: { value: string; label: string }[];
    className?: string;
    containerClassName?: string;
    leftAddon?: React.ReactNode; // Add left icon or button
    rightAddon?: React.ReactNode; // Add right icon or button
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
}

// This export is needed to make the file a module
export {};
