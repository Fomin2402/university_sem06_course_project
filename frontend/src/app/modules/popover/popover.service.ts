import { Subscription } from 'rxjs';
import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    EmbeddedViewRef,
    Injectable,
    Injector,
    Type,
    ComponentFactory,
    ElementRef,
    OnDestroy
} from '@angular/core';

import { PopoverComponent } from './popover.component';
import { DynamicComponentRef } from 'src/app/common';
import { CustomInjector } from 'src/app/common';
import { PopoverData } from './popover-data';

@Injectable()
export class PopoverService implements OnDestroy {

    popoverComponentRef!: ComponentRef<PopoverComponent>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) { }

    open<DATA_TYPE>(
        componentType: Type<any>,
        container: ElementRef,
        popoverData: PopoverData<DATA_TYPE>
    ): DynamicComponentRef {
        const popoverRef: DynamicComponentRef = this.appendDialogComponentToBody<DATA_TYPE>(container, popoverData);

        this.popoverComponentRef.instance.childComponentType = componentType;

        return popoverRef;
    }

    ngOnDestroy(): void {
        if (this.popoverComponentRef) {
            this.popoverComponentRef.instance.onOverlayClicked();
        }
    }

    private appendDialogComponentToBody<DATA_TYPE>(
        container: ElementRef,
        popoverData: PopoverData<DATA_TYPE>
    ): DynamicComponentRef {
        const map: WeakMap<any, any> = new WeakMap();
        map.set(PopoverData, popoverData);

        const popoverRef: DynamicComponentRef = new DynamicComponentRef();
        map.set(DynamicComponentRef, popoverRef);

        const subscription: Subscription = popoverRef.afterClosed.subscribe(() => {
            this.removePopoverComponentFromBody();
            subscription.unsubscribe();
        });

        const componentFactory: ComponentFactory<PopoverComponent> =
            this.componentFactoryResolver.resolveComponentFactory(PopoverComponent);
        const componentRef: any = componentFactory.create(new CustomInjector(this.injector, map));

        this.appRef.attachView(componentRef.hostView);

        const domElem: HTMLElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        container.nativeElement.appendChild(domElem);

        this.popoverComponentRef = componentRef;

        this.popoverComponentRef.instance.onClose.subscribe(() => this.removePopoverComponentFromBody());

        return popoverRef;
    }

    private removePopoverComponentFromBody(): void {
        this.appRef.detachView(this.popoverComponentRef.hostView);
        this.popoverComponentRef.destroy();
    }

}
