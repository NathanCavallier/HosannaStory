// components/BookCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './bookCard.css';

interface BookCardProps {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, description, imageUrl }) => {
    return (
        <div className="book-card" key={id}>
            <Image src={imageUrl} alt={title} width={150} height={150} className="book-image" />
            <h2 className="book-title">{title}</h2>
            <p className="book-description">{description}</p>
            <Link href={`/library/${id}`}>
                <p className="book-link">Lire plus</p>
            </Link>
        </div>
    );
};

export default BookCard;