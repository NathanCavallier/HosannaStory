import React from 'react';
import './videoPlayer.css';

interface VideoPlayerProps {
    videoSrc: string;
    title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, title }) => {
    return (
        <div className="video-player-container">
            <h3>{title}</h3>
            <video controls className="video-player">
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;