export interface JwtPayload {
    address1: string;
    address2?: string;
    agreement: boolean;
    birthday: Date;
    city: string;
    company: string;
    country: string;
    email: string;
    firstname: string;
    gender: string;
    lastname: string;
    phone: string;
    postcode: string;
    regionstate: string;
}

export interface Token {
    token: string;
    expireIn: number;
    refreshToken: string;
}