import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Modal.css';

interface User {
    email: string;
    password: string;
    role: 'admin' | 'guest';
}

interface LoginModalProps {
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // 获取已注册的用户列表
        const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];

        // 验证用户
        const user = users.find(
            (user) => user.email === email && user.password === password
        );

        if (user) {
            alert('登录成功');

            // 保存当前用户信息到 localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));

            // 关闭弹出框
            onClose();

            // 根据用户角色导航到不同的页面
            if (user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/guest');
            }
        } else {
            setError('邮箱或密码错误');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>登录</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <div>
                        <label>邮箱：</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>密码：</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">登录</button>
                    <button type="button" onClick={onClose}>
                        取消
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;