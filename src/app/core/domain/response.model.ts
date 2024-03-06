export interface ResponseModel<T> {
    status:boolean;
    message:string;
    data:T;
}