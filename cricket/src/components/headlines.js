import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsComponent = () => {
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            const options = {
                method: 'GET',
                url: 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/detail/122025',
                headers: {
                    'x-rapidapi-key': '32504a9846msh98f913fe5863484p1b64ffjsnd783f8c6e0be',
                    'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                console.log('News Response:', response.data);
                setNews(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching news:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Error: {error.message}</h1>;
    }

    if (!news) {
        return null;
    }

    return (
        <div className="container mt-4">
            <h2>{news.headline}</h2>
            <img src={news.coverImage && news.coverImage.url} alt={news.coverImage && news.coverImage.caption} style={{ maxWidth: '100%' }} />
            {news.content && news.content.map((segment, index) => (
                <p key={index}>{segment.contentValue}</p>
            ))}
          
         
        </div>
    );
};

export default NewsComponent;
