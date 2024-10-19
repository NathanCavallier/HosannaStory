import React from 'react';
import Link from 'next/link';
import "./storyCard.css";

interface StoryCardProps {
    id: string;
    title: string;
    description: string;
    ageCategory: string;
}

const StoryCard: React.FC<StoryCardProps> = ({ id, title, description, ageCategory }) => {
    return (
        <Link href={`/stories/${id}`}>
            <div className="bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-gray-100">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <p className="text-sm text-gray-500">Catégorie : {ageCategory}</p>
            </div>
        </Link>
    );
};

export default StoryCard;