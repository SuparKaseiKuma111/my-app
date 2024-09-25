// AdminPage.tsx

import React, { useState, useEffect } from 'react';
import './AdminPage.css';

interface User {
    email: string;
    password: string;
    role: 'admin' | 'guest';
}

const AdminPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]') as User[];
        setUsers(storedUsers);
    }, []);

    const handleDeleteUser = (email: string) => {
        if (window.confirm(`确定要删除用户 ${email} 吗？`)) {
            const updatedUsers = users.filter((user) => user.email !== email);
            setUsers(updatedUsers);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
        }
    };

    const handleChangePassword = (email: string) => {
        // 这里可以集成一个更复杂的密码修改流程，例如弹出模态框
        const newPassword = prompt('请输入新密码：');
        if (newPassword) {
            const updatedUsers = users.map((user) => {
                if (user.email === email) {
                    return { ...user, password: newPassword };
                }
                return user;
            });
            setUsers(updatedUsers);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            alert('密码修改成功');
        }
    };

    return (
        <div className="admin-container">
            <h2>欢迎，管理员！</h2>
            <h3>用户列表：</h3>
            <table className="admin-table">
                <thead>
                <tr>
                    <th>邮箱</th>
                    <th>角色</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.email}>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            <button
                                className="admin-button delete-button"
                                onClick={() => handleDeleteUser(user.email)}
                            >
                                删除用户
                            </button>
                            <button
                                className="admin-button change-password-button"
                                onClick={() => handleChangePassword(user.email)}
                            >
                                修改密码
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
