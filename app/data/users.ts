const users = [
    {
        email: "test@email.com",
        password: "password"
    },
    {
        email: "test2@email.com",
        password: "password"
    },
    {
        email: "test3@email.com",
        password: "password"
    },
]

export const getUsersByEmail = email => {
    const found = users.find(user => user.email === email);
    return found;
}