// ChangePasswordModal.tsx

import React, { useState } from 'react';
import './Modal.css';

interface User {
    email: string;
    password: string;
    role: 'admin' | 'guest';
}

interface ChangePasswordModalProps {
    onClose: () => void;
    onPasswordChange: (newPassword: string) => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ onClose, onPasswordChange }) => {
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('两次输入的密码不一致');
            return;
        }
        if (newPassword.length < 6) {
            setError('密码长度至少为6位');
            return;
        }
        onPasswordChange(newPassword);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>修改密码</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>新密码：</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>确认密码：</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">提交</button>
                    <button type="button" onClick={onClose}>
                        取消
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
