import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

export default function App() {
  const [data, setData] = useState([]);
  const [quoteAnimation, setQuoteAnimation] = useState('');
  const [info, setInfo] = useState({
    quote: 'Loading...',
    author: 'Loading...',
    backColor: '#',
    frontColor: 'white'
  });

  const getColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };


  const getData = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      setData([response.data])
    } catch (error) {
      console.log(error);
    };
  };


  useEffect(() => {
    getData();
  }, []);


  useEffect(() => {
    if (data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuote = data[randomIndex];
      const color = getColor();
      setInfo({
        quote: randomQuote.content,
        author: randomQuote.author,
        backColor: color,
        frontColor: 'white'
      });
    }
  }, [data]);

  const quoteChanges = (event) => {
    event.preventDefault();
    getData();
    setQuoteAnimation('fade');
    setTimeout(() => {
      setQuoteAnimation('fade-in');
    }, 500);
  };

  return (
    <div  id='quote-box' className="d-flex align-items-center justify-content-center vh-100">
      <div className="container"  >
        <div className="row">
          <div className="col-6 p-5 rounded-5  mx-auto " style={{ background: info.frontColor, color: info.backColor }}>
            <h1 className={`text-center ${quoteAnimation}`} id="text"><i className="bi bi-chat-right-quote-fill"></i> {info.quote}</h1>
            <p className={`text-end mt-4 ${quoteAnimation}`} id='author'>@{info.author}</p>
            <div className='row mt-4 p-2'>
              <div className='col-9'>
                <a className='btn me-2 ms-3' style={{ background: info.backColor, color: info.frontColor }} id='tweet-quote' href='twitter.com/intent/tweet' target='_blank'><i className="bi bi-twitter"></i></a>
                <a className='btn' style={{ background: info.backColor, color: info.frontColor }} id='git-quote' href='https://github.com/DanielUrregoL' target='_blank'><i className="bi bi-github"></i></a>
              </div>
              <div className='col-3 ' >
                <button className='btn ms-2' id='new-quote' style={{ background: info.backColor, color: info.frontColor }} onClick={quoteChanges} >New Quote</button>
              </div>
            </div>
          </div>
          <p className='text-center mt-3 h5'> <a href='https://github.com/DanielUrregoL' style={{ color: info.frontColor }}><i className="bi bi-github"></i> By @DanielUrregoL</a></p>
        </div>
        <style>{`body { background-color: ${info.backColor}; }`}</style>
      </div>
    </div>
  );
};
