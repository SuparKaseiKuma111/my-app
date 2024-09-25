import React, { useState } from 'react';
import './HomePage.css';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const HomePage: React.FC = () => {
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);

    return (
        <div id="home" className="bg">
            <header className="page-header wrap"></header>

            <div className="home-content wrap">
                <h2 className="page-title">Please enjoy our game</h2>
                <p className="page-p">
                    Whether you're a casual gamer or a hardcore enthusiast, our platform offers the latest games, exclusive trailers, screenshots, interviews with the development team, and information about upcoming events. Download or purchase your favorite games today and immerse yourself in an unforgettable experience. Let the adventure begin!                </p>

                {/* 添加两个按钮 */}
                <div className="buttons">
                    <button className="btn-login" onClick={() => setShowLoginModal(true)}>
                        login
                    </button>
                    <button className="btn-register" onClick={() => setShowRegisterModal(true)}>
                        register
                    </button>
                </div>
            </div>

            {/* 登录和注册弹出框 */}
            {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)}/>}
            {showRegisterModal && <RegisterModal onClose={() => setShowRegisterModal(false)}/>}


            {/* 新添加的服务部分 */}
            <section className="services-section">
                <h2 className="services-title">Our Services</h2>
                <p className="services-description">We provide top-notch game development services to help you bring
                    your ideas to life.</p>
                <ul className="services-list">
                    <li><strong>Game Development and Design:</strong> Comprehensive game development from concept to
                        final product, ensuring smooth and innovative gameplay.
                    </li>
                    <li><strong>Cross-Platform Game Support:</strong> Seamless gaming experience across PC, mobile, and
                        console platforms to reach a broader audience.
                    </li>
                    <li><strong>Game Server Maintenance and Hosting:</strong> Professional server maintenance and 24/7
                        monitoring for stable and secure online functionality.
                    </li>
                    <li><strong>Game Testing and Quality Assurance:</strong> Ensure game stability and performance
                        through functional, stress, and user experience testing.
                    </li>
                    <li><strong>Game Marketing and Launch Support:</strong> Strategize and execute global game launches
                        through targeted ads and social media promotion.
                    </li>
                    <li><strong>Player Support and Community Management:</strong> Manage player feedback and enhance
                        interaction between developers and the gaming community.
                    </li>
                    <li><strong>Virtual Goods and Microtransaction Systems:</strong> Design custom in-game purchase
                        systems to maximize revenue through virtual items and microtransactions.
                    </li>
                </ul>
            </section>


            {/* 联系部分 */}
            <section className="contact-section">
                <h2 className="contact-title">Contacts</h2>
                <p className="contact-info">
                    Phone: ０８０-４４９８-３７４９<br/>
                    Email: cyoukasei0118@gmail.com
                </p>
                <p className="contact-address">京都情報大学院大学</p>


            </section>


        </div>
    );
};

export default HomePage;