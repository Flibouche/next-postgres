"use client";

import { Session } from "next-auth";
import { ReactNode } from "react";

interface IsUserProps {
    children: ReactNode;
    user: Session["user"] | null;
}

const IsUser = ({ children, user }: IsUserProps) => {
    if (user?.role === "USER" || user?.role === "ADMIN") {
        return <>{children}</>;
    }

    return null;
};

export default IsUser;