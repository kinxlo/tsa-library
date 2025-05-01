import { VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';
declare const buttonVariants: (props?: ({
    variant?: "default" | "primary" | "destructive" | "subtle" | "loading" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    size?: "default" | "link" | "sm" | "lg" | "xl" | "icon" | "circle" | null | undefined;
} & import('class-variance-authority/dist/types').ClassProp) | undefined) => string;
export interface ButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
declare const Button: import('react').ForwardRefExoticComponent<ButtonProperties & import('react').RefAttributes<HTMLButtonElement>>;
export { Button, buttonVariants };
