import React, { useState } from 'react';
import axios from 'axios';

const Teams = () => {
  const [matches, setMatches] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMatches = async (matchType) => {
    setLoading(true);
    setError(null);

    const options = {
      method: 'GET',
      url: 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent',
      headers: {
        'x-rapidapi-key': 'e95eaa7a32mshe6980519292f768p11500fjsn308c445c430f',
        'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com',
      },
      params: {
        match_type: matchType,
      },
    };

    try {
      const response = await axios.request(options);
      setMatches(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching matches:', error);
      setError(error);
      setLoading(false);
    }
  };

  const handleLeagueClick = () => {
    fetchMatches('league');
  };

  const handleInternationalClick = () => {
    fetchMatches('international');
  };

  const handleWomenClick = () => {
    fetchMatches('women');
  };

  return (
    <div >
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Cricket Matches</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <button className="nav-link" onClick={handleLeagueClick}>League</button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={handleInternationalClick}>International</button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={handleWomenClick}>Women</button>
              </li>
          
            </ul>
          </div>
        </div>
      </nav>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {matches && (
        <div className="container mt-4">
          {matches.typeMatches.map((typeMatch, index) => (
            <div key={index}>
              <h3>{typeMatch.matchType}</h3>
              {typeMatch.seriesMatches.map((seriesMatch, sIndex) => (
                <div key={sIndex}>
                  {seriesMatch.seriesAdWrapper && (
                    <div>
                      <h4>{seriesMatch.seriesAdWrapper.seriesName}</h4>
                      {seriesMatch.seriesAdWrapper.matches.map((match, mIndex) => (
                        <div key={mIndex}>
                          <p>{match.matchInfo.status}</p>
                          <p>{match.matchInfo.team1.teamName} vs {match.matchInfo.team2.teamName}</p>
                          <p>Venue: {match.matchInfo.venueInfo.ground}, {match.matchInfo.venueInfo.city}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Teams;
