interface IToastPayload {
    msg: string;
    timeout?: number;
    background?: string;
    color?: string;
    customClass?: any;
    action?: {
        text?: string;
        onClick?: () => void;
        color?: string;
    };
    onAdd?: () => void;
    onRemove?: () => void;
}

interface IToastData extends IToastPayload {
    id: string;
    timeoutObj?: any;
}