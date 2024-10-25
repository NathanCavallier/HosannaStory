import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import './histoires.css';

const Histoires: React.FC = () => {
    const stories = [
        {
            id: 1,
            title: 'Story 1',
            description: 'Description of Story 1',
            imageUrl: 'https://via.placeholder.com/200',
        },
        {
            id: 2,
            title: 'Story 2',
            description: 'Description of Story 2',
            imageUrl: 'https://via.placeholder.com/200',
        },
        {
            id: 3,
            title: 'Story 3',
            description: 'Description of Story 3',
            imageUrl: 'https://via.placeholder.com/200',
        },
        {
            id: 4,
            title: 'Story 4',
            description: 'Description of Story 4',
            imageUrl: 'https://via.placeholder.com/200',
        },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Header isAuthenticated={false} />
            <main className="flex-grow bg-gray-100 p-8">
                <h1 className="text-3xl font-bold mb-8">Histoires</h1>
                <div className="stories-grid">
                    {stories.map((story) => (
                        <div key={story.id} className="story-card">
                            <Image src={story.imageUrl} alt={story.title} width={200} height={200} className="story-image" />
                            <h2 className="story-title">{story.title}</h2>
                            <p className="story-description">{story.description}</p>
                            <Link href={`/stories/${story.id}`}>
                                <a className="story-link">Lire plus</a>
                            </Link>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Histoires;