import React from 'react';
import Link from 'next/link';
import "./chapterCard.css";

interface ChapterCardProps {
    storyId: string;
    chapterId: string;
    title: string;
    duration?: string;
}

const ChapterCard: React.FC<ChapterCardProps> = ({ storyId, chapterId, title, duration }) => {
    return (
        <Link href={`/stories/${storyId}/${chapterId}`}>
            <div className="bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-gray-100">
                <h4 className="text-lg font-bold">{title}</h4>
                {duration && <p className="text-sm text-gray-500">Durée : {duration}</p>}
            </div>
        </Link>
    );
};

export default ChapterCard;