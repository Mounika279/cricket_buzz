import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap'; // Assuming you are using React Bootstrap for layout and styling

const MatchDetails = () => {
  const { matchId } = useParams();
  const [matchDetails, setMatchDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMatchDetails = async (matchId) => {
    try {
      const response = await axios.get(`https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchId}`, {
        headers: {
          'X-RapidAPI-Key': 'e95eaa7a32mshe6980519292f768p11500fjsn308c445c430f',
          'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch match details: ${error.message}`);
    }
  };

  useEffect(() => {
    const getMatchDetails = async () => {
      try {
        const data = await fetchMatchDetails(matchId);
        setMatchDetails(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getMatchDetails();
  }, [matchId]);

  const formatPlayerNames = (players) => {
    if (!players) return null;
    return players.map(player => (
      <span key={player.id}>{player.name}, </span>
    ));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!matchDetails) return null;

  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <Card style={{ marginTop: 30 }}>
              <Card.Body>
                <Card.Title>
                  <h4>
                    {matchDetails?.matchInfo?.team1?.name} vs {matchDetails?.matchInfo?.team2?.name}, {matchDetails?.matchInfo?.series?.name}
                  </h4>
                </Card.Title>
                <Card.Text>
                  <div className="venue">
                    <span><strong>Venue</strong>: {matchDetails?.venueInfo?.city}, {matchDetails?.venueInfo?.country}</span>
                  </div>
                  <div className="toss">
                    <p><strong>Toss</strong>: <span style={{ color: "red" }}>{matchDetails.matchInfo?.status}</span></p>
                  </div>
                  <hr />
                  <div className="score">
                    <p style={{ fontSize: 24, color: "green" }}>
                      {matchDetails?.matchInfo?.result?.winningTeam} {matchDetails?.matchInfo?.result?.resultType} by {matchDetails?.matchInfo?.result?.winningMargin} runs.
                    </p>
                  </div>
                  <p>Player of the match: <strong>{matchDetails.matchInfo?.playersOfTheMatch[0]?.name}</strong></p>
                  <hr />
                  <div className="playernames">
                    <h5>Squads:</h5>
                    <strong>{matchDetails.matchInfo.team1.name} </strong>
                    <span>Squad: </span>
                    {formatPlayerNames(matchDetails.matchInfo.team1.playerDetails)}
                  </div>
                  <div className="playernames" style={{ marginTop: 10 }}>
                    <h5>Squads:</h5>
                    <strong>{matchDetails.matchInfo.team2.name} </strong>
                    <span>Squad: </span>
                    {formatPlayerNames(matchDetails.matchInfo.team2.playerDetails)}
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MatchDetails;
