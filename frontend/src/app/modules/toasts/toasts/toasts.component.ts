import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ToastService } from '../toast.service';

@Component({
    selector: 'agencyapp-toasts',
    templateUrl: './toasts.component.html',
    styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent {

    @Input()
    position!: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

    @Input()
    max!: number;

    $toasts: BehaviorSubject<IToastData[]>;

    constructor(private snackbarService: ToastService) {
        this.$toasts = this.snackbarService.$toasts;
    }

}
