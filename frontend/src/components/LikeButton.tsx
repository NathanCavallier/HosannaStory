import React from 'react';
import './likeButton.css';
import updateStory from '../pages/api/updateFavorite';
import { useState, useEffect } from 'react';

interface LikeButtonProps {
    id: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ id }) => {
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        setFavorite(false);
    }, [favorite]);

    const handleFavorite = async () => {
        try {
            await updateStory(id, !favorite);
            if (favorite) {
                setFavorite(!favorite);
            } else {
                console.error("Error updating favorite");
            }
        } catch (error) {
            console.error("Error updating favorite", error);
        }
    }

    return (
        <button className={`like-button ${favorite ? 'liked' : ''}`} onClick={handleFavorite}>
            {favorite ? '❤️ Liked' : '🤍 Like'}
        </button>
    );
};

export default LikeButton;