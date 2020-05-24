import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'app-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent {

    @Input()
    title!: string;
    @Input()
    hideTitle!: string;
    @Output()
    opened: EventEmitter<Event>;
    @Output()
    closed: EventEmitter<Event>;

    @ViewChild('accordionPanel', { static: true })
    private _accordionPanel!: ElementRef;
    private _isOpen: boolean;

    constructor() {
        this._isOpen = false;
        this.opened = new EventEmitter<Event>();
        this.closed = new EventEmitter<Event>();
    }

    get isOpen(): boolean {
        return this._isOpen;
    }

    toggleAccordian(event: Event): void {
        event.stopImmediatePropagation();
        this._isOpen = !this._isOpen;
        this.setMaxHeight();
        if (this._isOpen) {
            this.opened.emit(event);
        } else {
            this.closed.emit(event);
        }
    }

    private setMaxHeight(): void {
        const maxHeight: number = this._accordionPanel.nativeElement.scrollHeight;
        if (this._isOpen) {
            this._accordionPanel.nativeElement.style.maxHeight = `${maxHeight}px`;
        } else {
            this._accordionPanel.nativeElement.style.maxHeight = '0px';
        }
    }

}
