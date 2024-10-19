import React, { useState } from 'react';
import './bookmarkButton.css';

interface BookmarkButtonProps {
    isBookmarked: boolean;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ isBookmarked }) => {
    const [bookmarked, setBookmarked] = useState(isBookmarked);

    const handleBookmark = () => {
        setBookmarked(!bookmarked);
    };

    return (
        <button className={`bookmark-button ${bookmarked ? 'bookmarked' : ''}`} onClick={handleBookmark}>
            {bookmarked ? '🔖 Bookmarked' : '🔖 Bookmark'}
        </button>
    );
};

export default BookmarkButton;