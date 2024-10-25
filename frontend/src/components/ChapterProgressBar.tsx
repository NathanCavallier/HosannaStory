import React from 'react';
import './chapterProgressBar.css';

interface ProgressProps {
    current: number;
    total: number;
}

const ChapterProgressBar: React.FC<ProgressProps> = ({ current, total }) => {
    const percentage = (current / total) * 100;

    return (
        <div className="progress-bar">
            <div className="progress" style={{ width: `${percentage}%` }}></div>
        </div>
    );
};

export default ChapterProgressBar;