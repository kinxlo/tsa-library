interface ModalProperties {
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}
export declare const Modal: React.FC<ModalProperties>;
export {};
