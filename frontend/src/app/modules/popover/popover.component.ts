import { Subject, Observable } from 'rxjs';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    OnDestroy,
    Type,
    ViewChild,
    ComponentFactory,
    ViewContainerRef,
    HostListener
} from '@angular/core';

import { PopoverInsertionDirective } from './popover-insertion.directive';
import { DynamicComponentRef } from 'src/app/common';
import { PopoverData } from './popover-data';

@Component({
    selector: 'app-popover',
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements AfterViewInit, OnDestroy {

    componentRef: ComponentRef<any>;

    @ViewChild(PopoverInsertionDirective)
    insertionPoint: PopoverInsertionDirective;

    childComponentType: Type<any>;
    onClose: Observable<any> ;

    private readonly _onClose: Subject<any>;
    private isOpenedRecently: boolean;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private cd: ChangeDetectorRef,
        private popoverRef: DynamicComponentRef,
        public data: PopoverData<any>
    ) {
        this._onClose = new Subject<any>();
        this.onClose = this._onClose.asObservable();
        this.isOpenedRecently = true;
    }

    ngAfterViewInit(): void {
        this.loadChildComponent(this.childComponentType);
        this.cd.detectChanges();
    }

    @HostListener('click')
    onDialogClicked(): void {
        this.isOpenedRecently = true;
    }

    @HostListener('document:click')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onOverlayClicked(): void {
        if (this.isOpenedRecently) {
            this.isOpenedRecently = false;
            return;
        }
        this.popoverRef.close();
    }

    loadChildComponent(componentType: Type<any>): void {
        const componentFactory: ComponentFactory<Type<any>> =
            this.componentFactoryResolver.resolveComponentFactory(componentType);

        const viewContainerRef: ViewContainerRef = this.insertionPoint.viewContainerRef;
        viewContainerRef.clear();

        this.componentRef = viewContainerRef.createComponent(componentFactory);
    }

    ngOnDestroy(): void {
        if (this.componentRef) {
            this.componentRef.destroy();
        }
    }

    close(): void {
        this._onClose.next();
    }

}
