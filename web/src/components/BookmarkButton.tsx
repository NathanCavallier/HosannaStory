import React, { useState } from 'react';
import './bookmarkButton.css';

const BookmarkButton: React.FC = () => {
    const [bookmarked, setBookmarked] = useState(false);

    const toggleBookmark = () => {
        setBookmarked(!bookmarked);
    };

    return (
        <button className={`bookmark-button ${bookmarked ? 'bookmarked' : ''}`} onClick={toggleBookmark}>
            {bookmarked ? '🔖 Bookmarked' : '📑 Bookmark'}
        </button>
    );
};

export default BookmarkButton;