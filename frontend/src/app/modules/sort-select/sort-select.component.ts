import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-sort-select',
    templateUrl: './sort-select.component.html',
    styleUrls: ['./sort-select.component.scss']
})
export class SortSelectComponent implements OnInit {

    @Input('sorts')  sorts!: ISort<any>[];
    @Output('onSortChanged')  onSortChanged: EventEmitter<ISort<any>>;
    isSortSelectOpen!: boolean;
    currentSortIndex!: number;

    constructor() {
        this.onSortChanged = new EventEmitter<ISort<any>>();
    }

    ngOnInit(): void {
        this.isSortSelectOpen = false;
        this.currentSortIndex = 0;
        this.onSortChanged.emit(this.sorts[this.currentSortIndex]);
    }

    toogleSortSelect(event: Event): void {
        this.isSortSelectOpen = !this.isSortSelectOpen;
        event.stopImmediatePropagation();
    }

    @HostListener('document:click', ['$event'])
    closeSelectList(): void {
        this.isSortSelectOpen = false;
    }

    setSortByIndex(index: number): void {
        this.currentSortIndex = index;
        this.onSortChanged.emit(this.sorts[index]);
    }

}
