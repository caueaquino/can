export class HttpRequestResult<T> {
    data: T;
    error?: any;
    message?: string;
    status: number;

    constructor() { }
}
