import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import "./storyCard.css";
import LikeButton from './LikeButton';

interface StoryCardProps {
    id: string;
    title: string;
    description: string;
    ageCategory: string;
    picture: string;
    authorId: number;
    isPublished: boolean;
    categories: string[];
    coverImage?: string;
    isFavorite?: boolean;
}

const StoryCard: React.FC<StoryCardProps> = ({ id, title, description, ageCategory, picture, authorId, isPublished: published, categories, coverImage }) => {

    return (
        <Link href={`/stories/${id}`}>
            <Image src={coverImage || picture} alt={title} width={500} height={192} className="w-full h-48 object-cover rounded-t-lg mb-4" />
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <p className="text-sm text-gray-500">Catégorie : {ageCategory}</p>
            <p className="text-sm text-gray-500">Auteur ID : {authorId}</p>
            <p className="text-sm text-gray-500">Publié : {published ? "Oui" : "Non"}</p>
            <p className="text-sm text-gray-500">Catégories : {categories.join(', ')}</p>
            <LikeButton id={id} />
        </Link>
    );
};

export default StoryCard;