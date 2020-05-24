import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output } from '@angular/core';
import { filter, map, toArray } from 'rxjs/operators';
import { Observable, range } from 'rxjs';

export const PAGINATION_LIMIT_LENGTH: number = 10;

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

    currentPage!: number;
    totalPages!: number;
    pages!: Observable<number[]>;
    loading!: boolean;

    @Input()  offset!: number;
    @Input()  size!: number;
    @Input()  limit: number = PAGINATION_LIMIT_LENGTH;
    @Input()  range: number = 2;

    @Output('onPageChange')  pageChange!: EventEmitter<number>;

    constructor() {
        this.pageChange = new EventEmitter<number>();
    }

    ngOnInit(): void {
        this.getPages(this.offset, this.limit, this.size);
    }

    @HostListener('window:keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        if (event.key === 'ArrowLeft') {
            this.previous();
        } else if (event.key === 'ArrowRight') {
            this.next();
        }
    }

    ngOnChanges(): void {
        this.getPages(this.offset, this.limit, this.size);
    }

    next(): void {
        if (this.currentPage === this.totalPages) {
            return;
        }
        this.loading = true;
        this.pageChange.emit((this.currentPage) * this.limit);
    }

    previous(): void {
        if (this.currentPage === 1) {
            return;
        }
        this.loading = true;
        this.pageChange.emit((this.currentPage - 2) * this.limit);
    }

    setPage(page: number): void {
        if (this.isValidPageNumber(page, this.totalPages)) {
            this.loading = true;
            this.pageChange.emit((page - 1) * this.limit);
        }
    }

    private getPages(offset: number, limit: number, size: number): void {
        this.currentPage = this.getCurrentPage(offset, limit);
        this.totalPages = this.getTotalPages(limit, size);
        this.pages = range(-this.range, this.range * 2 + 1).pipe(
            map((indent: number) => this.currentPage + indent),
            filter((page: number) => this.isValidPageNumberForRange(page, this.totalPages)),
            toArray()
        );
        setTimeout(() => this.loading = false, 0);
    }

    private getCurrentPage(offset: number, limit: number): number {
        return Math.floor(offset / limit) + 1;
    }

    private getTotalPages(limit: number, size: number): number {
        return Math.ceil(Math.max(size, 1) / Math.max(limit, 1));
    }

    private isValidPageNumber(page: number, totalPages: number): boolean {
        return page > 0 && page <= totalPages;
    }

    private isValidPageNumberForRange(page: number, totalPages: number): boolean {
        return page > 1 && page < totalPages;
    }

}
