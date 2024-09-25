import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: JSX.Element;
    role: 'admin' | 'guest';
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, role }) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

    if (!currentUser) {
        // 如果用户未登录，重定向到登录页面
        return <Navigate to="/login" />;
    }

    if (currentUser.role !== role) {
        // 如果角色不匹配，重定向到主页或显示错误
        return <Navigate to="/" />;
    }

    // 如果验证通过，渲染子组件
    return children;
};

export default PrivateRoute;