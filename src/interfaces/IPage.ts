export interface IPage {
    content: any;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}