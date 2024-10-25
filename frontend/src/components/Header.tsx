"use client";

import React from 'react';
import './header.css';
import '../app/globals.css';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/images/logo_hosanna-story-gray.png';
import {
    FaUser,
} from 'react-icons/fa';
import { IoMdLogIn } from "react-icons/io";
import { IoMdPersonAdd } from "react-icons/io";



interface HeaderProps {
    isAuthenticated: boolean;
    username?: string;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, username }) => {

    return (
        <header className="header">
            <div className="header__logo">
                <Link href="/">
                    <Image src={logo} alt="Hosanna Story" className="logo" />
                </Link>
            </div>
            <div className="header__icons">
                {isAuthenticated ? (
                    <>

                        <li className="header__nav-item">
                            <Link href="/favoris">Favoris</Link>
                        </li>
                        <div className="header__profile">
                            <FaUser className="header__profile-icon" />
                            <span className="header__profile-name">{username}</span>
                        </div>
                        <div className="header__notifications">
                            <i className="icon-bell"></i>
                        </div>
                    <div className="header__auth" style={{ marginRight: 30, display: 'flex', justifyContent: 'space-between' }}>
                        <button className="header__auth-btn" style={{ display: 'flex', justifyContent: 'space-between', marginRight: 15 }}>
                            <IoMdLogIn className="header__auth-icon" width={20} height={20} style={{ marginRight: 5, marginTop: 4 }} />
                            Déconnexion
                        </button>
                        <button className="header__auth-btn" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <IoMdPersonAdd className="header__auth-icon" style={{ marginRight: 5, marginTop: 2 }} />
                            Inscription
                        </button>
                    </div>
                    </>
                ) : (
                    <div className="header__auth" style={{ marginRight: 30, display: 'flex', justifyContent: 'space-between' }}>
                        <button className="header__auth-btn" style={{ display: 'flex', justifyContent: 'space-between', marginRight: 15 }}>
                            <IoMdLogIn className="header__auth-icon" width={20} height={20} style={{ marginRight: 5, marginTop: 4 }} />
                            Connexion
                        </button>
                        <button className="header__auth-btn" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <IoMdPersonAdd className="header__auth-icon" style={{ marginRight: 5, marginTop: 2 }} />
                            Inscription
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;