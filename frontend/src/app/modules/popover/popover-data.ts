export interface IPopoverConfig {
    horizontal: 'left' | 'right';
    vertical: 'top' | 'bottom';
    indent?: boolean;
}

export class PopoverData<T> {
    get indent(): boolean {
        return this.config.indent;
    }

    get horizontal(): 'left' | 'right' {
        return this.config.horizontal;
    }
    get vertical(): 'top' | 'bottom' {
        return this.config.vertical;
    }

    constructor(private config: IPopoverConfig, public data?: T) {}
}
