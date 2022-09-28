import './styles/News.scss';
import React, { useState, useEffect,} from "react";
import axios from "axios";
import { Card } from '@mui/material';

const News = () => {
  const [news, setNews] = useState([]);
  let temp = []

  useEffect(() => {
    fetchNews();
  });

  const fetchNews = async () => {
    await axios
      .get('https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=COIN,CRYPTO:BTC,FOREX:USD&time_from=20220410T0130&limit=200&apikey=2J87TY3KKGLCJ9OG')
      .then(({ data }) => {
      
        for(let i = 0; i<data.feed.length; i++)
        {
          temp.push(data.feed[i]);
        }
        setNews(temp)
      })
  }; 

 

  return (
    <>
      <h3 className="my-5 head">
        Latest Finance News
      </h3>
    <div className="news">
      {React.Children.toArray(
      news.map((item) => (  
      <a className='card__link' href={item.url}>
      <Card className='card'>
        <figure className='card__shape'>
          <img className='card__img' src={item.banner_image} alt="Banner" />
        </figure>
        
          <h3>{item.title}</h3>
        <p>{item.summary}</p>
      </Card>
      </a>
      )))}
    </div>
    </>
  );
}

export default News