export interface createUserInput {
    name:string;
    email:string;
    password:string;
}

export interface loginUserInput {
    email: string;
    password: string;
}

export interface getUserSchema {
    userId: string
}