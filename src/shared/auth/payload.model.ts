export interface JwtPayload {
    email: string;
    role: string;
    firstName: string;
    lastName: string;
}

export interface Token {
    token: string;
    expireIn: number;
}