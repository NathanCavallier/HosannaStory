"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./style.css";
import "../../app/globals.css";
import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import background_image from "../../../public/images/background1.png";
import back_gradient2 from "../../../public/images/back_gradient2.png";
import {
  FaHome,
  FaBook,
  FaMedal,
  FaPodcast,
} from 'react-icons/fa';
import { FaChildren } from "react-icons/fa6";
import BookCard from "@/components/BookCard";


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


export default function Library() {
  const [backgroundImage, setBackgroundImage] = useState(background_image);
  const [accueilBtnStyle, setAccueilBtnStyle] = useState('header__nav-item');
  const [histoiresBtnStyle, setHistoiresBtnStyle] = useState('header__nav-item--active');
  const [livresAudioBtnStyle, setLivresAudioBtnStyle] = useState('header__nav-item');
  const [enfantsBtnStyle, setEnfantsBtnStyle] = useState('header__nav-item');
  const [defisRecompensesBtnStyle, setDefisRecompensesBtnStyle] = useState('header__nav-item');
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(books);
  const router = useRouter();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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
    const results = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(results);
  }, [searchTerm]);

  const handleSearchChange = (e: { target: { value: string; }; }) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleResultClick = (id: number) => {
    setIsDropdownVisible(false);
    router.push(`/library/${id}`);
  };

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
              placeholder="Rechercher un livre..."
              style={{ marginRight: 5, borderRadius: 0, width: 300 }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="search-btn">
              <FaSearch />
            </button>
            {isDropdownVisible && (
              <div className="search-dropdown">
                {filteredBooks.map((book) => (
                  <div
                    key={book.id}
                    className="search-result"
                    onClick={() => handleResultClick(book.id)}
                  >
                    {book.title}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ display: 'flex', alignContent: 'flex-end', justifyContent: 'space-between' }} >
            <div className={accueilBtnStyle} onClick={handleAccueilBtnStyle} style={{ display: 'flex', justifyContent: 'space-between', marginLeft: 150 }}>
              <FaHome style={{ marginRight: 6, marginTop: 4 }} />
              <Link href="/">Accueil</Link>
            </div>
            <div className={histoiresBtnStyle} onClick={handleHistoiresBtnStyle} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <FaBook style={{ marginRight: 6, marginTop: 4 }} />
              <Link href="/library/">Bibliothèque</Link>
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

        {/* Library Section */}
        <section className="library">
          {filteredBooks && filteredBooks.length > 0 ? (
            <div className="books-grid">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} id={book.id} title={book.title} description={book.description} imageUrl={book.imageUrl} />
              ))}
            </div>
          ) : (
            <p>Pas de résultats</p>
          )}
        </section>

        {/* New Arrivals Section */}
        <section className="new-arrivals" id="catalog" style={{ marginBottom: 15 }}>
          <h2>Nouveautés</h2>
          <div className="books-grid">
            {/* Each Book */}
            <div className="book-item">
              <Image src="https://via.placeholder.com/200" alt="Book 1" width={200} height={200} />
              <p>Title of Book 1</p>
              <span>$10.99</span>
              <button>Add to Cart</button>
            </div>
            <div className="book-item">
              <Image src="https://via.placeholder.com/200" alt="Book 2" width={200} height={200} />
              <p>Title of Book 2</p>
              <span>$12.99</span>
              <button>Add to Cart</button>
            </div>
            {/* Add more book items here */}
            <div className="book-item">
              <Image src="https://via.placeholder.com/200" alt="Book 3" width={200} height={200} />
              <p>Title of Book 3</p>
              <span>$14.99</span>
              <button>Add to Cart</button>
            </div>
            <div className="book-item">
              <Image src="https://via.placeholder.com/200" alt="Book 4" width={200} height={200} />
              <p>Title of Book 4</p>
              <span>$16.99</span>
              <button>Add to Cart</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
