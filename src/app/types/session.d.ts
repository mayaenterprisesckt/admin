declare module Session {
    export interface user {
        id: number;
        username: string;
        usertype: string;
        email: string;
        name: string;
    }

    export interface SessionData {
        success: boolean;
        user: User;
        token: string;
        message: string;
    }
}
