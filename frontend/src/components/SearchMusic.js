import React, { useState } from 'react';


const API_KEY = 'AIzaSyBqclrJZu6dYrSj5-Kl_5dMpn-t0w7esK4';

function SearchMusic() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchMusic = async () => {
    try {
      if(searchTerm.trim()===''){
        return;
      }
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&key=${API_KEY}&part=snippet&type=video`);
      const data = await response.json();
      setSearchResults(data.items);
      setSearchTerm('');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchMusic();
    }
  };

  return (
    <div className="container">
      <h2 className='music-player'>Music Player</h2>
      <div className="search-container">
        <input
          className='search-bar'
          type="text"
          id="search"
          placeholder="Enter a song or artist"
          value={searchTerm}
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={searchMusic}>Search</button>
      </div>
  
      <div id="results">
        {searchResults.map(result => (
          <div key={result.id.videoId} className="result-item">
            <a
              href={`https://www.youtube.com/watch?v=${result.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {result.snippet.title}
            </a>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default SearchMusic;
