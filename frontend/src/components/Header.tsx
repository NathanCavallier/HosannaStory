"use client"; // Ajoutez cette ligne en haut du fichier

import React from 'react';
import Image from 'next/image';
import { FaHome, FaUserFriends, FaBriefcase, FaComments, FaBell, FaEllipsisH, FaSearch } from 'react-icons/fa';
import './Header.css';
import logo from "../../public/images/logo_x2.png";

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="left-section">
                <div className="logo">
                    <Image src={logo} alt="Hosanna Story Logo" width={200} height={100} />
                </div>
                <div className="search-bar">
                    <FaSearch className="search-icon" />
                    <input type="text" placeholder="Recherche" />
                </div>
            </div>

            <div className="middle-section">
                <nav className="menu">
                    <a href="/" className="menu-item">
                        <FaHome />
                        <span>Accueil</span>
                    </a>
                    <a href="/network" className="menu-item">
                        <FaUserFriends />
                        <span>Réseau</span>
                    </a>
                    <a href="/jobs" className="menu-item">
                        <FaBriefcase />
                        <span>Offres d&apos;emploi</span>
                    </a>
                    <a href="/messaging" className="menu-item">
                        <FaComments />
                        <span>Messagerie</span>
                    </a>
                    <a href="/notifications" className="menu-item">
                        <FaBell />
                        <span>Notifications</span>
                    </a>
                </nav>
            </div>

            <div className="right-section">
                <div className="profile">
                    <img src="/profile-pic.jpg" alt="Profil" className="profile-pic" />
                    <div className="dropdown">
                        <span>Nom Prénom</span>
                        <FaEllipsisH />
                    </div>
                </div>
                <a href="/premium" className="premium-link">
                    Réessayez pour 0 EUR
                </a>
            </div>
        </header>
    );
};

export default Header;
