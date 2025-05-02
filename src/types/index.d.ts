/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEventHandler, FocusEventHandler, HtmlHTMLAttributes, MouseEventHandler, ReactNode } from "react";

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
    | "link";
  type Size = "default" | "sm" | "lg" | "link" | "icon" | "circle";

  interface ButtonProperties {
    type?: "submit" | "button" | "reset";
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"; // Add your actual variants
    size?: "default" | "sm" | "lg" | "icon"; // Add your actual sizes
    icon?: ReactNode;
    children?: ReactNode;
    isLoading?: boolean;
    isIconOnly?: boolean;
    isLeftIconVisible?: boolean;
    isRightIconVisible?: boolean;
    isDisabled?: boolean;
    ariaLabel?: string;
    href?: string;
    className?: string;
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
    name: string;
    path: string;
    type: string;
    subLinks?: {
      id: number;
      name: string;
      path: string;
      type: string;
    }[];
  }

  interface NavbarProperties {
    logo: React.ReactNode;
    links: any;
    cta?: React.ReactNode;
    user?: React.ReactNode;
    className?: string;
    theme?: "light" | "dark" | "custom";
    sticky?: boolean;
    mobileBreakpoint?: "sm" | "md" | "lg" | "xl";
  }

  interface NavbarProperties {
    logo: React.ReactNode;
    links: NavLink[];
    cta?: React.ReactNode;
    user?: React.ReactNode;
    className?: string;
    mobileBreakpoint?: "sm" | "md" | "lg" | "xl";
    theme?: "light" | "dark" | "custom";
    sticky?: boolean;
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

  interface NavLink {
    route: string;
    link: string;
    dropdown?: DropdownItem[];
  }

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

  interface TsaNavbarProperties {
    navLinks: NavLink[];
    logoPath: string;
    children?: ReactNode;
    bgScrollColor?: string;
    linkClassName?: string;
    className?: string;
    showBanner?: boolean;
    bannerDuration?: string;
  }
}

// This export is needed to make the file a module
export {};
