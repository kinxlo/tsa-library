type User = {
    name: string;
};
export interface HeaderProperties {
    user?: User;
    onLogin?: () => void;
    onLogout?: () => void;
    onCreateAccount?: () => void;
}
export declare const Header: ({ user, onLogin, onLogout, onCreateAccount }: HeaderProperties) => import("react/jsx-runtime").JSX.Element;
export {};
