export interface BodyParam {
    active: boolean;
    key: string;
    value: unknown;
}

export interface Request {
    url: string;
    path: string;
    method: string;
    auth: string;
    httpUser: string;
    params?: Param[];
    paramsUri?: Array<number>;
    httpPassword: string;
    passwordFieldType: string;
    bearerToken: string;
    headers: unknown[];
    rawParams: string;
    rawInput: boolean;
    contentType: string;
    requestType: string;
    preRequestScript: string;
    testScript: string;
    name: string;
    bodyParams: BodyParam[];
}

export interface Param {
    key: string;
    value: string;
    active: boolean;
}

export interface RootObject {
    name: string;
    folders: unknown[];
    requests: Request[];
}