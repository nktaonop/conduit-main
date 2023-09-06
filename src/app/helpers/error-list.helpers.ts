export interface ErrorResponse {
    [key: string]: string[];
}

export const parseErrorList = (response: any): ErrorResponse => {
    return response.response.data.errors;
}
