import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AdminPage from './AdminPage';
import GuestPage from './GuestPage';
import PrivateRoute from './PrivateRoute';

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/admin"
                        element={
                            <PrivateRoute role="admin">
                                <AdminPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/guest"
                        element={
                            <PrivateRoute role="guest">
                                <GuestPage />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;