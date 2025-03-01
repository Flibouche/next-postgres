import { prisma } from "@/lib/prisma";
import { User as PrismaUser } from "@prisma/client";

export class User {
    private id: string;
    private name: string | null;
    private email: string;

    constructor(user: PrismaUser) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
    }

    static async findMany(): Promise<User[]> {
        const users = await prisma.user.findMany();
        return users.map((user) => new User(user));
    }

    static async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { id } });
        return user ? new User(user) : null;
    }

    getInfo() {
        return { id: this.id, name: this.name, email: this.email };
    }
}
