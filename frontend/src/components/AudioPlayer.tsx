import React from 'react';
import './audioPlayer.css';

interface AudioPlayerProps {
  audioSrc: string;
  title: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc, title }) => {
  return (
    <div className="audio-player-container">
      <h3>{title}</h3>
      <audio controls className="audio-player">
        <source src={audioSrc} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;