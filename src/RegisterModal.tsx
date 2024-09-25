import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Modal.css';

interface User {
    email: string;
    password: string;
    role: 'admin' | 'guest';
}

interface RegisterModalProps {
    onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ onClose }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [role, setRole] = useState<'admin' | 'guest'>('guest');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('password not match');
            return;
        }

        // 获取已注册的用户列表
        const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];

        // 检查邮箱是否已被注册
        if (users.find((user) => user.email === email)) {
            setError('This mail has already been used');
            return;
        }

        // 创建新用户对象
        const newUser: User = { email, password, role };

        // 保存新用户到用户列表
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // 自动登录：将新用户保存为当前用户
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        alert('注册成功');

        // 关闭弹出框
        onClose();

        // 根据用户角色导航到对应的页面
        if (role === 'admin') {
            navigate('/admin');
        } else {
            navigate('/guest');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Register</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleRegister}>
                    <div>
                        <label>Mail：</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password：</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Confirm Password：</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Role：</label>
                        <select value={role} onChange={(e) => setRole(e.target.value as 'admin' | 'guest')}>
                            <option value="admin">admin</option>
                            <option value="guest">guest</option>
                        </select>
                    </div>
                    <button type="submit">Register</button>
                    <button type="button" onClick={onClose}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterModal;