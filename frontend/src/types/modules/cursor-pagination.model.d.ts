interface ICursorPaginationQueryParams {
    page: number;
    page_size?: string| number;
    search?: string;
}

interface ICursorPagination<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}