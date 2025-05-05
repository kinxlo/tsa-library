import { FC, HtmlHTMLAttributes, ReactNode } from 'react';
interface WrapperProperties extends HtmlHTMLAttributes<HTMLDivElement> {
    width?: string;
    height?: string;
    children?: ReactNode;
}
export declare const Wrapper: FC<WrapperProperties>;
export {};
