import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerDetails = () => {
  const [matchDetails, setMatchDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/41881', {
          headers: {
            'x-rapidapi-key': 'e95eaa7a32mshe6980519292f768p11500fjsn308c445c430f',
          },
        });
        setMatchDetails(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  const team1PlayerNames = matchDetails.matchInfo.team1.playerDetails.map(player => player.name);
  const team2PlayerNames = matchDetails.matchInfo.team2.playerDetails.map(player => player.name);

  return (
    <div className="table-responsive"style={{backgroundColor:'green'}}>
      <h1>{matchDetails.matchInfo.venue.name}</h1>
      <table className="table table-bordered table-hover" style={{backgroundColor:'green'}}>
        <thead>
          <tr>
            <th>Team 1 Players</th>
            <th>Team 2 Players</th>
          </tr>
        </thead>
        <tbody>
          {team1PlayerNames.map((playerName, index) => (
            <tr key={index}>
              <td>{playerName}</td>
              <td>{team2PlayerNames[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerDetails;
