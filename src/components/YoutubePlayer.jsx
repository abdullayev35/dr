import React from 'react';

const YouTubePlayer = ({ videoId }) => {
    const videoUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div>
            <iframe
                className="yt-iframe"
                src={videoUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default YouTubePlayer;
