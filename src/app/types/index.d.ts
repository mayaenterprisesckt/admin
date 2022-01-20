declare module GetUser {
    export interface User {
        id: number;
        username: string;
        usertype: string;
        email: string;
        name: string;
    }

    export interface RootObject {
        success: boolean;
        user: User;
        token: string;
        message: string;
    }
}
