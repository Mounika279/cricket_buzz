import axios from 'axios';

 const fetchMatchDetails = async (matchId) => {
  try {
    const response = await axios.get(`https://api.example.com/matches/${matchId}`);
    return response.data;
  } catch (error) {
    throw error; 
}
}
export default fetchMatchDetails




