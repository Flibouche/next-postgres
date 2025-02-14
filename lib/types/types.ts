export interface User {
    id: string;
    name?: string | null;
    email: string;
    emailVerified?: Date;
    password?: string;
    image?: string;
    role: string;
    accounts: Account[];
    sessions: Session[];
    authenticators?: Authenticator[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Account {
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string;
    access_token?: string;
    expires_at: number;
    token_type?: string;
    scope?: string;
    id_token?: string;
    session_state?: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}

export interface Session {
    sessionToken: string;
    userId: string;
    expires: Date;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}

export interface VerificationToken {
    identifier: string;
    token: string;
    expires: Date;
}

export interface Authenticator {
    credentialID: string;
    userId: string;
    providerAccountId: string;
    credentialPublicKey: string;
    counter: number;
    credentialDeviceType: string;
    credentialBackedUp: boolean;
    transports?: string;
    user: User;
}