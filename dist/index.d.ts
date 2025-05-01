import * as react from 'react';
import { ReactNode, MouseEventHandler, FC } from 'react';

type Variant = "default" | "primary" | "destructive" | "subtle" | "loading" | "outline" | "secondary" | "ghost" | "link";
type Size = "default" | "sm" | "lg" | "xl" | "link" | "icon" | "circle";
interface ButtonProperties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
/**
 * CustomButton component to render a button with various styles and states.
 *
 * @param {ButtonProps} props - Properties to configure the button.
 * @returns {JSX.Element} The rendered button component.
 */
declare const CustomButton: react.ForwardRefExoticComponent<ButtonProperties & react.RefAttributes<HTMLButtonElement>>;

declare function InputField({ label, name, type, placeholder, required, disabled, options, className, containerClassName, leftAddon, rightAddon, labelDetailedNode, onChange, }: FormFieldProperties): react.JSX.Element;

type LogoProperties = {
    logo?: string;
    width?: number;
    height?: number;
    className?: string;
};
declare const Logo: FC<LogoProperties>;

export { CustomButton, InputField, Logo };
