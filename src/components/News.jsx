import './styles/News.scss';
import React, { useState, useEffect, } from "react";
import axios from "axios";
import { Card } from '@mui/material';
import Avatar from '@mui/material/Avatar';

const News = () => {
  const [news, setNews] = useState([]);
  let temp = []

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    await axios
      .get('https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=FOREX:USD&sort=latest&time_from=20220920T0130&limit=0&apikey=2J87TY3KKGLCJ9OG')
      .then(({ data }) => {

        for (let i = 0; i < data.feed.length; i++) {
          temp.push(data.feed[i]);
        }
        setNews(temp)
      })
  };

  function trim(text, length) {
    if (text.length <= length) {
      return text;
    }

    return text.substr(0, length) + '\u2026'
  }


  return (
    <>
      <h2 className="my-5 head">
        Latest Finance News
      </h2>
      <div className="news news-margin">
        {React.Children.toArray(
          news.map((item) => (
            <a className='card__link' href={item.url}>
              <Card sx={{ boxShadow: 4}} className='card'>
                <figure className='card__shape'>
                  <Avatar className='card__img' sx={{ width: 100, height: 100 }} src={item.banner_image} alt={item.title}/>
                </figure>

                <h3 className='card__title'>{trim(item.title, 60)}</h3>
                <p className='card__summary'>{trim(item.summary, 100)}</p>
              </Card>
            </a>
          )))}
      </div>
    </>
  );
}

export default News