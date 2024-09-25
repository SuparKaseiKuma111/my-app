// GuestPage.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GuestPage.css';
import ChangePasswordModal from './ChangePasswordModal';

interface User {
    email: string;
    password: string;
    role: 'admin' | 'guest';
}

const GuestPage: React.FC = () => {
    const navigate = useNavigate();

    // 获取当前用户信息
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null') as User;

    // 使用状态来管理用户的邮箱信息
    const [email, setEmail] = useState<string>(currentUser?.email || '');
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);

    // 如果当前用户不存在，重定向到主页
    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    // 注销功能
    const handleLogout = () => {
        if (window.confirm('确定要注销吗？')) {
            localStorage.removeItem('currentUser');
            alert('已注销');
            navigate('/');
        }
    };

    // 编辑个人信息（修改邮箱）
    const handleEditProfile = () => {
        const newEmail = prompt('请输入新的邮箱：', email);
        if (newEmail) {
            // 简单的邮箱格式验证
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(newEmail)) {
                alert('请输入有效的邮箱地址');
                return;
            }

            // 更新状态中的邮箱
            setEmail(newEmail);

            // 更新 localStorage 中的 currentUser
            const updatedUser = { ...currentUser, email: newEmail };
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));

            // 更新 users 列表中的对应用户信息
            const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
            const updatedUsers = users.map((user) =>
                user.email === currentUser.email ? updatedUser : user
            );
            localStorage.setItem('users', JSON.stringify(updatedUsers));

            alert('信息更新成功');
        }
    };

    // 处理密码修改
    const handlePasswordChange = (newPassword: string) => {
        const updatedUser = { ...currentUser, password: newPassword };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        // 更新 users 列表中的对应用户信息
        const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
        const updatedUsers = users.map((user) =>
            user.email === currentUser.email ? updatedUser : user
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        alert('密码修改成功');
    };

    return (
        <div className="guest-container">
            <h2>欢迎，{email}！</h2>
            {/* 按钮组 */}
            <div className="button-group">
                <button className="guest-button logout-button" onClick={handleLogout}>
                    注销
                </button>
                <button className="guest-button edit-profile-button" onClick={handleEditProfile}>
                    编辑邮箱
                </button>
                <button className="guest-button change-password-button" onClick={() => setIsPasswordModalOpen(true)}>
                    修改密码
                </button>
            </div>

            {/* 个人信息展示 */}
            <h3>个人信息</h3>
            <div className="profile-info">
                <p><strong>邮箱：</strong>{email}</p>

            </div>

            {/* 修改密码模态框 */}
            {isPasswordModalOpen && (
                <ChangePasswordModal
                    onClose={() => setIsPasswordModalOpen(false)}
                    onPasswordChange={handlePasswordChange}
                />
            )}
        </div>
    );
};

export default GuestPage;
