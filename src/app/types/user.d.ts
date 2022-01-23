declare module User {
    export interface User {
        user: user;
    }
    export interface user {
        id: number;
        username: string;
        usertype: string;
        email: string;
        name: string;
    }
}
