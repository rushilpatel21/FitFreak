import React from 'react';

const RecommendedMusic = () => {
  const playlists = [
    {
      title: 'High Intensity Workout',
      imageUrl: require('../assets/HighIntensityWorkoutImage.jpg'),
      spotifyLink: 'https://open.spotify.com/album/1YiQva7apVKbVNv8NMorNZ',
    },
    {
      title: 'Cardio Blast',
      imageUrl: require('../assets/CardioBlastImage.jpg'),
      spotifyLink: 'https://open.spotify.com/album/6yDNWkIj8xl5UMMvIl38i1',
    },
    {
      title: 'Strength Training',
      imageUrl: require('../assets/StrengthTrainingImage.jpeg'),
      spotifyLink: 'https://open.spotify.com/album/6shjYcaDQhnCNaSmOG51Wy',
    },
    {
      title: 'Yoga & Meditation',
      imageUrl: require('../assets/YogaMeditationImage.jpeg'),
      spotifyLink: 'https://open.spotify.com/playlist/37i9dQZF1DX9uKNf5jGX6m',
    },
  ];

  return (
    <div className="recommended-music-container">
      <h2 className='music-player'>Recommended Music</h2>
      <div className="recommended-music-buttons">
        {playlists.map((playlist, index) => (
          <a key={index} href={playlist.spotifyLink} target="_blank" rel="noopener noreferrer">
            <div className="music-button" style={{ backgroundImage: `url(${playlist.imageUrl})` }}>
              <span className="button-title">{playlist.title}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RecommendedMusic;
