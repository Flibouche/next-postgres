"use client";

import React, { useEffect, useState } from 'react'

const UsersPage = () => {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/user');
            const { data } = await response.json();
            console.log(data);
            setUsers(data);
        }

        fetchUsers();
    }, []);

    return (
        <div>
            <h1 className='font-bold'>Users :</h1>
            <ul>
                {users?.map((user) => (
                    <div key={user.id} className='flex gap-5'>
                        <span>{user.name}</span>
                        <span>{user.email}</span>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default UsersPage