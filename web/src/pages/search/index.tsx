"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import "./style.css";
import "../../app/globals.css";
import Image from "next/image";
import Link from "next/link";
import background_image from "../../../public/images/background1.png";
import back_gradient2 from "../../../public/images/back_gradient2.png";
import {
    FaHome,
    FaBook,
    FaMedal,
    FaPodcast,
} from 'react-icons/fa';
import { FaSearch } from "react-icons/fa";
import { FaChildren } from "react-icons/fa6";

const books = [
    {
        id: 1,
        title: 'Book 1',
        description: 'Description of Book 1',
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        id: 2,
        title: 'Book 2',
        description: 'Description of Book 2',
        imageUrl: 'https://via.placeholder.com/150',
    },
    // Ajoutez d'autres livres ici
];

interface book {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}

const Search = () => {
    const router = useRouter();
    const { query } = router.query;
    const [filteredBooks, setFilteredBooks] = useState<book[]>([]);
    const [isScrolled, setIsScrolled] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(background_image);
    const [accueilBtnStyle, setAccueilBtnStyle] = useState('header__nav-item');
    const [histoiresBtnStyle, setHistoiresBtnStyle] = useState('header__nav-item--active');
    const [livresAudioBtnStyle, setLivresAudioBtnStyle] = useState('header__nav-item');
    const [enfantsBtnStyle, setEnfantsBtnStyle] = useState('header__nav-item');
    const [defisRecompensesBtnStyle, setDefisRecompensesBtnStyle] = useState('header__nav-item');
    const [searchTerm, setSearchTerm] = useState('');

    //#region Button Styles
    const handleAccueilBtnStyle = () => {
        setAccueilBtnStyle('header__nav-item header__nav-item--active');
        setHistoiresBtnStyle('header__nav-item');
        setLivresAudioBtnStyle('header__nav-item');
        setEnfantsBtnStyle('header__nav-item');
        setDefisRecompensesBtnStyle('header__nav-item');
    }
    const handleHistoiresBtnStyle = () => {
        setAccueilBtnStyle('header__nav-item');
        setHistoiresBtnStyle('header__nav-item header__nav-item--active');
        setLivresAudioBtnStyle('header__nav-item');
        setEnfantsBtnStyle('header__nav-item');
        setDefisRecompensesBtnStyle('header__nav-item');
    }
    const handleLivresAudioBtnStyle = () => {
        setAccueilBtnStyle('header__nav-item');
        setHistoiresBtnStyle('header__nav-item');
        setLivresAudioBtnStyle('header__nav-item header__nav-item--active');
        setEnfantsBtnStyle('header__nav-item');
        setDefisRecompensesBtnStyle('header__nav-item');
    }
    const handleEnfantsBtnStyle = () => {
        setAccueilBtnStyle('header__nav-item');
        setHistoiresBtnStyle('header__nav-item');
        setLivresAudioBtnStyle('header__nav-item');
        setEnfantsBtnStyle('header__nav-item header__nav-item--active');
        setDefisRecompensesBtnStyle('header__nav-item');
    }
    const handleDefisRecompensesBtnStyle = () => {
        setAccueilBtnStyle('header__nav-item');
        setHistoiresBtnStyle('header__nav-item');
        setLivresAudioBtnStyle('header__nav-item');
        setEnfantsBtnStyle('header__nav-item');
        setDefisRecompensesBtnStyle('header__nav-item header__nav-item--active');
    }
    //#endregion

    useEffect(() => {
        const fetchBackgroundImage = async () => {
            setBackgroundImage(background_image);
        };
        fetchBackgroundImage();

        const handleScroll = () => {
            if (window.scrollY > 365) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll)
        };
    }, []);


    useEffect(() => {
        if (query) {
            const results = books.filter(book =>
                book.title.toLowerCase().includes(Array.isArray(query) ? query[0].toLowerCase() : query.toLowerCase())
            );
            setFilteredBooks(results);
        }
    }, [query]);


    return (
        <div className="min-h-screen flex flex-col">
            <div className="background-image">
                <Image src={backgroundImage} alt="" layout="fill" objectFit="cover" />
            </div>
            <div className="background-image">
                <Image src={back_gradient2} alt="" layout="fill" objectFit="cover" style={{ opacity: 0.8 }} />
            </div>
            <Header isAuthenticated={false} />
            <main className="flex-grow p-8" style={{ minHeight: "calc(100vh - 64px)", marginTop: "260px", marginLeft: 15, marginRight: 15, background: 'none' }}>
                {/* Barre de recherche */}
                <section className={`search-bar_section ${isScrolled ? 'sub-header--scrolled' : ''}`} style={{ display: 'flex', alignContent: 'flex-start', justifyContent: 'space-between', marginBottom: 25, marginTop: 0 }}>
                    <div style={{ display: 'flex', alignContent: 'flex-start', justifyContent: 'space-between' }} >
                        <input
                            className="search-bar"
                            type="text"
                            placeholder="Search for books..."
                            style={{ marginRight: 5, borderRadius: 0, width: 300 }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="search-btn">
                            <FaSearch />
                        </button>
                    </div>
                    <div style={{ display: 'flex', alignContent: 'flex-end', justifyContent: 'space-between' }} >
                        <div className={accueilBtnStyle} onClick={handleAccueilBtnStyle} style={{ display: 'flex', justifyContent: 'space-between', marginLeft: 150 }}>
                            <FaHome style={{ marginRight: 6, marginTop: 4 }} />
                            <Link href="/">Accueil</Link>
                        </div>
                        <div className={histoiresBtnStyle} onClick={handleHistoiresBtnStyle} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <FaBook style={{ marginRight: 6, marginTop: 4 }} />
                            <Link href="/library">Bibliothèque</Link>
                        </div>
                        <div className={livresAudioBtnStyle} onClick={handleLivresAudioBtnStyle} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <FaPodcast style={{ marginRight: 6, marginTop: 4 }} />
                            <Link href="/livres-audio">Podcasts</Link>
                        </div>
                        <div className={enfantsBtnStyle} onClick={handleEnfantsBtnStyle} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <FaChildren style={{ marginRight: 6, marginTop: 4 }} />
                            <Link href="/jeunesse">Jeunesse</Link>
                        </div>
                        <div className={defisRecompensesBtnStyle} onClick={handleDefisRecompensesBtnStyle} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <FaMedal style={{ marginRight: 6, marginTop: 4 }} />
                            <Link href="/defis-recompenses">Défis & Récompenses</Link>
                        </div>
                    </div>
                </section>

                {/* Resultats de recherche */}
                <section className="library">
                    <div className="books-grid">
                        {filteredBooks.length > 0 ? (
                            filteredBooks.map((book) => (
                                <BookCard key={book.id} {...book} />
                            ))
                        ) : (
                            <p>Pas de résultats</p>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Search;